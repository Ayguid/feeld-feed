<template>
  <div class="">
    <b-card title="User details" header-tag="header" footer-tag="footer">
      <template #header>
        <h6 class="mb-0">Profile</h6>
      </template>
      <b-card-text>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-input-group size="lg" class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="envelope"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              :disabled="!edit"
              type="email"
              v-model="form.email"
              placeholder="email"
            ></b-form-input>
          </b-input-group>
          <p class="text-danger" v-text="errors.email"></p>
          <b-input-group class="mb-2" size="lg">
            <b-input-group-prepend is-text>
              <b-icon icon="person-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              :disabled="!edit"
              type="text"
              v-model="form.name"
              placeholder="User name"
            ></b-form-input>
          </b-input-group>
          <p class="text-danger" v-text="errors.name"></p>
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
        </b-form></b-card-text
      >
      <b-input-group v-if="!edit" class="mb-2" size="lg">
        <b-button @click="edit = !edit" type="submit" variant="primary"
          ><b-icon icon="pencil" aria-label="Help"></b-icon
        ></b-button>
      </b-input-group>

      <template #footer>
        <em>Remember to save your changes</em>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "UserDetailsForm",
  data() {
    return {
      busy: false,
      show: true,
      edit: false,
      errors: {},
      form: {
        email: "",
        name: "",
      },
    };
  },
  components: {},
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
        await this.$store.dispatch("updateUserDetails", newObj);
        this.edit = false;
        this.errors = {};
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
      this.form.email = this.user.email;
      this.form.name = this.user.name;
      // Reset our form values
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {
    this.form.email = this.user.email;
    this.form.name = this.user.name;
  },
};
</script>
