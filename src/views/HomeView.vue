<template>
  <div class="container">
    <!-- header -->
    <header class="header">
      <Header-Component></Header-Component>
    </header>
    <main class="content-container">
      <!-- page header -->
      <div class="page-header" ref="pageheader">
        <Page-Header></Page-Header>
      </div>
      <!-- content -->
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
    <!-- footer -->
    <footer class="footer">
      <Footer-Component></Footer-Component>
    </footer>
  </div>
</template>

<script>
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import FooterComponent from "@/components/footer/FooterComponent.vue";
import PageHeader from "@/components/page_header/PageHeaderComponent.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    FooterComponent,
    PageHeader
  },
  setup() {},
};
</script>

<style>
div.container {
  position: relative;
  height: 100%;
  background-color: var(--background-color);
}

header.header {
  z-index: 5;
  position: sticky;
  top: 0px;
}

main.content-container {
  width: var(--main-container-width);
  display: flex;
  position: relative;
  overflow: scroll;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  position: relative;
  background-color: var(--background-color);
}

div.page-header {
  z-index: 4;
  width: 100%;
}

footer.footer {
  z-index: 3;
  position: relative;
  bottom: 0px;
  width: 100%;
}
</style>
