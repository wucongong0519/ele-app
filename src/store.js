import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    location: {},
    address: ''
}

const getters = {
    location: state => state.location,
    address: state => state.address
}

const actions = {
    getLocation: ({commit}, location) => {
        commit('setLocation', location)
    },
    getAddress: ({commit}, address) => {
        commit('setAddress', address)
    }
}

const mutations = {
    setLocation(state, location){
      if(location) {
          state.location = location
      } else {
          state.location = {}
      }
    },
    setAddress(state, address){
        if(address) {
            state.address = address
        } else {
            state.address = ''
        }
      }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})