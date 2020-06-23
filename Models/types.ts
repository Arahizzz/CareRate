import { Question } from './Question/Question'
import { Culture } from './Culture'
import { StartPage } from './TranslatedStartPage'
export interface RootState {
  version: string;
}

export interface ProfileState {
  questions: Question[] | undefined;
  startInfo: StartPage | null;
  answers: Record<string, string | number | number[]>;
  language: string;
  languages: Culture | null;
}
