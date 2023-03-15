<template>
  <div class="header-view">
    <div class="header-upper">
      <div class="logo"></div>
      <div class="content">
        <router-link :to="{ name: 'home' }">
          <span>Products </span>
        </router-link>
      </div>

      <div class="search-bar">
        <input
          class="search-input"
          type="text"
          v-model="searchQuery"
          @input="handleInput"
          placeholder="Search products..."
        />
        <!-- <Search></Search> -->
        <ul class="upper" v-show="showResults">
          <li v-for="result in searchResults" :key="result.id">
            {{ result.name }}
          </li>
        </ul>
      </div>

      <div class="header-cart">
        <router-link :to="{ name: 'account' }"
          ><el-icon size="25px" style="padding-right: 10px"><User /></el-icon>
          <span>Account</span>
        </router-link>
        <router-link :to="{ name: 'cart' }">
          <el-icon size="25px" style="padding-right: 10px"
            ><ShoppingCart
          /></el-icon>
          <span>Cart </span>
        </router-link>
      </div>
    </div>
    <div class="header-lower">
      <ul class="lower">
        <li>
          <router-link :to="{ name: 'category', params: { category: 1 } }"
            >Protein Powder</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'category', params: { category: 2 } }"
            >Protein Bar</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'category', params: { category: 3 } }"
            >Accessories</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'category', params: { category: 4 } }"
            >Others</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HeaderComponent",
  setup() {
    const searchQuery = ref("");
    const searchResults = ref([]);
    const showResults = ref(false);

    function handleInput() {}
    return {
      searchQuery,
      searchResults,
      showResults,
      handleInput,
    };
  },
};
</script>

<style scoped>
div.header-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* justify-content: space-between; */
  /* align-items: center; */
  background-color: var(--header-upper-color);
  font-weight: bold;
  font-size: medium;
}

div.header-upper {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
div.header-lower {
  flex: 1;
  background-color: var(--header-lower-color);
  display: flex;
  justify-content: space-around;
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
  color: black;
}

a {
  padding-left: 1rem;
  padding-right: 1rem;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
}
.search-bar {
  position: relative;
}

input.search-input {
  width: 100%;
  padding: 0.6rem 1rem;
  width: 450px;
  border: 0.8px solid;
  border-radius: 2px;
}

ul.lower {
  z-index: 999;

  /* border: 1px solid #ccc; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}
ul.upper {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  padding: 5px;
  cursor: pointer;
}
li:hover {
  background-color: #f2f2f2;
}
</style>
