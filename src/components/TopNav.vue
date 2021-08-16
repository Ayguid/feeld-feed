<template>
  <div>
    <b-navbar class="" toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>FEEL -</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <!--
                <b-nav-text>Navbar text</b-nav-text>
                -->
          <b-nav-item to="/">Memories</b-nav-item>
          <b-nav-item to="/foods">Foods</b-nav-item>
          <!--
          <b-nav-item to="/analisis">Analisis</b-nav-item>
          -->
          <b-nav-item to="/tags">Personal Tags</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!--
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form>
            -->

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ $store.state.user.name || "User" }}</em>
            </template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="logOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "TopNav",
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
  methods: {
    async logOut(event) {
      event.preventDefault();

      try {
        await this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (ex) {
        this.errors = ex.response.data; //
      } finally {
        console.log("Whoops");
      }
    },
  },
};
</script>
<style></style>
