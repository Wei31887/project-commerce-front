<template>
  <div class="category-view">
    <div
      class="category-list"
      v-for="(item, index) in catagories"
      :key="index"
      @click="handleClick(item)"
    >
      <div class="category-card">
        <div class="pic"></div>
        <div class="category-info">
          <div class="category-title">
            <h1>{{ item.name }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { listProductCategories } from "@/api/category";

export default {
  name: "CategoryComponent",
  setup() {
    const chooseType = ref(true);
    const catagories = ref([]);

    // methods

    function loadingCategory() {
      listProductCategories()
        .then((res) => {
          if (res.status == 200) {
            catagories.value = res.data["categories"];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function handleClickType() {
      if (!chooseType.value) {
        chooseType.value = !chooseType.value;
      }
    }
    function handleClickCatalog() {
      if (chooseType.value) {
        chooseType.value = !chooseType.value;
      }
    }

    // mounted
    onMounted(() => {
      loadingCategory();
    });

    return {
      chooseType,
      handleClickType,
      handleClickCatalog,
      catagories,
    };
  },
};
</script>

<style scoped>
div.category-view {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

div.category-card {
  border-radius: 6px;
  width: 10rem;
  height: 10rem;
  padding: 2rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--category-card-color);
  box-shadow: 0 3px 6px rgba(29, 30, 29, 0.08);
}
div.category-card:hover {
  cursor: pointer;
  /* box-shadow: 0 0 1px 1px var(--border-shadow-color-1), 0 0 4px 6px var(--border-shadow-color-2); */
  transition: 150ms;
  /* transform: translate3d(-1px, -3px, -2px); */
  /* box-shadow: 0 5px 15px 0 rgba(0,0,0,0.08); */
  box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.08);
}
</style>
