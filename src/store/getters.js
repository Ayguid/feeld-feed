const getters = {
  isLogged: state => {//validar mejor esta chanchada
    return (state.user != '') && (localStorage.getItem('access_token') != '');
  },
  authUser: state => {
    return state.user
  }

}

export default getters