import { Question } from './Question/Question'

export class Group {
  constructor (public id: string, public title: Record<string, string> | undefined, public questions: Question[]) { }
}
