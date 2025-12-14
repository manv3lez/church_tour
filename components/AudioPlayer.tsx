import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  audioBuffer: AudioBuffer | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioBuffer, isPlaying, onTogglePlay }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  // Visualization animation loop
  useEffect(() => {
    if (!isPlaying) return;
    
    let animationFrameId: number;
    const startTime = Date.now();
    const duration = audioBuffer ? audioBuffer.duration * 1000 : 0;
    // We need to account for paused/resumed time in a real robust app, 
    // but for this simple visualizer we'll just animate a wave.

    const animate = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          const width = canvasRef.current.width;
          const height = canvasRef.current.height;

          ctx.clearRect(0, 0, width, height);
          ctx.strokeStyle = '#fbbf24'; // Amber-400
          ctx.lineWidth = 2;
          ctx.beginPath();

          const frequency = 0.05;
          const amplitude = height / 4;
          const offset = Date.now() / 50; // Speed

          for (let x = 0; x < width; x++) {
            const y = height / 2 + Math.sin(x * frequency + offset) * amplitude * (Math.random() * 0.5 + 0.5);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, audioBuffer]);

  return (
    <div className="w-full bg-neutral-800/50 rounded-xl p-4 backdrop-blur-md border border-neutral-700">
      <div className="flex items-center gap-4">
        <button 
          onClick={onTogglePlay}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-grow h-12 relative bg-black/30 rounded-lg overflow-hidden">
           {/* If audio is loading or empty, show static line */}
           {!audioBuffer ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                Generating Audio...
              </div>
           ) : (
             <canvas ref={canvasRef} width={300} height={48} className="w-full h-full" />
           )}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
