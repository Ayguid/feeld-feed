<template>
  <div class="">
    <div id="chat-container" ref="listScroll" class="container">
      <ul id="lista-de-msjs">
        <li
          v-for="(msg, i) in conversation"
          :key="i"
          :class="authUser.id == msg.user.id ? 'mio' : 'el'"
        >
          {{ msg.msg }}
          <p class="mb-0">
            <q cite="">{{ msg.user.name }}</q>
          </p>
        </li>
      </ul>
    </div>
    <div class="controles">
      <button type="button" name="button" @click="respuesta()">
        Amigo Responde
      </button>
      <button type="button" name="button" @click="mandarMsg()">
        Yo respondo
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      conversation: [
        {
          user: { id: 3, name: "Pat", email: "pat@pat.com" },
          msg: "ASS?",
        },
        {
          user: { id: 1, name: "Guido", email: "Guido@Guido.com" },
          msg: "YEAH AND SOME TITAIS!!!",
        },
        {
          user: { id: 3, name: "Pat", email: "pat@pat.com" },
          msg: "NOICE",
        },
      ],
    };
  },
  components: {},
  watch: {
    //piolisimos los watchers, si tal data cambia podes triggerear funcs and stuff
    //piolisima jodido poder apagar los eslint errors en un comment!
    conversation: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue, oldValue) {
        // sets off when `someData` changes
        this.updateScrollNextTick();
      },
      immediate: false, // if you also want to execute the handler above on creation of the component
    },
  },
  computed: {
    authUser() {
      return this.$store.getters.authUser;
    },
  },
  methods: {
    respuesta() {
      var msg = prompt("escribi puto");
      this.conversation.push({
        user: { id: 3, name: "Pat", email: "pat@pat.com" },
        msg: msg,
      });
      //this.scrollToBottom();
    },
    mandarMsg() {
      var msg = prompt("escribi puto");
      this.conversation.push({
        user: { id: this.authUser.id, name: "Guido", email: "Guido@Guido.com" },
        msg: msg,
      });
      //this.scrollToBottom();
    },
    updateScrollNextTick() {
      let scrolledHeight = this.$refs.listScroll.scrollHeight;
      this.$nextTick(() => {
        this.$refs.listScroll.scrollTo({
          behavior: "smooth",
          top: scrolledHeight,
        });
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  user-select: none;
}
div.container {
  max-width: 50%;
  margin-left: 25%;
  background-color: grey;
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 75vh;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

ul li {
  display: inline-block;
  clear: both;
  padding: 20px;
  border-radius: 30px;
  margin-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
}

.el {
  background: #eee;
  float: left;
}

.mio {
  float: right;
  background: #0084ff;
  color: #fff;
}

.el + .mio {
  border-bottom-right-radius: 5px;
}

.mio + .mio {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.mio:last-of-type {
  border-bottom-right-radius: 30px;
}
.controles {
  margin-top: 50px;
  max-width: 50%;
  margin-left: 25%;
  position: relative;
  display: flex;
  justify-content: space-between;
}
q {
  font-style: italic;
}
</style>
