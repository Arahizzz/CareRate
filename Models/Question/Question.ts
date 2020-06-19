import { QuestionType } from './QuestionType'
import { ExplanationType } from './ExplanationType'
import { QuestionOptions } from './QuestionOptions'

export class Question {
  constructor (
    public id: string,
    public title: Record<string, string>,
    public description: Record<string, string> | undefined,
    public questionType: QuestionType,
    public isRequired: boolean,
    public explanationType: ExplanationType,
    public explanationQuestion: Record<string, string>,
    public explanationScoreBelow: number | undefined,
    public maxSelection: number | undefined,
    public options: QuestionOptions[]
  ) {}
}
