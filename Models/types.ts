import { Question } from './Question/Question'
import { TranslatedQuestion } from './Question/TranslatedQuestion'
export interface RootState {
  version: string;
}

export interface ProfileState {
  questions: TranslatedQuestion[];
  answers: Record<string, string>;
  language: string;
}
