import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {uniqueId} from '../helpers/dbHelpers.js'
import Feelings from './feelings.js'

Vue.use(Vuex)
const APP_ENTRY_POINT = 'http://127.0.0.1:8000/api/'

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) ||'',
    access_token: JSON.parse(localStorage.getItem('access_token')) ||'',
    baseFeelings: Feelings.feelings,
    userMemories: JSON.parse(localStorage.getItem('userMemories')) || [],
    userFoods: JSON.parse(localStorage.getItem('userFoods')) || [],
    userTags: JSON.parse(localStorage.getItem('userTags')) || [],
  },
  mutations: {
    SET_ACCESS_TOKEN (state, token){
      state.access_token = token
      localStorage.setItem('access_token', JSON.stringify(state.access_token))
    },
    SET_USER (state, user){
      state.user = user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
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
    async registerUser ({ commit }, payload){
      //console.log(payload);
      try {
        const respToken = await axios.post(APP_ENTRY_POINT + 'register', payload)
        //console.log(respToken.data.access_token);
        const access_token = respToken.data.access_token //
        const config = {
          headers: { Authorization: `Bearer ${access_token}` }
        }
        const respMe = await axios.post(APP_ENTRY_POINT + 'me', {}, config)
        commit('SET_ACCESS_TOKEN', respToken.data)
        commit('SET_USER', respMe.data)
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
      //commit('LOG_USER', payload)
    },
    async logUser ({ commit }, payload){
      //console.log(payload);
      try {
        const respToken = await axios.post(APP_ENTRY_POINT + 'login', payload)
        //console.log(respToken.data.access_token);
        const access_token = respToken.data.access_token //
        const config = {
          headers: { Authorization: `Bearer ${access_token}` }
        }
        const respMe = await axios.post(APP_ENTRY_POINT + 'me', {}, config)
        commit('SET_ACCESS_TOKEN', respToken.data)
        commit('SET_USER', respMe.data)
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
      //commit('LOG_USER', payload)
    },
    async logout({ commit }){
      try {
        const access_token = this.state.access_token.access_token //
        const config = {
          headers: { Authorization: `Bearer ${access_token}` }
        }
        await axios.post(APP_ENTRY_POINT + 'logout', {}, config)
        //console.log(respToken.data.access_token);
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_USER', '')
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },
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
