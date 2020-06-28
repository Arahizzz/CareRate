import Vue from 'vue'
import { MutationTree } from 'vuex'
import { ProfileState } from 'Models/types'
import { Question } from 'Models/Question/Question'
import { StartPage } from 'app/Models/TranslatedStartPage'
import { Culture } from 'Models/Culture'

export const mutations: MutationTree<ProfileState> = {
  profileLoaded (state, payload: {startInfo: StartPage | null; questions: Question[]; languages: Culture}) {
    state.questions = payload.questions
    state.startInfo = payload.startInfo
    state.languages = payload.languages
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
