<template>
  <div class="header-view">
    <div class="logo"></div>
    <div class="content">
      <router-link :to="{ name: 'home' }"> Products </router-link>
      <router-link :to="{ name: 'home' }"> Cart </router-link>
      <router-link :to="{ name: 'home' }"> Order </router-link>
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
    height: var(--header-height);
    padding-left: 2rem;
    padding-right: 2rem;
    display: flex;
    justify-content: space-between;
    /* background-color:   rgba(255, 255, 255, 0.9); */
    border-bottom: 1px solid var(--border-color);
    /* box-shadow: 0 2px 6px rgba(26,31,28,.08); */
    font-weight: bold;
    font-size: medium;
    margin: 0 2rem;
}
div.logo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

div.content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 100%;
    
}

#logo {
    height: 2rem;
    padding: 0.6rem;
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
