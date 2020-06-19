import { MutationTree } from 'vuex'
import { ProfileState } from 'Models/types'
import { Question } from 'Models/Question/Question'
import { TranslatedQuestion } from 'app/Models/Question/TranslatedQuestion'

export const mutations: MutationTree<ProfileState> = {
  profileLoaded (state, payload: Question[]) {
    console.log('loaded')
    console.log(payload)
    state.questions = payload.map((q) => TranslatedQuestion.translateQuestion(q, 'nl-NL'))
  },
  addAnswer (state, payload: Record<string, string>) {
    for (const [key, value] of Object.entries(payload)) {
      state.answers[key] = value
    }
  },
  setLanguage (state, payload: string) {
    state.language = payload
  }
}
