import { Culture } from './Culture'
import { Translation } from './Translation'
import { Group } from './Group'

export class Survey {
  constructor (
      public id: string,
      public title: Map<string, string>,
      public description: Map<string, string> | null,
      public cultures: Culture[],
      public defaultCultureCode: string,
      public translations: Map<string, Translation>,
      public groups: Group[]) { }
}
