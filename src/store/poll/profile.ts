import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ProfileState, RootState } from 'Models/types'

export const state: ProfileState = {
  questions: undefined,
  answers: {}
}

const namespaced = true

export const profile: Module<ProfileState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
