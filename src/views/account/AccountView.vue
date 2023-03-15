<template>
  <div class="account-view">
    <div class="account-nav">
      <ul>
        <li><router-link :to="{ name: 'order' }">Order</router-link></li>
        <li><router-link :to="{ name: 'information' }">Information</router-link></li>
      </ul>
    </div>
    <div class="account-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: "AccountView",
  setup() {
    onMounted(() => {});
  },
};
</script>

<style scoped>
div.account-view {
  display: flex;
  min-height: 100%;
  padding: 2rem;
}
div.account-nav {
  flex: 1;
  height: 100%;
  background-color: white;
  border-radius: 6px;
  margin: 1rem;
  padding: 1rem;
}
div.account-container {
  flex: 5;
  height: 100%;
  background-color: white;
  border-radius: 6px;
  margin: 1rem;
  padding: 2rem;
}

ul {
   list-style: none;
   padding: 0; 
}
li {
    text-decoration: none;
}
a {
    text-decoration: none;
}
</style>
