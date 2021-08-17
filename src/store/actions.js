import axios from 'axios'
import {uniqueId} from '../helpers/dbHelpers.js'

const APP_ENTRY_POINT = 'http://127.0.0.1:8000/api/'

const actions = {
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
      addTagsToMemory ({ commit }, payload) {
        commit('ADD_TAGS_TO_MEMORY', payload)
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

}

export default actions