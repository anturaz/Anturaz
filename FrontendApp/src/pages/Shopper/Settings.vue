<template>
  <div :class="$q.screen.lt.sm? 'q-pa-md':'q-pa-xl'">
    <div :class="$q.screen.lt.sm? '':'flex'">
      <q-list
        class="bg-white"
        :class="$q.screen.lt.sm? 'layout-md-lg-xl' :'layout-sm-xs'"
        bordered
        style="max-height:115px"
        separator
      >
        <q-item
          clickable
          @click="current=1, $router.push('/Settings/Profile')"
          v-ripple
          v-bind:class="current==1? 'bg-primary-1': ''"
        >
          <q-item-section>Profile Settings</q-item-section>
          <q-item-section avatar>
            <div class="text-h4 text-grey">></div>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="current=2, $router.push('/Settings/Security')"
          v-ripple
          v-bind:class="current==2? 'bg-primary-1': ''"
        >
          <q-item-section>Security Settings</q-item-section>
          <q-item-section avatar>
            <div class="text-h4 text-grey">></div>
          </q-item-section>
        </q-item>
        <!-- <q-item
          clickable
          @click="current=3, $router.push('/Settings/Security')"
          v-ripple
          v-bind:class="current==2? 'bg-primary-1': ''"
        >
          <q-item-section>Security Settings</q-item-section>
          <q-item-section avatar>
            <div class="text-h4 text-grey">></div>
          </q-item-section>
        </q-item> -->
      </q-list>
      <router-view :class="$q.screen.lt.sm? '' : 'col q-px-md'"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1
    };
  },
  methods: {
    verifyPath: function() {
      if (this.$router.currentRoute.fullPath == "/Settings/Profile") {
        this.current = 1;
      } else if (this.$router.currentRoute.fullPath == "/Settings/Security") {
        this.current = 2;
      }
    }
  },
  updated() {
    this.verifyPath();
  },
  mounted() {
    this.verifyPath();
  }
};
</script>

<style>
</style>
