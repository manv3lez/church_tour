export interface Artwork {
  id: string;
  title: string;
  description: string;
}

export enum LanguageCode {
  ENGLISH = 'en',
  MANDARIN = 'zh-CN',
  CANTONESE = 'zh-HK',
  PUNJABI = 'pa',
  SPANISH = 'es',
  FRENCH = 'fr',
  ITALIAN = 'it',
  GERMAN = 'de',
}

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  voiceName?: string; // Hint for TTS if needed, though we rely on auto-detect
}

export enum AppState {
  HOME = 'HOME',
  CAMERA = 'CAMERA',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR',
}
