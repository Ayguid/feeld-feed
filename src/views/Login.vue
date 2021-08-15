<template>
  <div class="">
    Login

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Your Pass:" label-for="input-3">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Enter pass"
          required
        ></b-form-input>
      </b-form-group>
      <b-overlay
        :show="busy"
        rounded
        opacity="0.6"
        spinner-small
        spinner-variant="primary"
        class="d-inline-block"
        @hidden="onHidden"
      >
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-overlay>
      <!--
      <b-button type="submit" variant="primary">Submit</b-button>
      -->
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <p class="p-2">
      Dont have an account? <b-link to="/register">Register</b-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      busy: false,
      show: true,
      form: {
        email: "",
        password: "",
      },
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus();
    },
    async onSubmit(event) {
      event.preventDefault();
      this.busy = true;
      //alert(JSON.stringify(this.form))
      let newObj = JSON.parse(JSON.stringify(this.form));
      await this.$store.dispatch("logUser", newObj);
      this.busy = false;
      this.$router.push("/");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
