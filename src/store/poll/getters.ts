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
  answers (state): Record<string, AnswerInfo> {
    return state.answers
  },
  answerById (state): (id: string) => AnswerInfo | undefined {
    return (id: string) => state.answers[id]
  },
  language (state): string {
    return state.language
  },
  languages (state): Culture | null {
    return state.languages
  },
  startInfo (state): TranslatedStartPage | null | undefined {
    console.log(state.startInfo)
    return state.startInfo?.translateStartPage(state.language)
  }
}
