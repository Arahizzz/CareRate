import { Culture } from './Culture'
import { Group } from './Group'

export class Survey {
  constructor (
      public id: string,
      public title: Record<string, string>,
      public description: Record<string, string> | null,
      public cultures: Culture[],
      public defaultCultureCode: string,
      public translations: Record<string, Record<string, string>>,
      public groups: Group[]) { }
}
