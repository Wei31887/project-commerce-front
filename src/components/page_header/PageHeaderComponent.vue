<template>
  <div class="page-header-view">
    <div class="nav-part">
      navigation part
    </div>
    <div class="search">
      <div class="mt-4">
        <el-input
          v-model="input3"
          placeholder="Please input"
          class="input-with-select"
        >
          <template #prepend>
            <el-button :icon="Search" />
          </template>
          <template #append>
            <el-select
              v-model="select"
              placeholder="Select"
              style="width: 115px"
            >
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
        </el-input>
      </div>
    </div>
    <!-- <el-breadcrumb separator="/">
      <template v-for="(item, index) in breadList" :key="index">
        <el-breadcrumb-item v-if="item" :to="{ name: 'home' }">
          {{ item }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb> -->
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "PageHeader",
  setup() {
    const route = useRoute();
    const breadList = ref([]);

    // methods
    const getRoute = () => {
      let temp = [];
      let crumb = "";
      let url = route.fullPath;
      for (let i = 1; i < url.length; i++) {
        if (url[i] !== "/") {
          crumb += url[i];
        }
        if (i == url.length - 1 || url[i] === "/") {
          temp.push(crumb);
          crumb = "";
        }
      }
      breadList.value = temp;
    };

    // mounted
    onMounted(() => {
      getRoute();
    });

    // watch route
    watch(route, () => {
      getRoute();
    });

    return { breadList };
  },
};
</script>

<style>
.el-breadcrumb {
  padding: 1.5rem;
}

div.page-header-view {
  /* border-bottom: 1px solid var(--border-color); */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: var(--page-header-color);
  margin: 1rem;
  border-radius: 6px;
}
</style>
