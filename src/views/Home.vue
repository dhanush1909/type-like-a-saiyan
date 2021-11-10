<template>
  <div class="home">
    <div class="logo-container">
      <img alt="Vue logo" src="../assets/logo.png" />
      <br />
      <br />
      <div>Created with love by DK. TLS is a minimalistic typing test.</div>
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
    min-height: 300px;
    text-align: center;

    img {
      height: 100%;
    }
  }
}
</style>
>
