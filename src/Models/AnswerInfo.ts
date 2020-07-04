export class AnswerInfo {
  constructor (public answer: string | number | number[] | boolean | null, public details: string, public askForExplanation: boolean | undefined) { }
}
