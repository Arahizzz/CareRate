export class QuestionOptions {
  constructor (public id: string,
    public title: Record<string, string>,
    public emoji: string | null,
    public imageUrl: string | null,
    public askForExplanation: boolean) { }
}
