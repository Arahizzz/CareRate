import { Translation } from '../Translation'
import { QuestionType } from './QuestionType'
import { ExplanationType } from './ExplanationType'
import { QuestionOptions } from './QuestionOptions'

export class Question {
  constructor (
    public id: string,
    public title: {},
    public description: Translation[] | null,
    public questionType: QuestionType,
    public isRequired: boolean,
    public explanationType: ExplanationType,
    public explanationQuestion: Translation[] | null,
    public explanationScoreBelow: number | null,
    public maxSelection: number | null,
    public options: QuestionOptions[]
  ) {}
}
