---
inclusion: always
---

# Technical Stack

## Core Technologies

- **Framework**: React 19.2.3 with TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **AI/ML**: Google Gemini AI SDK (@google/genai)
  - Vision model: `gemini-2.5-flash` for image recognition
  - TTS model: `gemini-2.5-flash-preview-tts` for audio generation
- **Styling**: Tailwind CSS (utility classes)

## Key Dependencies

- React DOM 19.2.3
- @vitejs/plugin-react 5.0.0
- @types/node 22.14.0

## Build & Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

- API key required: `GEMINI_API_KEY` in `.env.local`
- Vite exposes env vars via `process.env.API_KEY` and `process.env.GEMINI_API_KEY`
- Server runs on port 3000, host 0.0.0.0

## Audio Processing

- Uses Web Audio API (`AudioContext`, `AudioBuffer`)
- Gemini TTS returns base64-encoded PCM audio (24kHz, mono, Int16)
- Custom decoder converts PCM to AudioBuffer for playback
