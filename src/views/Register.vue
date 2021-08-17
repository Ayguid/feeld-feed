<template>
  <div class="blah">
    Register
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
        ></b-form-input>
        <p class="text-danger" v-text="errors.email"></p>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Your Pass:" label-for="input-3">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Enter pass"
        ></b-form-input>
        <p class="text-danger" v-text="errors.password"></p>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Your Pass Confirm:"
        label-for="input-4"
      >
        <b-form-input
          id="input-2"
          v-model="form.passwordconfirm"
          placeholder="Enter pass confirmation"
        ></b-form-input>
        <p class="text-danger" v-text="errors.password"></p>
      </b-form-group>

      <b-overlay
        :show="busy"
        rounded
        opacity="0.6"
        spinner-small
        spinner-variant="primary"
        class="d-inline-block"
      >
        <b-button class="mr-1" type="submit" variant="primary">Submit</b-button>
      </b-overlay>
      <!--
      <b-button type="reset" variant="danger">Reset</b-button>
      -->
    </b-form>

    <p class="p-2">Have an account? <b-link to="/login">Login</b-link></p>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      busy: false,
      show: true,
      form: {
        email: "",
        name: "",
        password: "",
        passwordconfirm: "",
      },
      errors: {},
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.busy = true;
      try {
        let newObj = JSON.parse(JSON.stringify(this.form));
        await this.$store.dispatch("registerUser", newObj);
        this.$router.push("/");
      } catch (ex) {
        this.errors = ex.response.data.errors; //
      } finally {
        this.busy = false;
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.errors = {};
      this.form.email = "";
      this.form.name = "";
      this.form.password = "";
      this.form.passwordconfirm = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
