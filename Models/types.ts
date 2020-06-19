import { Question } from './Question/Question'
export interface RootState {
  version: string;
}

export interface ProfileState {
  questions: any;
  answers: Record<string, string>;
  language: string;
}
