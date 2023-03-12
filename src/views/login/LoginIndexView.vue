<template>
  <div class="container">
    <div
      class="user-box"
      :style="{
        boxShadow: `var(--el-box-shadow-light)`,
      }"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginIndexVue",
  setup() {

  },
};
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--login-background-color);
}

.user-box {
  width: 450px;
  min-height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 9px;
  padding: 3rem;
  border-top: 1px solid var(--el-border-color);
}
</style>
