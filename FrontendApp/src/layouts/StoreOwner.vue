<template>
  <div>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <img :src="$appLink+'/uploads/admin/sample_logo.png'" width="40px" />
          <q-toolbar-title class="text-black text-subtitle1">STOREOWNER DASHBOARD</q-toolbar-title>
          <div class="text-black">Logout</div>
          <q-btn flat color="black" round dense icon="logout" @click="logout" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page v-if="this.store.current_step== -1" padding >
          <Dashboard />
        </q-page>
        <q-page v-if="this.store.current_step!= -1" padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import Dashboard from "pages/StoreOwner/Dashboard.vue";
import WidgetAnnouncement from "../widgets/announcements.vue";
export default {
  components: {
    Dashboard,
    WidgetAnnouncement
  },
  data() {
    return {
      drawer: false,
      store: {},
      user: {},
      isOwner: false
    };
  },
  methods: {
    getData: async function() {
      await this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.$local.getItem("store_token")
          }
        })
        .then(results => {
          console.log('results', results)
          console.log('this.$local.getItem("store_token")', this.$local.getItem("store_token"))
          console.log("results data 0", results.data[0])
          this.store = results.data[0];
          console.log('this.store', this.store)
          if (this.store.current_step != -1) {
            this.$router.push("/StoreOwner/PublishStore");
          }
        });
      this.user = await this.$getUser();
    },
    logout: function() {
      this.$local.clear();
      this.$dbCon.logout();
      this.$router.push("/StoreOwner/Login");
    }
  },
  mounted() {

   this.$dbCon.service("store").onDataChange(() => {
      this.getData();
      
    }); 
  },
  created() {
    if (!this.$local.has(this.$appLink+"-jwt")) {
      this.$local.clear();
      this.$router.push("/StoreOwner/Login");
    }
  }
};
</script>
<style scoped>

</style>
