import { TranslatedQuestion } from './Question/TranslatedQuestion'
export interface RootState {
  version: string;
}

export interface ProfileState {
  questions: TranslatedQuestion[];
  answers: {};
  language: string;
}
