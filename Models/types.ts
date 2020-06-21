import { TranslatedQuestion } from './Question/TranslatedQuestion'
import { TranslatedStartPage } from './TranslatedStartPage'
export interface RootState {
  version: string;
}

export interface ProfileState {
  questions: TranslatedQuestion[] | undefined;
  startInfo: TranslatedStartPage | null;
  answers: Record<string, string | number | number[]>;
  language: string;
}
