<template>
  <div>
    <div class="pb-2">
      <h6 class="">Sure you want to delete it ?! This cannot be undone</h6>
    </div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-button type="submit" variant="primary">Submit</b-button>
      <!--
      <b-button type="reset" variant="danger">Reset</b-button>
      -->
    </b-form>
  </div>
</template>
<script>
export default {
  name: "DeleteMemoryForm",
  data() {
    return {
      form: {},
      show: true,
    };
  },
  computed: {},
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      await this.$store.dispatch("deleteUserMemory");
      //this.$store.dispatch("selectUserMemory", null); // reset stores selectedMemory
      this.$emit("close_modal");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
