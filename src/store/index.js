import Vue from 'vue'
import Vuex from 'vuex'
import {uniqueId} from '../helpers/dbHelpers.js'
import Feelings from './feelings.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseFeelings: Feelings.feelings,
    userMemories: JSON.parse(localStorage.getItem('userMemories')) || [],
    userFoods: JSON.parse(localStorage.getItem('userFoods')) || [],
    userTags: JSON.parse(localStorage.getItem('userTags')) || [],
  },
  mutations: {
    ADD_USER_MEMORY (state, feeling){
      state.userMemories.push(feeling)
      localStorage.setItem('userMemories', JSON.stringify(state.userMemories))
    },
    DELETE_USER_MEMORY (state, id) {
      state.userMemories = state.userMemories.filter((feeling) => feeling.id != id)
      localStorage.setItem('userMemories', JSON.stringify(state.userMemories))
    },

    ADD_USER_FOOD (state, food) {
      state.userFoods.push(food)
      localStorage.setItem('userFoods', JSON.stringify(state.userFoods))
    },
    EDIT_USER_FOOD (state, food){
      const targetFood = state.userFoods.find(f => f.id === food.id)
      state.userFoods.splice(state.userFoods.indexOf(targetFood), 1, food)
      localStorage.setItem('userFoods', JSON.stringify(state.userFoods))
    },
    DELETE_USER_FOOD (state, id) {
      state.userFoods = state.userFoods.filter((tag) => tag.id != id)
      localStorage.setItem('userFoods', JSON.stringify(state.userFoods))
    },
    ADD_USER_TAGS (state, tag){
      state.userTags = state.userTags.concat(tag)
      localStorage.setItem('userTags', JSON.stringify(state.userTags))
    },
    DELETE_USER_TAG (state, id) {
      state.userTags = state.userTags.filter((tag) => tag.id != id)
      localStorage.setItem('userTags', JSON.stringify(state.userTags))
    }
  },
  actions: {
    addUserMemory ({ commit }, payload) {
      payload.id = uniqueId()
      payload.date = new Date()
      //console.log(payload);
      commit('ADD_USER_MEMORY', payload)
    },
    deleteUserMemory ({ commit }, id) {
      //console.log(id)
      commit('DELETE_USER_MEMORY', id)
    },
    addUserFood ({ commit }, payload) {
      payload.id = uniqueId()
      //console.log(payload);
      commit('ADD_USER_FOOD', payload)
    },
    editUserFood ({ commit }, payload) {
      //console.log(payload);
      commit('EDIT_USER_FOOD', payload)
    },
    deleteUserFood ({ commit }, id) {
      commit('DELETE_USER_FOOD', id)
    },
    addUserTags ({ commit }, payload) {// pensar esto como iria un array al server y volveria una coleccion de objetos
      let tags = []
      for (let index = 0; index < payload.length; index++) {
        const element = {
          id: uniqueId(),
          label: payload[index],
          date: new Date()
        };
        tags.push(element)
      }
      //console.log(payload);
      commit('ADD_USER_TAGS', tags)
    },
    deleteUSerTag ({ commit }, id){
      commit('DELETE_USER_TAG', id)
    }
  },
  modules: {
  }
})
