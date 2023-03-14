<template>
  <div class="product-view">
    <picture class="home-page-img">
      <img :src="BASE_API + '/static/home/home_page.jpg'" alt="homePage" />
    </picture>

    <div class="category">

      <h2 class="category_title">Product Category</h2>

      <Category-Component></Category-Component>
    </div>
    <div class="product-list">
      <h2 class="category_title">Hit Products</h2>
      <Hit-Product-List></Hit-Product-List>
    </div>
  </div>
</template>

<script>
import { BASE_API } from "@/config/config.js";
import CategoryComponent from "@/components/category/CategoryComponent.vue";
import HitProductList from "@/components/product_list/HitProductListComponent.vue";

export default {
  name: "ProductView",
  components: {
    CategoryComponent,
    HitProductList,
  },
  setup() {
    return {
      BASE_API,
    };
  },
};
</script>

<style>
div.product-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

picture.home-page-img {
  width: 100%;
  /* height: auto; */
  overflow: hidden;
  padding-bottom: 1.5rem;
}
img {
  width: 100%;
}
</style>
