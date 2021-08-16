<template>
  <div class="">
    <UserDetailsForm />
    <hr />
    <UserPrivacyForm />
  </div>
</template>

<script>
import UserDetailsForm from "@/components/forms/UserDetailsForm.vue";
import UserPrivacyForm from "@/components/forms/UserPrivacyForm.vue";
export default {
  name: "Profile",
  components: { UserDetailsForm, UserPrivacyForm },
  data() {
    return {};
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {},
  methods: {},
  mounted() {},
};
</script>
