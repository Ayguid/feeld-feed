<template>
  <div class="">
    <b-card title="" header-tag="header">
      <template #header>
        <h6 class="mb-0">Privacy</h6>
      </template>
      <h4>Password</h4>
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-input-group v-if="!edit" class="mb-2" size="lg">
            <b-button @click="edit = !edit" type="submit" variant="primary"
              ><b-icon icon="pencil" aria-label="Help"></b-icon
            ></b-button>
          </b-input-group>
          <div v-if="edit">
            <b-input-group class="mb-2" size="lg">
              <b-input-group-prepend is-text>
                <b-icon icon="eye-slash"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="form.oldPassword"
                type="password"
                placeholder="old password"
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
          </div>
          <div v-if="edit">
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
      -->
            <b-button type="reset" variant="danger">Reset</b-button>
          </div>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "UserPrivacyForm",
  data() {
    return {
      busy: false,
      show: true,
      edit: false,
      errors: {},
      form: {
        oldPassword: "",
        password: "",
        passwordConfirm: "",
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {},
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.busy = true;
      try {
        let newObj = JSON.parse(JSON.stringify(this.form));
        const response = await this.$store.dispatch("updatePassword", newObj);
        this.edit = false;
        this.errors = {};
        this.form.oldPassword = "";
        this.form.password = "";
        this.form.passwordConfirm = "";
        //console.log("1", response.data.message);
        this.$bvToast.toast(response.data.message, {
          title: `Great:`,
          variant: "success",
          solid: true,
        });
        //this.$router.push("/");
      } catch (ex) {
        this.$bvToast.toast(ex.response.data.message, {
          title: `Errors:`,
          variant: "danger",
          solid: true,
        });
        this.errors = ex.response.data.errors; //
      } finally {
        this.busy = false;
      }
    },
    onReset(event) {
      event.preventDefault();
      this.edit = false;
      this.errors = {};
      this.form.oldPassword = "";
      this.form.password = "";
      this.form.passwordConfirm = "";
      // Reset our form values
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {},
};
</script>
