<template>
  <div>
    <div class="q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/Admin" />
        <q-breadcrumbs-el label="Bank Deposit" icon="account_balance" />
        <q-breadcrumbs-el label="Service Advertisment" icon="list" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md row">
      <q-card
        class="col-xs-12 col-md-3 q-ma-sm"
        v-for="BD in data"
        :key="BD._id"
      >
        <q-card-section>
          <div>
            <b>Date Ordered:</b>
            {{ $formatDate_DateOnly(BD.date_ordered) }}
          </div>
          <div>
            <b>Month/s:</b>
            {{ BD.months }}
          </div>
          <div>
            <b>Total Amount:</b>
            {{ BD.months * BD.total_amount }}
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <Evaluation
            :storeId="BD.store_id"
            type="Service Advertisment"
            :orderDetails="BD"
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
    this.$dbCon.service("service-advertisment").onDataChange(() => {
      this.$dbCon
        .service("service-advertisment")
        .find({
          query: {
            status: "For Approval"
          }
        })
        .then(results => {
          // console.log(results)
          this.data = results.data;
        });
    });
  }
};
</script>

<style></style>
