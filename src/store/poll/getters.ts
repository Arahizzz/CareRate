// profile/getters.ts
import { Question } from 'Models/Question/Question'
import { RootState, ProfileState } from 'Models/types'
import { GetterTree } from 'vuex'

export const getters: GetterTree<ProfileState, RootState> = {
  questions (state): Array<Question> | undefined {
    return state.questions
  },
  questionsCount (state): number {
    return state.questions?.length || 0
  },
  answers (state): Record<string, string> {
    return state.answers
  }
}
