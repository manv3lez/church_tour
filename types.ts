export interface Artwork {
  id: string;
  title: string;
  description: string;
  location: string; // New field for filtering
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
  voiceName?: string;
}

export enum AppState {
  HOME = 'HOME',
  CAMERA = 'CAMERA',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR',
}

export const LOCATION_ZONES = [
  'All Locations',
  'Entrance Area',
  'Left Side (Pews)',
  'Right Side (Pews)',
  'Sanctuary / Altar',
];
