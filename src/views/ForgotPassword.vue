<template>
  <div class="blah">
    <b-card title="Forgot Password:" sub-title="">
      <b-card-text>
        <div>
          <b-form @submit="forgotPassword" @reset="onResetMailForm" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll send you a code."
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>

            <div v-if="!sendCode">
              <b-overlay
                :show="busy"
                rounded
                opacity="0.6"
                spinner-small
                spinner-variant="primary"
                class="d-inline-block"
              >
                <b-button type="submit" variant="primary">Submit</b-button>
              </b-overlay>
            </div>
            <!--
      <b-button type="submit" variant="primary">Submit</b-button>
      
        <b-button type="reset" variant="danger">Reset</b-button>-->
          </b-form>
        </div>

        <div v-if="sendCode">
          <b-form
            @submit="resetPassword"
            @reset="onResetPasswordForm"
            v-if="show"
          >
            <b-input-group class="mb-2" size="lg">
              <b-input-group-prepend is-text>
                <b-icon icon="lock"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="form.code"
                type="text"
                placeholder="code"
              ></b-form-input>
            </b-input-group>
            <b-input-group class="mb-2" size="lg">
              <b-input-group-prepend is-text>
                <b-icon icon="eye-slash-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="form.password"
                type="password"
                placeholder="new password"
              ></b-form-input>
            </b-input-group>

            <b-input-group class="mb-2" size="lg">
              <b-input-group-prepend is-text>
                <b-icon icon="eye-slash-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="form.passwordConfirm"
                type="password"
                placeholder="new password confirm"
              ></b-form-input>
            </b-input-group>

            <div v-if="sendCode">
              <b-overlay
                :show="busy"
                rounded
                opacity="0.6"
                spinner-small
                spinner-variant="primary"
                class="d-inline-block"
              >
                <b-button type="submit" variant="primary">Submit</b-button>
              </b-overlay>
              <!--
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
          -->
            </div>
          </b-form>
        </div>
        <p class="p-2">Have an account? <b-link to="/login">Login</b-link></p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      busy: false,
      show: true,
      errors: {},
      sendCode: false,
      form: {
        code: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    async forgotPassword(event) {
      event.preventDefault();
      this.busy = true;
      try {
        let newObj = JSON.parse(JSON.stringify(this.form));
        const response = await this.$store.dispatch("forgotPassword", newObj);
        this.$bvToast.toast(`Check your spam just in case:`, {
          title: response.data.message,
          variant: "success",
          solid: true,
        });
        this.sendCode = true;
        this.form.code = "";
        //this.form.email = "";
        //this.form.password = "";
        //this.form.passwordConfirm = "";
        //this.$router.push("/");
      } catch (ex) {
        this.$bvToast.toast(ex.response.data.message, {
          title: `Errors:`,
          variant: "danger",
          solid: true,
        });
        this.errors = ex.response.data; //
      } finally {
        this.busy = false;
      }
    },
    async resetPassword(event) {
      event.preventDefault();
      this.busy = true;
      try {
        let newObj = JSON.parse(JSON.stringify(this.form));
        const response = await this.$store.dispatch("resetPassword", newObj);
        //this.$router.push("/");
        this.$bvToast.toast(`Check your spam just in case:`, {
          title: response.data.message,
          variant: "success",
          solid: true,
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } catch (ex) {
        this.$bvToast.toast(ex.response.data.message, {
          title: `Errors:`,
          variant: "danger",
          solid: true,
        });
        this.errors = ex.response.data; //
      } finally {
        this.busy = false;
      }
    },
    onResetMailForm(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onResetPasswordForm(event) {
      event.preventDefault();
      // Reset our form values
      this.form.code = "";
      this.form.password = "";
      this.form.passwordConfirm = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
