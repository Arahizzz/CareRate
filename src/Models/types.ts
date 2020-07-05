import { Question } from './Question/Question'
import { Culture } from './Culture'
import { StartPage } from './TranslatedStartPage'
import { AnswerInfo } from './AnswerInfo'
export interface RootState {
  version: string;
}

export interface ProfileState {
  questions: Question[] | undefined;
  startInfo: StartPage | null;
  answers: Record<string, AnswerInfo>;
  language: string | null;
  languages: Culture | null;
}
