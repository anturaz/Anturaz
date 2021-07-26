<template>
  <div>
    <div class="q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin" />
        <q-breadcrumbs-el label="Bank Deposit" icon="account_balance" />
        <q-breadcrumbs-el label="Store Advertisment" icon="list" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md row">
      <q-card class="col-xs-12 col-md-3 q-ma-sm" v-for="BD in data" :key="BD._id">
        <q-card-section>
          <div>
            <b>Date Ordered:</b>
            {{$formatDate_DateOnly(BD.subscriptions[BD.subscriptions.length-1].date_ordered)}}
          </div>
          <div>
            <b>Month/s:</b>
            {{BD.subscriptions[BD.subscriptions.length-1].months}}
          </div>
          <div>
            <b>Total Amount:</b>
            {{BD.subscriptions[BD.subscriptions.length-1].months * BD.subscriptions[BD.subscriptions.length-1].total_amount}}
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <Evaluation
            :storeId="BD.store_id"
            type="Store Advertisment"
            :orderDetails="BD.subscriptions[BD.subscriptions.length-1]"
            :depositDetails="[]"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import Evaluation from "./Components/Evaluation.vue";
export default {
  components: {
    Evaluation
  },
  data() {
    return {
      data: []
    };
  },

  mounted() {
    this.$dbCon.service("store-advertisment").onDataChange(() => {
      this.$dbCon
        .service("store-advertisment")
        .find({
          query: {
            "subscriptions.status": "For Approval"
          }
        })
        .then(results => {
          this.data = results.data;
        });
    });
  }
};
</script>

<style>
</style>