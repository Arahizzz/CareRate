import Vue from 'vue'
import { MutationTree } from 'vuex'
import { ProfileState } from 'src/Models/types'
import { Question } from 'src/Models/Question/Question'
import { StartPage } from 'src/Models/TranslatedStartPage'
import { Culture } from 'src/Models/Culture'
import { AnswerInfo } from 'src/Models/AnswerInfo'

export const mutations: MutationTree<ProfileState> = {
  profileLoaded (state, payload: {startInfo: StartPage | null; questions: Question[]; languages: Culture}) {
    state.questions = payload.questions
    state.startInfo = payload.startInfo
    state.languages = payload.languages
  },
  addAnswer (state, payload: Record<string, AnswerInfo>) {
    for (const [key, value] of Object.entries(payload)) {
      Vue.set(state.answers, key, value)
    }
  },
  setLanguage (state, payload: string) {
    state.language = payload
  }
}
