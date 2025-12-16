# Interactive Tour of Westminster Abbey Church (Mission, BC)

An intelligent, multilingual interactive guide designed for visitors of Westminster Abbey in Mission, British Columbia. This web application utilizes Google's Gemini AI to visually identify works of art within the church and generates real-time, translated audio narrations for a seamless self-guided tour experience.

## 🌟 Features

*   **AI Visual Recognition:** Uses **Gemini 3 Pro** to analyze camera input and identify specific artworks based on the user's location within the church (Nave, Sanctuary, Side Aisles, etc.).
*   **Multilingual Support:** Instantly translates content into 8+ languages, including Mandarin, Cantonese, Punjabi, Spanish, French, Italian, and German.
*   **Generative Audio Narrations:** Uses **Gemini 2.5 Flash TTS** to generate natural-sounding voiceovers in the selected language on the fly.
*   **Location-Aware Filtering:** Users select their zone (e.g., "Left Side (Pews)") to improve identification accuracy and reduce AI hallucinations.
*   **Atmospheric UI:** A "Warm Stone & Concrete" design aesthetic reflecting the Abbey's Modernist/Brutalist architecture, featuring animated audio visualization.
*   **Accessibility:** Full text transcripts provided alongside audio narrations.

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS
*   **AI & Logic:** Google GenAI SDK (`@google/genai`)
*   **Audio:** Web Audio API (Custom PCM decoding and visualization)
*   **Build/Runtime:** ES Modules (Vite recommended for local dev)

## 🚀 Getting Started

### Prerequisites

1.  **Node.js** (v18 or higher recommended).
2.  **Google AI Studio API Key:** You must have a paid or free tier API key from [Google AI Studio](https://aistudio.google.com/).
3.  **Permissions:** The device must allow Camera and Microphone access.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/westminster-abbey-tour.git
    cd westminster-abbey-tour
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add your API Key:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```
    *Note: The current codebase references `process.env.API_KEY`. Ensure your bundler (like Vite) is configured to expose this, or use `import.meta.env` if migrating to a strict Vite structure.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

*   **`App.tsx`**: Main application logic, state management (Home, Camera, Result), and UI orchestration.
*   **`constants.ts`**: Contains the "database" of artworks, static text content, and language definitions.
*   **`services/geminiService.ts`**: Handles interactions with the Google Gemini API for image recognition, translation, and Text-to-Speech generation.
*   **`components/`**:
    *   `CameraCapture.tsx`: Handles video stream, frame capture, and location selection overlay.
    *   `AudioPlayer.tsx`: Custom audio player with canvas-based waveform visualization.
*   **`types.ts`**: TypeScript interfaces for Artworks, Languages, and App States.

## 📖 Usage Guide

1.  **Select Language:** On the home screen, select your preferred language. The introduction text will translate automatically.
2.  **Start Tour:** Click "Start Tour" to grant camera permissions.
3.  **Select Location:** Tap the location buttons (e.g., "Entrance Area") to tell the app where you are standing.
4.  **Capture:** Point your camera at a statue, painting, or architectural feature and tap the shutter button.
5.  **Experience:** The app will identify the item, translate the description, and begin reading it aloud.

## 🤝 Contribution & Future Improvements

We welcome contributions! If you are looking to improve this project, here is a list of high-priority enhancements and feature requests:

### 🧠 AI & Performance
*   **Response Caching:** Implement local storage or session storage caching for generated translations and audio files to save API tokens and reduce latency on repeat visits.
*   **Streaming Responses:** Update the UI to handle streaming text for translations to make the application feel faster.
*   **Hybrid Search:** Implement a fallback keyword search if visual recognition fails (e.g., "Show me St. Benedict").

### 📱 UI/UX
*   **Interactive Map:** Replace the dropdown/button location selector with an interactive SVG floor plan of the church.
*   **Pinch-to-Zoom:** Add zoom capabilities to the `CameraCapture` component for better capturing of distant stained glass windows.
*   **Offline Mode (PWA):** Convert the application into a Progressive Web App (PWA) so visitors can download the core assets before entering the church (where signal might be weak).

### ♿ Accessibility
*   **Font Scaling:** Add controls to increase/decrease text size.
*   **High Contrast Mode:** Add a toggle for users with visual impairments.

### 🔧 Architecture
*   **CMS Integration:** Currently, artworks are hardcoded in `constants.ts`. Move this data to a headless CMS (like Contentful or Sanity) to allow non-developers to update church content.
*   **Testing:** Add unit tests for `geminiService.ts` and integration tests for the user flow.

## 📄 License

This project is licensed under the MIT License.
