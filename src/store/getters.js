const getters = {
    isLogged: state => {//validar mejor esta chanchada
        return (state.user != '') && (localStorage.getItem('access_token') != '');
      }
}

export default getters