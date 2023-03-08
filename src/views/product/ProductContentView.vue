<template>
  <div class="product-content-view">
    <div class="product-overview">
      <div class="product-image"></div>
      <div class="product-info">
        <div class="product-detail">
            {{ product.name }}
            {{ product.price }}
            {{ product.stock }}
            {{ product.sell }}
        </div>
        <div class="product-description">
          {{ product.description }}
        </div>
      </div>
    </div>
    <div class="product-comment"></div>
  </div>
</template>

<script>
import { GetProducts } from "@/api/product";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "ProductContentView",
  setup() {
    const route = useRoute();
    const product = ref({});
    function loadingProduct(data) {
      GetProducts({ product_id: data }).then((res) => {
        if (res.status == 200) {
          product.value = res.data.product;
        }
      });
    }

    onMounted(() => {
      loadingProduct(parseInt(route.params.id));
    });

    return {
      product,
    };
  },
};
</script>
