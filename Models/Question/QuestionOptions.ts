import { Translation } from '../Translation'

export class QuestionOptions {
  constructor (public id: string,
    public title: Translation[],
    public emoji: string | null,
    public imageUrl: string | null,
    public askForExplanation: boolean) { }
}
