<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { AddressbarColor } from "quasar";
export default {
  name: "App",
  created() {
    // AddressbarColor.set("primary");
    // this.$q.loadingBar.setDefaults({
    //   color: "primary",
    //   size: "3px"
    // });
  },
  data() {
    return {
      url: this.$route.path
    };
  },
  watch: {
    "$route.path": {
      handler: function(path) {
        path != "/"
          ? document
              .querySelector(".q-layout.q-layout--standard")
              .classList.remove("bg-image")
          : document
              .querySelector(".q-layout.q-layout--standard")
              .classList.add("bg-image");
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {}
};
</script>

<style scoped></style>
