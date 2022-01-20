<template>
  <div class="header">
    <div class="left">
      <img src="@/assets/keyboard-logo.svg" alt="logo" />
      <router-link to="/">
        <font-awesome-icon icon="home" class="nav-icon" />
      </router-link>
      <router-link to="/typing-test">
        <font-awesome-icon icon="keyboard" class="nav-icon" />
      </router-link>
      <span @click="doLogin" v-if="!$auth.isAuthenticated">login</span>
      <span @click="doLogout" v-else>{{ $auth.user.nickname }}</span>
      <el-switch
        style="margin: 0 30px"
        v-model="theme"
        active-text="Light"
        inactive-text="Dark"
        @change="switchTheme"
      >
      </el-switch>
    </div>
    <TypingTestSettings class="settings" />
  </div>
</template>

<script>
import TypingTestSettings from "@/components/header/typingTestSettings/TypingTestSettings";

export default {
  name: "Header",
  components: {
    TypingTestSettings,
  },
  data() {
    return {
      theme: this.$theme.currentTheme === "light",
    };
  },
  methods: {
    switchTheme(value) {
      if (value === true) {
        this.$theme.setTheme("light");
      } else {
        this.$theme.setTheme("gotham");
      }
    },
    doLogin() {
      this.$auth.loginWithRedirect();
    },
    doLogout() {
      this.$auth.logout();
    },
  },
};
</script>

<style lang="scss">
.header {
  height: 7rem;
  align-items: center;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  color: var(--color-primary);

  .left {
    align-items: center;
    display: flex;

    img {
      padding: 0 20px;
      width: 60px;
    }
  }

  a {
    color: var(--color-primary);
    margin: 0 10px;

    .nav-icon {
      font-size: 25px;
    }
  }

  .nav-icon:hover,
  .router-link-exact-active {
    color: var(--color-secondary) !important;
  }
}
</style>
