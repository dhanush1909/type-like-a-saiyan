<template>
  <div class="header">
    <router-link to="/"><i class="el-icon-s-home nav-icon"></i></router-link>
    <router-link to="/typing-test"
      ><i class="el-icon-monitor nav-icon"></i
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss">
.header {
  position: sticky;
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;

  a {
    color: #eeeeee !important;
    margin: 0 10px;

    .nav-icon {
      font-size: 25px;
    }
  }

  .nav-icon:hover {
    color: #f6c90e !important;
  }
}
</style>
