<template>
  <div class="home">
    <div class="logo-container">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss">
.home {
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;

  .logo-container {
    height: 50%;

    img {
      height: 100%;
    }
  }
}
</style>
>
