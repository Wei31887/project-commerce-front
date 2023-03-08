<template>
  <div class="product-view">
    <div class="category">
      category
      <Category-Component></Category-Component>
    </div>
    <div class="product-list">
      products
      <Product-List></Product-List>
    </div>
  </div>
</template>

<script>
import CategoryComponent from "@/components/category/CategoryComponent.vue";
import ProductList from "@/components/product_list/ProductListComponent.vue";

export default {
  name: "ProductView",
  components: {
    CategoryComponent,
    ProductList,
  },
};
</script>

<style>
div.product-view {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
