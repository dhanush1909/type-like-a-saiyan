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
    </div>
    <TypingTestSettings class="settings"/>
  </div>
</template>

<script>
import TypingTestSettings from '@/components/header/typingTestSettings/TypingTestSettings'

export default {
  name: "Header",
  components: {
    TypingTestSettings,
  }
};
</script>

<style lang="scss">
.header {
  position: sticky;
  height: 100px;
  align-items: center;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  
  .left {
    align-items: center;
    display: flex;

    img {
      padding: 0 20px;
      width: 60px;
    }
  }

  a {
    color: rgba(255,255,255,0.7);
    margin: 0 10px;

    .nav-icon {
      font-size: 25px;
    }
  }

  .nav-icon:hover, .router-link-exact-active {
    color: #f6c90e !important;
  }
}
</style>
