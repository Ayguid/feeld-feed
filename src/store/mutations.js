const mutations = {
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
      ADD_USER_MEMORY (state, memory){
        state.userMemories.push(memory)
        localStorage.setItem('userMemories', JSON.stringify(state.userMemories))
      },
      SELECT_USER_MEMORY (state, memory){
        state.selectedMemory = memory
      },
      EDIT_USER_MEMORY(state, memory){
        console.log(memory);
        state.userMemories.splice(state.userMemories.indexOf(this.state.selectedMemory), 1, memory)
        localStorage.setItem('userMemories', JSON.stringify(state.userMemories))
      },
      DELETE_USER_MEMORY (state) {
        const targetMemory = this.state.selectedMemory
        state.userMemories = state.userMemories.filter((memory) => memory.id != targetMemory.id)
        localStorage.setItem('userMemories', JSON.stringify(state.userMemories))
      },
      ADD_TAGS_TO_MEMORY (state, payload) {
        const targetMemory = this.state.selectedMemory
        targetMemory.tags = payload
        state.userMemories.splice(state.userMemories.indexOf(targetMemory), 1, targetMemory)
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
    }
export default mutations