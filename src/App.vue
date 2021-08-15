<template>
  <div id="app">
    <div id="nav" class="">
      <!--
      <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link>
      -->
      <!--fixed="top"-->
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
            <b-nav-item to="/analisis">Analisis</b-nav-item>
            <b-nav-item to="/tags">Personal Tags</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <!--margin-top: 60px-->
    <div class="container pt-2" style="">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

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
