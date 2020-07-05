import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { state } from './state'
import { ProfileState, RootState } from 'src/Models/types'

const namespaced = true

export const profile: Module<ProfileState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
