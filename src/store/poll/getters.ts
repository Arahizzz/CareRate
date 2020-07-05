// profile/getters.ts
import { RootState, ProfileState } from 'src/Models/types'
import { GetterTree } from 'vuex'
import { TranslatedQuestion } from 'src/Models/Question/TranslatedQuestion'
import { TranslatedStartPage } from 'src/Models/TranslatedStartPage'
import { Culture } from 'src/Models/Culture'
import { AnswerInfo } from 'src/Models/AnswerInfo'

export const getters: GetterTree<ProfileState, RootState> = {
  questions (state): TranslatedQuestion[] | undefined {
    console.log(state.questions)
    const lang = state.language
    if (lang != null) {
      return state.questions?.map(q => TranslatedQuestion.translateQuestion(q, lang))
    } else return undefined
  },
  questionsCount (state): number {
    return state.questions?.length ?? 0
  },
  answers (state): Record<string, AnswerInfo> {
    return state.answers
  },
  answerById (state): (id: string) => AnswerInfo | undefined {
    return (id: string) => state.answers[id]
  },
  language (state): string | null {
    return state.language
  },
  languages (state): Culture | null {
    return state.languages
  },
  startInfo (state): TranslatedStartPage | null | undefined {
    console.log(state.startInfo)
    if (state.language) {
      return state.startInfo?.translateStartPage(state.language)
    } else return null
  }
}
