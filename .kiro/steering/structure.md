---
inclusion: always
---

# Project Structure

## File Organization

```
/
├── components/          # React UI components
│   ├── AudioPlayer.tsx     # Audio playback with waveform visualization
│   └── CameraCapture.tsx   # Camera/file upload interface
├── services/            # External API integrations
│   └── geminiService.ts    # Gemini AI vision & TTS functions
├── App.tsx              # Main application component with state management
├── index.tsx            # React root entry point
├── types.ts             # TypeScript type definitions
├── constants.ts         # Static data (artworks, languages)
├── vite.config.ts       # Vite build configuration
├── tsconfig.json        # TypeScript compiler options
└── package.json         # Dependencies and scripts
```

## Architecture Patterns

### Component Structure
- **Functional components** with React hooks (useState, useEffect, useRef, useCallback)
- **Props interfaces** defined inline with TypeScript
- **Controlled components** for forms and interactive elements

### State Management
- App-level state in `App.tsx` using `useState`
- State includes: `appState`, `selectedArtwork`, `selectedLanguage`, `audioBuffer`, `isPlaying`
- No external state management library (Redux, Zustand, etc.)

### Code Conventions
- **TypeScript**: Strict typing with interfaces and enums
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: React first, then types, then local modules
- **Styling**: Inline Tailwind utility classes, no separate CSS files
- **Error Handling**: Try-catch blocks with user-facing alerts

### Service Layer
- `geminiService.ts` exports async functions for AI operations
- Functions: `identifyArtwork()`, `generateAudio()`, `decodeGeminiAudio()`
- All Gemini API calls centralized in this service

### Data Management
- Static artwork data in `constants.ts` (ARTWORKS array)
- Language options in `constants.ts` (PRIMARY_LANGUAGES, OTHER_LANGUAGES)
- Types defined in `types.ts` (Artwork, LanguageOption, AppState enum)

## Key Design Decisions

- **No routing**: Single-page app with state-based view switching
- **Mobile-first**: Responsive design optimized for smartphone cameras
- **Accessibility**: Camera fallback to file upload, semantic HTML
- **Performance**: Audio context initialized on user interaction (browser requirement)
