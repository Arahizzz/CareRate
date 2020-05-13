import { Translation } from './Translation'
import { Question } from './Question/Question'

export class Group {
  constructor (public id: string, public title: Translation[] | null, public questions: Question[]) { }
}
