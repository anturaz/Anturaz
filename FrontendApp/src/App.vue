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
};
</script>

