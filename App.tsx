import React, { useState, useEffect, useRef } from 'react';
import { AppState, Artwork, LanguageOption, LanguageCode } from './types';
import { ARTWORKS, PRIMARY_LANGUAGES, OTHER_LANGUAGES } from './constants';
import { identifyArtwork, generateAudio, decodeGeminiAudio } from './services/geminiService';
import CameraCapture from './components/CameraCapture';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(PRIMARY_LANGUAGES[0]); // Default English
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  // Audio handling
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Initialize Audio Context on user interaction
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const handleStartTour = () => {
    initAudioContext();
    setAppState(AppState.CAMERA);
  };

  const handleImageCaptured = async (base64: string, location: string) => {
    setAppState(AppState.ANALYZING);
    setLoadingMessage(`Searching ${location}...`);
    
    try {
      const artworkId = await identifyArtwork(base64, location);
      
      if (artworkId) {
        const artwork = ARTWORKS.find(a => a.id === artworkId);
        if (artwork) {
          setSelectedArtwork(artwork);
          // Default to English initially or keep previous language? Let's keep previous language if supported, else English
          setAppState(AppState.RESULT);
          await loadAudio(artwork, selectedLanguage);
        } else {
          // ID found but not in local DB (shouldn't happen with current logic)
          throw new Error("Artwork identified but details missing.");
        }
      } else {
        alert("Sorry, could not identify this artwork in the selected location. Please ensure you selected the correct zone.");
        setAppState(AppState.CAMERA);
      }
    } catch (error) {
      console.error(error);
      alert("Error processing image. Please try again.");
      setAppState(AppState.CAMERA);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAudio = async (artwork: Artwork, language: LanguageOption) => {
    if (!audioContextRef.current) return;
    
    stopAudio(); // Stop any current playback
    setIsLoading(true);
    setLoadingMessage(`Generating ${language.label} Audio...`);
    setAudioBuffer(null);

    try {
      const base64Audio = await generateAudio(artwork.description, language);
      const buffer = await decodeGeminiAudio(base64Audio, audioContextRef.current);
      setAudioBuffer(buffer);
      // Auto play when ready
      playAudio(buffer);
    } catch (err) {
      console.error("Audio Load Error", err);
      alert("Failed to generate audio.");
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (buffer: AudioBuffer) => {
     if (!audioContextRef.current) return;
     
     // Stop existing
     if (audioSourceRef.current) {
       try { audioSourceRef.current.stop(); } catch(e){}
     }

     const source = audioContextRef.current.createBufferSource();
     source.buffer = buffer;
     source.connect(audioContextRef.current.destination);
     source.onended = () => setIsPlaying(false);
     source.start();
     audioSourceRef.current = source;
     setIsPlaying(true);
  };

  const stopAudio = () => {
    if (audioSourceRef.current) {
      try { audioSourceRef.current.stop(); } catch(e){}
      audioSourceRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else if (audioBuffer) {
      playAudio(audioBuffer);
    }
  };

  const handleLanguageChange = async (lang: LanguageOption) => {
    if (lang.code === selectedLanguage.code) return;
    setSelectedLanguage(lang);
    if (selectedArtwork) {
      await loadAudio(selectedArtwork, lang);
    }
  };

  // -- RENDER HELPERS --

  if (appState === AppState.HOME) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6 text-center bg-[url('https://picsum.photos/800/1200?grayscale')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-md w-full">
          <h1 className="text-5xl font-bold mb-2 text-amber-500 tracking-wider">Sanctuary</h1>
          <p className="text-xl text-gray-300 font-light italic mb-10">An interactive spiritual journey</p>
          
          <div className="space-y-6">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold mb-2 text-amber-100">Instructions</h3>
              <p className="text-sm text-gray-400">Select your location in the church, then point your camera at the sacred art to reveal its story.</p>
            </div>

            <button 
              onClick={handleStartTour}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-amber-900/50 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
              Start Tour
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (appState === AppState.CAMERA) {
    return (
      <CameraCapture 
        onCapture={handleImageCaptured} 
        onCancel={() => setAppState(AppState.HOME)}
      />
    );
  }

  if (appState === AppState.ANALYZING || (appState === AppState.RESULT && isLoading)) {
    return (
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-6"></div>
        <p className="text-xl font-light tracking-widest uppercase text-amber-100">{loadingMessage}</p>
      </div>
    );
  }

  if (appState === AppState.RESULT && selectedArtwork) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
        {/* Header / Nav */}
        <div className="px-6 py-4 flex justify-between items-center bg-neutral-800 border-b border-neutral-700 sticky top-0 z-30">
          <button onClick={() => setAppState(AppState.CAMERA)} className="text-amber-500 flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
             </svg>
             Scan Another
          </button>
          <span className="font-serif text-amber-500/50 text-sm">SANCTUARY TOUR</span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll p-6 pb-32">
          {/* Title Area */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-serif text-amber-400 mb-2">{selectedArtwork.title}</h2>
            <div className="text-xs text-amber-500/70 uppercase tracking-widest mb-2">{selectedArtwork.location}</div>
            <div className="h-1 w-20 bg-amber-700 mx-auto rounded-full"></div>
          </div>

          {/* Language Selector */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 text-center">Select Language</p>
            
            {/* Primary Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {PRIMARY_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedLanguage.code === lang.code 
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40' 
                      : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 border border-neutral-700'
                  }`}
                >
                  {lang.nativeLabel}
                  {selectedLanguage.code !== lang.code && <span className="opacity-50 ml-1 text-xs">({lang.label})</span>}
                </button>
              ))}
            </div>

            {/* Secondary Dropdown */}
            <div className="flex justify-center">
               <select 
                 className="bg-neutral-800 text-gray-300 text-sm py-2 px-4 rounded-lg border border-neutral-700 focus:outline-none focus:border-amber-500"
                 onChange={(e) => {
                   const lang = OTHER_LANGUAGES.find(l => l.code === e.target.value);
                   if (lang) handleLanguageChange(lang);
                 }}
                 value={OTHER_LANGUAGES.find(l => l.code === selectedLanguage.code)?.code || ""}
               >
                 <option value="" disabled>More Languages...</option>
                 {OTHER_LANGUAGES.map(lang => (
                   <option key={lang.code} value={lang.code}>{lang.label} ({lang.nativeLabel})</option>
                 ))}
               </select>
            </div>
          </div>

          {/* Original Text (English) display for reference */}
          <div className="prose prose-invert prose-lg mx-auto bg-neutral-800/30 p-6 rounded-2xl border border-white/5">
             <p className="leading-relaxed text-gray-300 font-light text-justify">
               {selectedArtwork.description}
             </p>
          </div>

        </div>

        {/* Sticky Audio Player */}
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 p-4 pb-8 z-40">
           <AudioPlayer 
             audioBuffer={audioBuffer} 
             isPlaying={isPlaying} 
             onTogglePlay={togglePlayback} 
           />
        </div>
      </div>
    );
  }

  return null;
}

export default App;
