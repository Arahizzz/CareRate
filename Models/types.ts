import { Question } from './Question/Question'
export interface RootState {
  version: string;
}

export interface ProfileState {
  questions?: Array<Question>;
  answers: Record<string, string>;
}
