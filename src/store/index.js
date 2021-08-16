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
  getters: {
    isLogged: state => {//validar mejor esta chanchada
      return (state.user != '') && (localStorage.getItem('access_token') != '');
    }
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
    RESET_PASSWORD (state, user) {
      console.log(state.user, user);
    },
    LOG_OUT (state){
      state.access_token = null
      state.user = ''
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
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
      const respToken = await axios.post(APP_ENTRY_POINT + 'register', payload)
      //console.log(respToken.data.access_token);
      const access_token = respToken.data.access_token //
      const config = {
        headers: { Authorization: `Bearer ${access_token}` }
      }
      //console.log(respToken);
      const respMe = await axios.post(APP_ENTRY_POINT + 'me', {}, config)
      commit('SET_ACCESS_TOKEN', respToken.data) //pseudo login
      commit('SET_USER', respMe.data) //pseudo login
    },
    async logUser ({ commit }, payload){
      //console.log(payload);
      const respToken = await axios.post(APP_ENTRY_POINT + 'login', payload)
      const access_token = respToken.data.access_token //
      const config = {
        headers: { Authorization: `Bearer ${access_token}` }
      }
      const respMe = await axios.post(APP_ENTRY_POINT + 'me', {}, config)
      commit('SET_ACCESS_TOKEN', respToken.data)
      commit('SET_USER', respMe.data)
    },
    async updateUserDetails ({ commit }, payload) {
      const access_token = this.state.access_token.access_token //
      const config = {
        headers: { Authorization: `Bearer ${access_token}` }
      }
      const respMe = await axios.post(APP_ENTRY_POINT + 'updateUserDetails', payload, config)
      commit('SET_USER', respMe.data)
    },
    async updatePassword ({ commit }, payload){
      const access_token = this.state.access_token.access_token //
      const config = {
        headers: { Authorization: `Bearer ${access_token}` }
      }
      const resp = await axios.post(APP_ENTRY_POINT + 'changePassword', payload, config)
      commit('RESET_PASSWORD', resp.data)
      return resp
    },
    async forgotPassword ({ commit }, payload){
      const resp = await axios.post(APP_ENTRY_POINT + 'forgot-password', payload)
      commit('RESET_PASSWORD', resp.data)
      return resp
    },
    async resetPassword ({ commit }, payload){
      const resp = await axios.post(APP_ENTRY_POINT + 'reset-password', payload)
      commit('RESET_PASSWORD', resp.data)
      return resp
    },
    async logout({ commit }){
      const access_token = this.state.access_token.access_token //
      const config = {
        headers: { Authorization: `Bearer ${access_token}` }
      }
      await axios.post(APP_ENTRY_POINT + 'logout', {}, config)
      commit('LOG_OUT')
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
