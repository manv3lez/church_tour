import React, { useRef, useState, useCallback, useEffect } from 'react';
import { LOCATION_ZONES, LanguageOption } from '../types';
import { UI_TRANSLATIONS } from '../constants';
import ChurchMap from './ChurchMap';

interface CameraCaptureProps {
  onCapture: (base64Image: string, location: string) => void;
  onCancel: () => void;
  selectedLanguage: LanguageOption;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel, selectedLanguage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('Entrance Area'); // Default to Entrance for map logic
  const [isMapExpanded, setIsMapExpanded] = useState(false); // Can toggle map size if needed

  // Get translations for current language, fallback to English if missing
  const t = UI_TRANSLATIONS[selectedLanguage.code] || UI_TRANSLATIONS['en'];

  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: { facingMode: 'environment' } // Prefer back camera
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Unable to access camera. Please allow permissions or use file upload.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Get base64 string (remove data URL prefix for API)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const base64 = dataUrl.split(',')[1];
        stopCamera();
        onCapture(base64, selectedLocation);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        stopCamera();
        onCapture(base64, selectedLocation);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black relative">
      <div className="absolute top-4 right-4 z-30">
         <button onClick={() => { stopCamera(); onCancel(); }} className="text-white p-2 bg-black/40 rounded-full backdrop-blur hover:bg-black/60 transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
           </svg>
         </button>
      </div>

      {/* Interactive Map HUD */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-stone-900/60 backdrop-blur-md rounded-xl p-3 border border-stone-600/30 shadow-2xl flex flex-col items-center w-32 md:w-40 transition-all duration-300">
          <div className="flex items-center gap-1 mb-2 w-full justify-center opacity-80">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
             </svg>
             <span className="text-[10px] text-amber-100 uppercase tracking-widest font-bold truncate">
                {t.cameraLocationTitle}
             </span>
          </div>
          
          <div className="w-full aspect-[3/4] mb-2">
            <ChurchMap 
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                labels={{
                  altar: "Altar",
                  left: "Left",
                  right: "Right",
                  entrance: "Back"
                }}
            />
          </div>

          <div className="w-full text-center">
             <p className="text-[10px] text-stone-300 mb-1 leading-tight">Selected Zone:</p>
             <p className="text-xs text-amber-500 font-bold uppercase tracking-wider leading-tight break-words">
                {t.zones[selectedLocation] || selectedLocation}
             </p>
          </div>
          
          {/* Quick Select 'All' fallback */}
          <button 
             onClick={() => setSelectedLocation('All Locations')}
             className={`mt-2 w-full text-[9px] py-1 rounded border uppercase tracking-wide transition-colors ${
               selectedLocation === 'All Locations' 
                 ? 'bg-amber-700/80 text-white border-amber-600' 
                 : 'bg-stone-800/50 text-stone-500 border-stone-700 hover:bg-stone-800'
             }`}
           >
             {t.zones['All Locations'] || 'Scan All'}
           </button>
        </div>
      </div>

      {!error ? (
        <div className="relative w-full h-full flex flex-col">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-8 p-4 z-10">
            {/* Shutter Button */}
            <button 
              onClick={handleCapture}
              className="w-20 h-20 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm active:scale-95 transition-transform hover:bg-white/30"
              aria-label="Take photo"
            >
              <div className="w-full h-full rounded-full border-2 border-transparent" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center mt-20">
            <p className="text-red-400 mb-4">{error}</p>
        </div>
      )}

      {/* Hidden Canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Fallback File Input */}
      <div className="absolute bottom-10 right-8 z-10">
         <label className="flex items-center justify-center w-12 h-12 bg-gray-900/80 backdrop-blur rounded-full cursor-pointer shadow-lg border border-gray-600 hover:bg-gray-800 transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
           </svg>
           <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
         </label>
      </div>
    </div>
  );
};

export default CameraCapture;
