// profile/getters.ts
import { RootState, ProfileState } from 'Models/types'
import { GetterTree } from 'vuex'
import { TranslatedQuestion } from 'app/Models/Question/TranslatedQuestion'
import { TranslatedStartPage, StartPage } from 'app/Models/TranslatedStartPage'
import { Culture } from 'app/Models/Culture'

export const getters: GetterTree<ProfileState, RootState> = {
  questions (state): TranslatedQuestion[] | undefined {
    console.log(state.questions)
    /* // test
    state.questions?.forEach((q, i) => {
      if (q.questionType != 7) {
        q.isRequired = (i % 5 === 0)
      }
    }) */
    return state.questions?.map(q => TranslatedQuestion.translateQuestion(q, state.language))
  },
  questionsCount (state): number {
    return state.questions?.length || 0
  },
  answers (state): Record<string, string | number | number[]> {
    return state.answers
  },
  answerById (state): (id: string) => string | number | number[] {
    return (id: string) => state.answers[id]
  },
  language (state): string {
    return state.language
  },
  languages (state): Culture {
    return state.languages
  },
  startInfo (state): TranslatedStartPage | null | undefined {
    console.log(state.startInfo)
    return state.startInfo?.translateStartPage(state.language)
  }
}
