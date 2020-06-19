// profile/getters.ts
import { Question } from 'Models/Question/Question'
import { RootState, ProfileState } from 'Models/types'
import { GetterTree } from 'vuex'

export const getters: GetterTree<ProfileState, RootState> = {
  questions (state): Question[] | undefined {
    console.log(state.questions)
    return state.questions?.map(q => {
      q.title = q.title[state.language]
      q.description = q.description.get(state.language)
      q.options.forEach(o => {
        o.title = o.title.get(state.language)
      })
      return q
    })
  },
  questionsCount (state): number {
    return state.questions?.length || 0
  },
  answers (state): Record<string, string> {
    return state.answers
  },
  language (state): string {
    return state.language
  }
}
