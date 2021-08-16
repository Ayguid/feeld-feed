<template>
  <div>
    <div class="bottom-nav-buttons-container">
      <!--other button -->
      <b-button class="m-2" variant="outline-primary">
        <b-icon icon="chat-left-dots-fill" aria-hidden="true"></b-icon>
      </b-button>
      <!--add button -->
      <b-button
        to="analisis"
        class="m-2"
        type="submit"
        variant="outline-primary"
        ><b-icon icon="node-minus" scale="2"></b-icon
      ></b-button>
      <!--other button -->
      <b-button class="m-2" variant="outline-primary">
        <b-icon icon="lock-fill" aria-hidden="true"></b-icon>
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "BottomNav",
  data() {
    return {
      show: true,
      errors: {},
      form: {
        email: "",
        password: "",
      },
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
};
</script>
<style></style>
