<template>
  <div>
    <div class="q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin"/>
        <q-breadcrumbs-el label="Maintenance" icon="widgets"/>
        <q-breadcrumbs-el label="Layout" icon="edit"/>
      </q-breadcrumbs>
    </div>
    <div class="flex">
      <q-list
        class="bg-white"
        :class="$q.screen.lt.sm? 'layout-md-lg-xl' :'layout-sm-xs'"
        bordered
        separator
      >
        <q-item
          clickable
          @click="current=1, $router.push('/Admin/Maintenance/Layout/Logo')"
          v-ripple
          v-bind:class="current==1? 'bg-primary-1': ''"
        >
          <q-item-section>Logo</q-item-section>
          <q-item-section avatar>
            <div class="text-h4 text-grey">></div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="current=2, $router.push('/Admin/Maintenance/Layout/Favicon')"
          v-ripple
          v-bind:class="current==2? 'bg-primary-1': ''"
        >
          <q-item-section>Favicon</q-item-section>
          <q-item-section avatar>
            <div class="text-h4 text-grey">></div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="current=3, $router.push('/Admin/Maintenance/Layout/FeaturedPhotos')"
          v-ripple
          v-bind:class="current==3? 'bg-primary-1': ''"
        >
          <q-item-section>Featured Photos</q-item-section>
          <q-item-section avatar>
            <div class="text-h4 text-grey">></div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="current=4, $router.push('/Admin/Maintenance/Layout/Announcement')"
          v-ripple
          v-bind:class="current==4? 'bg-primary-1': ''"
        >
          <q-item-section>Announcement</q-item-section>
          <q-item-section avatar>
            <div class="text-h4 text-grey">></div>
          </q-item-section>
        </q-item>
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
  mounted() {
    this.$router.push("/Admin/Maintenance/Layout/Logo");
  }
};
</script>
 <style>
.layout-sm-xs {
  min-width: 270p;
  max-width: 270px;
  max-height: 230px;
}
.layout-md-lg-xl {
  width: 100%;
  max-height: 230px;
}
</style>