import { MutationTree } from 'vuex'
import { ProfileState } from 'Models/types'
import { Question } from 'Models/Question/Question'

export const mutations: MutationTree<ProfileState> = {
  profileLoaded (state, payload: Array<Question>) {
    state.questions = payload
  }
}
