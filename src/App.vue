<template>
  <div id="app">
    <div id="top-menu" v-if="$store.getters.isLogged">
      <TopNav />
    </div>
    <div id="app-body">
      <div class="container pt-2" style="">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
    <div id="bottom-menu" v-if="$store.getters.isLogged">
      <BottomNav />
    </div>
  </div>
</template>
<script>
import TopNav from "@/components/TopNav.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: { TopNav, BottomNav },
  computed: {},
  watch: {},
  methods: {},
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
