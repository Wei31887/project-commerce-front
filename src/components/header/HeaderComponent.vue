<template>
  <div class="header-view">
    <div class="logo"></div>
    <div class="content">
      <router-link :to="{ name: 'home' }"> Products </router-link>
    </div>
    <div class="header-cart">
      <router-link :to="{ name: 'cart' }"> Cart </router-link>
      <router-link :to="{ name: 'order' }"> Order </router-link>
      <router-link :to="{ name: 'home' }"> User </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  setup() {},
};
</script>

<style scoped>
div.header-view {
  height: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--header-color);
  /* border-bottom: 1px solid var(--border-color); */
  font-weight: bold;
  font-size: medium;
  /* margin: 0 2rem; */
}
div.logo {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

div.header-cart {
  display: flex;
  
  justify-content: flex-end;
  align-items: center;
}


a {
  padding-left: 1rem;
  padding-right: 1rem;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
} 
</style>
