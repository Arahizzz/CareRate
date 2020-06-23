import { QuestionType } from './QuestionType'
import { ExplanationType } from './ExplanationType'
import { Question } from './Question'
import { QuestionOptions } from './QuestionOptions'

export class TranslatedQuestionOption {
  constructor (
    public id: string,
    public title: string,
    public emoji: string | null,
    public imageUrl: string | null,
    public askForExplanation: boolean) { }
}

export class TranslatedQuestion {
  constructor (
    public id: string,
    public title: string,
    public groupTitle: string,
    public description: string | null,
    public questionType: QuestionType,
    public isRequired: boolean,
    public explanationType: ExplanationType,
    public explanationQuestion: string | null,
    public explanationScoreBelow: number | null,
    public maxSelection: number | null,
    public options: TranslatedQuestionOption[]
  ) { }

  static translateQuestion (q: Question, translation: string): TranslatedQuestion {
    let description: string | null
    if (q.description) {
      description = q.description[translation]
    } else { description = null }
    let explanationQuestion: string | null
    if (q.explanationQuestion) {
      explanationQuestion = q.explanationQuestion[translation]
    } else explanationQuestion = null

    return new TranslatedQuestion(
      q.id,
      q.title[translation],
      q.groupTitle[translation],
      description,
      q.questionType,
      q.isRequired,
      q.explanationType,
      explanationQuestion,
      q.explanationScoreBelow ?? null,
      q.maxSelection ?? null,
      q.options?.map<TranslatedQuestionOption>((opt: QuestionOptions) => new TranslatedQuestionOption(
        opt.id,
        opt.title[translation],
        opt.emoji ?? null,
        opt.imageUrl ?? null,
        opt.askForExplanation
      )
    ))
  }
}
