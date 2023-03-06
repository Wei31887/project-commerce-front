<template>
  <div class="product-view">
    <div class="category">category
        <Aside-Component></Aside-Component>
    </div>
    <div class="product-list">products</div>
  </div>
</template>

<script>
import { listProducts } from "@/api/product";
import { onMounted, ref, computed, reactive, toRefs } from "vue";
import AsideComponent from "@/components/aside/AsideComponent.vue"

export default {
  name: "ProductView",
  components: {
    AsideComponent,
  },    
  setup() {
    const total = ref(50);
    const PageState = reactive({
      pageSize: 8,
      currentPage: 1,
    });

    const currentTotal = computed(() => {
      return total.value;
    });

    
    const productList = reactive({
      products: [],
      categoryId: 0,
    });

    // methods
    function loadingProduct() {
      listProducts({
        limit: PageState.pageSize,
        offset: PageState.currentPage,
      })
        .then((res) => {
          if (res.status == 200) {
            productList.products = res.data["product"];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    

    onMounted(() => {
      loadingProduct();
    });

    return {
      ...toRefs(PageState),
      ...toRefs(productList),
      currentTotal,
      loadingProduct,
    };
  },
};
</script>

<style>
div.product-view{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

div.category {
    width: 20%;
}
div.product-list {
    width: 80%;
}
</style>
