import React from 'react';

interface ChurchMapProps {
  selectedLocation: string;
  onSelectLocation: (location: string) => void;
  className?: string;
  labels?: {
    altar?: string;
    left?: string;
    right?: string;
    entrance?: string;
  }
}

const ChurchMap: React.FC<ChurchMapProps> = ({ selectedLocation, onSelectLocation, className = '', labels }) => {
  // Helper for conditional styling
  const isActive = (zone: string) => selectedLocation === zone;
  
  // Colors (matching the Warm Stone/Amber theme)
  const activeFill = "rgba(217, 119, 6, 0.9)"; // amber-600
  const activeStroke = "#fbbf24"; // amber-300
  const inactiveFill = "rgba(28, 25, 23, 0.6)"; // stone-900/60
  const inactiveStroke = "rgba(120, 113, 108, 0.5)"; // stone-500/50
  
  const getStyle = (zone: string) => ({
    fill: isActive(zone) ? activeFill : inactiveFill,
    stroke: isActive(zone) ? activeStroke : inactiveStroke,
    strokeWidth: isActive(zone) ? 2 : 1,
    transition: 'all 0.3s ease'
  });

  return (
    <div className={`${className} relative select-none`}>
      <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-2xl">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur stdDeviation="3" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background 'Blueprint' lines or grid could go here for effect */}
        
        {/* ENTRANCE AREA (Bottom) */}
        <g 
           onClick={() => onSelectLocation('Entrance Area')} 
           className="cursor-pointer hover:opacity-90"
        >
           <path 
             d="M 50 320 L 250 320 L 250 380 L 50 380 Z" 
             style={getStyle('Entrance Area')}
           />
           <text 
             x="150" y="355" 
             textAnchor="middle" 
             fill="white" 
             fontSize="14" 
             fontFamily="Cinzel, serif"
             className="pointer-events-none tracking-widest uppercase opacity-80"
           >
             {labels?.entrance || 'Entrance'}
           </text>
        </g>

        {/* LEFT SIDE (Left Nave) */}
        <g 
           onClick={() => onSelectLocation('Left Side (Pews)')} 
           className="cursor-pointer hover:opacity-90"
        >
           <path 
             d="M 50 120 L 145 120 L 145 310 L 50 310 Z" 
             style={getStyle('Left Side (Pews)')}
           />
           <text 
             x="97" y="215" 
             textAnchor="middle" 
             fill="white" 
             fontSize="12" 
             fontFamily="Cinzel, serif"
             className="pointer-events-none tracking-widest uppercase opacity-70"
             transform="rotate(-90, 97, 215)"
           >
             {labels?.left || 'Left Side'}
           </text>
        </g>

        {/* RIGHT SIDE (Right Nave) */}
        <g 
           onClick={() => onSelectLocation('Right Side (Pews)')} 
           className="cursor-pointer hover:opacity-90"
        >
           <path 
             d="M 155 120 L 250 120 L 250 310 L 155 310 Z" 
             style={getStyle('Right Side (Pews)')}
           />
           <text 
             x="202" y="215" 
             textAnchor="middle" 
             fill="white" 
             fontSize="12" 
             fontFamily="Cinzel, serif"
             className="pointer-events-none tracking-widest uppercase opacity-70"
             transform="rotate(90, 202, 215)"
           >
             {labels?.right || 'Right Side'}
           </text>
        </g>

        {/* SANCTUARY / ALTAR (Top) */}
        <g 
           onClick={() => onSelectLocation('Sanctuary / Altar')} 
           className="cursor-pointer hover:opacity-90"
        >
           {/* Geometric Apse shape */}
           <path 
             d="M 80 110 L 220 110 L 200 40 L 100 40 Z" 
             style={getStyle('Sanctuary / Altar')}
           />
           <text 
             x="150" y="85" 
             textAnchor="middle" 
             fill="white" 
             fontSize="12" 
             fontFamily="Cinzel, serif"
             className="pointer-events-none tracking-widest uppercase opacity-90"
           >
             {labels?.altar || 'Altar'}
           </text>
           {/* Altar Table Icon */}
           <rect x="130" y="60" width="40" height="15" fill="rgba(255,255,255,0.3)" pointerEvents="none" />
        </g>

      </svg>
    </div>
  );
};

export default ChurchMap;
