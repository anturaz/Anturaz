<template>
  <div>
    <div class="row">
      <div class="col-12">
        <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
          <template v-slot:avatar>
            <q-icon name="error" color="white" />
          </template>
          <ul>
            <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
          </ul>
        </q-banner>
      </div>
    </div>
    <AdvertiseStore />
    <div align="right" class="q-pt-xl">
      <q-btn class="q-mr-sm" label="Back " color="grey" @click="back" />
      <q-btn label="Next" color="primary" @click="save" />
    </div>
  </div>
</template>
<script>
import AdvertiseStore from "../StoreManagement/advertiseStore.vue";
export default {
  components: {
    AdvertiseStore
  },
  data() {
    return {
      error: []
    };
  },
  methods: {
    save: function() {
      this.$dbCon
        .service("store")
        .patch(this.$local.getItem("store_token"), { current_step: 7 });
    },
    back: function() {
      this.$dbCon
        .service("store")
        .patch(this.$local.getItem("store_token"), { current_step: 5 });
    }
  }
};
</script>