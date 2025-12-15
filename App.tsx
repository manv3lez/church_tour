import React, { useState, useEffect, useRef } from 'react';
import { AppState, Artwork, LanguageOption, LanguageCode } from './types';
import { ARTWORKS, PRIMARY_LANGUAGES, OTHER_LANGUAGES, UI_TRANSLATIONS } from './constants';
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
  
  // Get current translations based on selectedLanguage
  const t = UI_TRANSLATIONS[selectedLanguage.code] || UI_TRANSLATIONS['en'];

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
      <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col p-0 relative">
        {/* Background Texture/Gradient for Mission BC Abbey Vibe */}
        <div className="absolute inset-0 bg-stone-900 z-0">
          {/* A gradient mimicking the brown tiles and light described in text */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-stone-900 to-stone-950"></div>
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full">
          
          {/* Header Section */}
          <div className="pt-8 pb-4 px-6 text-center border-b border-stone-800">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-500 tracking-wider mb-2">Westminster Abbey</h1>
            <p className="text-sm md:text-base text-stone-400 font-light italic tracking-wide">{t.subtitle}</p>
          </div>

          {/* Language Selector */}
          <div className="py-4 px-4 bg-stone-950/50 backdrop-blur-sm border-b border-stone-800">
            <div className="flex flex-wrap justify-center gap-2">
              {[...PRIMARY_LANGUAGES, ...OTHER_LANGUAGES].map(lang => (
                <button
                   key={lang.code}
                   onClick={() => setSelectedLanguage(lang)}
                   className={`px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all border ${
                     selectedLanguage.code === lang.code
                       ? 'bg-amber-700/80 text-white border-amber-600'
                       : 'bg-stone-800/50 text-stone-500 border-transparent hover:bg-stone-800'
                   }`}
                >
                  {lang.nativeLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Intro Text Area */}
          <div className="flex-1 overflow-y-auto custom-scroll p-6 md:p-8">
            <div className="prose prose-invert prose-stone mx-auto">
               <h3 className="text-center font-serif text-amber-200/90 text-xl mb-6">Welcome</h3>
               {/* Split intro text by newlines for paragraphs */}
               {t.introText.split('\n\n').map((paragraph: string, idx: number) => (
                 <p key={idx} className="mb-4 text-stone-300 font-light leading-relaxed text-justify text-sm md:text-base">
                   {paragraph}
                 </p>
               ))}
               <div className="flex justify-center my-8">
                  <div className="w-16 h-1 bg-amber-800/50 rounded-full"></div>
               </div>
            </div>
          </div>

          {/* Sticky Footer with Action Button */}
          <div className="p-4 bg-stone-900/90 backdrop-blur-md border-t border-stone-800">
             <div className="text-center mb-3">
               <h3 className="text-sm font-semibold text-amber-100/80 uppercase tracking-widest mb-1">{t.instructionsTitle}</h3>
               <p className="text-xs text-stone-500">{t.instructions}</p>
             </div>
             
             <button 
              onClick={handleStartTour}
              className="w-full bg-amber-700 hover:bg-amber-600 text-white font-serif font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.01] shadow-xl shadow-black/40 flex items-center justify-center gap-3 border border-amber-600/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
              {t.startBtn}
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
        selectedLanguage={selectedLanguage}
      />
    );
  }

  if (appState === AppState.ANALYZING || (appState === AppState.RESULT && isLoading)) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center text-white z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-600 mb-6"></div>
        <p className="text-xl font-light tracking-widest uppercase text-amber-100">{loadingMessage}</p>
      </div>
    );
  }

  if (appState === AppState.RESULT && selectedArtwork) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col">
        {/* Header / Nav */}
        <div className="px-6 py-4 flex justify-between items-center bg-stone-800 border-b border-stone-700 sticky top-0 z-30">
          <button onClick={() => setAppState(AppState.CAMERA)} className="text-amber-500 flex items-center gap-1 hover:text-amber-400 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
             </svg>
             Scan Another
          </button>
          <span className="font-serif text-amber-500/50 text-sm tracking-widest">WESTMINSTER ABBEY</span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll p-6 pb-32">
          {/* Title Area */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-serif text-amber-500 mb-3">{selectedArtwork.title}</h2>
            {/* Display location in selected language if possible, else English default */}
            <div className="inline-block px-3 py-1 bg-stone-800 rounded text-xs text-stone-400 uppercase tracking-widest mb-2 border border-stone-700">
              {t.zones[selectedArtwork.location] || selectedArtwork.location}
            </div>
          </div>

          {/* Language Selector */}
          <div className="mb-8 bg-stone-800/30 p-4 rounded-xl border border-stone-800">
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-3 text-center">Select Audio Language</p>
            
            {/* Primary Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {PRIMARY_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedLanguage.code === lang.code 
                      ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/40 border border-amber-600' 
                      : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border border-stone-700'
                  }`}
                >
                  {lang.nativeLabel}
                  {selectedLanguage.code !== lang.code && <span className="opacity-50 ml-1 text-xs">({lang.label})</span>}
                </button>
              ))}
            </div>

            {/* Secondary Dropdown */}
            <div className="flex justify-center">
               <div className="relative">
                 <select 
                   className="appearance-none bg-stone-800 text-stone-400 text-sm py-2 pl-4 pr-10 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-600 transition-colors cursor-pointer"
                   onChange={(e) => {
                     const lang = OTHER_LANGUAGES.find(l => l.code === e.target.value);
                     if (lang) handleLanguageChange(lang);
                   }}
                   value={OTHER_LANGUAGES.find(l => l.code === selectedLanguage.code)?.code || ""}
                 >
                   <option value="" disabled>More Languages</option>
                   {OTHER_LANGUAGES.map(lang => (
                     <option key={lang.code} value={lang.code}>{lang.label} ({lang.nativeLabel})</option>
                   ))}
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
               </div>
            </div>
          </div>

          {/* Original Text (English) display for reference */}
          <div className="prose prose-invert prose-stone prose-lg mx-auto bg-stone-800/20 p-6 rounded-xl border border-stone-800">
             <p className="leading-relaxed text-stone-300 font-light text-justify">
               {selectedArtwork.description}
             </p>
          </div>

        </div>

        {/* Sticky Audio Player */}
        <div className="fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-stone-800 p-4 pb-8 z-40 shadow-2xl">
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
