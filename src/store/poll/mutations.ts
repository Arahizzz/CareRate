import Vue from 'vue'
import { MutationTree } from 'vuex'
import { ProfileState } from 'Models/types'
import { TranslatedQuestion } from 'app/Models/Question/TranslatedQuestion'
import { TranslatedStartPage } from 'app/Models/TranslatedStartPage'

export const mutations: MutationTree<ProfileState> = {
  profileLoaded (state, payload: {startInfo: TranslatedStartPage | null; questions: TranslatedQuestion[]}) {
    state.questions = payload.questions
    state.startInfo = payload.startInfo
  },
  addAnswer (state, payload: Record<string, string | number | number[]>) {
    for (const [key, value] of Object.entries(payload)) {
      Vue.set(state.answers, key, value)
    }
  },
  setLanguage (state, payload: string) {
    state.language = payload
  }
}
