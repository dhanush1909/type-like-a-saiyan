<template>
  <div id="app" v-spinner="$auth.loading">
    <div class="app-container">
      <Header />
      <router-view />
      <footer class="footer">
        <a href="https://github.com/dhanush1909/type-like-a-saiyan" target="_blank">
          <font-awesome-icon icon="code-branch"></font-awesome-icon>
          <span> Github</span>
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";

export default {
  name: "app",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
