import { Question } from './Question/Question'

export class Group {
  constructor (public id: string, public title: Record<string, string> | null, public questions: Question[]) { }
}
