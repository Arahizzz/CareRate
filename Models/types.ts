import { TranslatedQuestion } from './Question/TranslatedQuestion'
export interface RootState {
  version: string;
}

export interface ProfileState {
  questions: TranslatedQuestion[] | null;
  answers: Record<string, string | number | number[]>;
  language: string;
}
