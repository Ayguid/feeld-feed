<template>
  <div class="">
    <div id="chat-container" ref="listScroll" class="container">
      <ul id="lista-de-msjs">
        <li
          v-for="(msg, i) in conversation"
          :key="i"
          :class="authUser.id == msg.user.id ? 'mine' : 'other'"
        >
          {{ msg.text }}
          <!--
          <p class="mb-0">
            <q cite="">{{ msg.user.name }}</q>
          </p>
          -->
        </li>
        <li v-show="!machineThinking" class="other machineThink">
          <b-icon icon="three-dots" animation="cylon" font-scale="2"></b-icon>
        </li>
      </ul>
    </div>
    <div class="controls">
      <div>
        <b-form @submit="onSubmit" inline autocomplete="off">
          <label class="sr-only" for="inline-form-input-username">Type</label>
          <b-input-group prepend="..." class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input
              id="inline-form-input-username"
              placeholder=""
              v-model="text"
            ></b-form-input>
          </b-input-group>

          <b-button variant="primary" type="submit">Submit</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      conversation: [],
      machineThinking: false,
      questionNr: 0,
      text: "",
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
      if (msg) {
        this.conversation.push({
          user: { id: 3, name: "Pat", email: "pat@pat.com" },
          msg: msg,
        });
      }
    },
    onSubmit(event) {
      event.preventDefault();
      if (this.text) {
        this.conversation.push({
          user: this.authUser,
          text: this.text,
        });
        this.text = "";
        this.showQuestion();
      }
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
    showQuestion() {
      if (this.$store.state.questions.length > this.questionNr) {
        let question = this.$store.state.questions[this.questionNr];
        //console.log(question);
        this.machineThinking = false;
        setTimeout(() => {
          this.machineThinking = true;
          this.conversation.push(question);
          this.questionNr++;
        }, 2000);
      }
    },
  },
  mounted() {
    this.showQuestion();
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  user-select: none;
}
div.container {
  background-color: grey;
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 50vh;
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

.other {
  background: #eee;
  float: left;
}
.machineThink {
  padding: 0;
  background-color: transparent;
}

.mine {
  float: right;
  background: #0084ff;
  color: #fff;
}

.other + .mine {
  border-bottom-right-radius: 5px;
}

.mine + .mine {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.mine:last-of-type {
  border-bottom-right-radius: 30px;
}
.controls {
}
q {
  font-style: italic;
}
</style>
