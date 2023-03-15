<template>
  <div class="product-list-view">
    <div class="product-filter">
      <h3>Filter</h3>
    </div>
    <div class="product-list-part">
      <div class="product-category-title"></div>
      <div class="product-list-container">
        <div
          class="product-list"
          v-for="(item, index) in products"
          :key="index"
          @click="handleClick(item)"
        >
          <div class="product-card">
            <div class="pic">
              <img :src="BASE_API + '/' + item.image" :alt="item.name" />
            </div>
            <div class="product-info">
              <div class="product-title">
                <h2>{{ item.name }}</h2>
              </div>
              <div class="product-price">
                <span> NT${{ item.price }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_API } from "@/config/config.js";
import { onMounted, watch } from "vue";
import { listProductByCategory } from "@/api/product";
import { toRefs, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";

export default {
  name: "ProductListView",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const requestForm = reactive({
      categoryId: 0,
      pageState: {
        offset: 0,
        total: 10,
      },
    });
    const productList = reactive({
      products: [],
    });

    // methods
    function handleClick(item) {
      router.push({ name: "content", params: { id: item.id } });
    }

    function loadingProduct() {
      listProductByCategory({
        limit: parseInt(requestForm.pageState.total),
        offset: parseInt(requestForm.pageState.offset),
        category_id: parseInt(requestForm.categoryId),
      })
        .then((res) => {
          if (res.status == 200) {
            productList.products = res.data["product"];
          } else {
            ElNotification({
              title: "Product",
              message: "Product",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMounted(() => {
      // console.log(route.params["category"])
      requestForm.categoryId = route.params["category"];
      loadingProduct();
    });

    watch(route, (newRoute) => {
      if (newRoute.params["category"]) {
        requestForm.categoryId = newRoute.params["category"]
        loadingProduct()
        }
      }
    )

    return {
      ...toRefs(productList),
      ...toRefs(requestForm),
      handleClick,
      loadingProduct,
      BASE_API,
    };
  },
};
</script>

<style scoped>
div.product-list-view {
  /* /* width: 100%; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-items: center; */
  /* justify-content: center;  */
  padding: 2rem;
}

div.product-filter {
  position: relative;
  left: 0;
  flex: 2;
}

div.product-list-part {
  flex: 5;
}

div.product-list-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: flex-start;
}

div.product-card {
  border-radius: 6px;
  width: 14rem;
  height: 22rem;
  margin: 1.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--product-card-color);
  box-shadow: 0 3px 6px rgba(29, 30, 29, 0.08);
}
div.product-card:hover {
  cursor: pointer;
  transition: 150ms;
  transform: translate3d(-1px, -3px, -2px);
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.08);
}

div.pic {
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-height: 100%; */
  overflow-y: hidden;
  flex: 5;
}
div.product-info {
  flex: 2;
  padding-bottom: 1rem;
}
</style>
