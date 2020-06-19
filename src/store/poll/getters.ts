// profile/getters.ts
import { RootState, ProfileState } from 'Models/types'
import { GetterTree } from 'vuex'
import { TranslatedQuestion } from 'app/Models/Question/TranslatedQuestion'
import { state } from './profile'

export const getters: GetterTree<ProfileState, RootState> = {
  questions (state): TranslatedQuestion[] | undefined {
    console.log(state.questions)
    return state.questions
  },
  questionsCount (state): number {
    return state.questions?.length || 0
  },
  answers (state): Record<string, string> {
    return state.answers
  },
  answerById (state): any {
    return (id: string) => state.answers[id]
  },
  language (state): string {
    return state.language
  }
}
