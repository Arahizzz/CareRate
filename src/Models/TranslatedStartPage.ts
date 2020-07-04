export class TranslatedStartPage {
  constructor (public title: string, public description: string | null) { }
}
export class StartPage {
  constructor (public title: Record<string, string>, public description: Record<string, string> | null) { }

  translateStartPage (lang: string): TranslatedStartPage | null {
    const translatedTitle = this.title[lang]
    if (!this.title) { return null }
    const translatedDescription = this.description?.[lang] ?? null
    return new TranslatedStartPage(translatedTitle, translatedDescription)
  }
}
