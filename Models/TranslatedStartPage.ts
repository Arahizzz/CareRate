import { Survey } from './Survey'

export class TranslatedStartPage {
  constructor (public title: string, public description: string | null) { }

  public static translateStartPage (survey: Survey, lang: string): TranslatedStartPage | null {
    const title = survey.title[lang]
    if (!title) { return null }
    const description = survey.description?.[lang] ?? null
    return new TranslatedStartPage(title, description)
  }
}
