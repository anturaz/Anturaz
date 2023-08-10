<template>
  <div class="q-pa-lg row">
    <div class="col-12">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Seach" icon="search" />
      </q-breadcrumbs>
      <q-separator />
    </div>
    <div class="col-md-2 q-pt-md">
      <SearchQuery
        :payment_terms="payment_terms"
        :price="price"
        :rating="rating"
        :queryItems="queryItems"
      />
    </div>
    <div class="col-md-10 q-pt-md q-pl-md">
      <div class="row">
        <q-card
          flat
          bordered
          class="q-ma-sm"
          v-for="item in data"
          :key="item._id"
        >
          <q-card-section style="height: 180px; width: 200px">
            <q-img :ratio="1" :src="item.photos[0]" />
          </q-card-section>
          <q-card-section style="height: 75px; width: 200px">
            <div class="text-title text-bold" v-if="'product_name' in item">
              {{ item.product_name }}
            </div>
            <div class="text-title text-bold" v-if="'service_name' in item">
              {{ item.service_name }}
            </div>
            <div>
              <font class="text-bold text-primary">{{
                item.sale_price != ""
                  ? $prettyMoney(item.sale_price)
                  : $prettyMoney(item.regular_price)
              }}</font>
              <font class="text-grey q-pl-sm" v-if="item.sale_price != ''">
                <strike>{{ $prettyMoney(item.regular_price) }}</strike>
              </font>
            </div>
            <div class="row">
              <div>Store: &nbsp;</div>
              <div class="text-primary" style="cursor: pointer">
                Gilbert Shop
              </div>
            </div>
          </q-card-section>
          <q-card-section style="height: 55px; width: 200px" align="right">
            <!-- <q-btn
              v-if="'product_name' in item"
              color="primary"
              label="View >"
              @click="$router.replace({ path: `/ProductDetails/${item._id}` })"
              unelevated
            />
            <q-btn
              v-if="'service_name' in item"
              color="primary"
              label="View >"
              @click="$router.replace({ path: `/ServiceDetails/${item._id}` })"
              unelevated
            /> -->
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import SearchQuery from "../../../components/searchQuery.vue";

export default {
  components: {
    SearchQuery,
  },
  data() {
    return {
      payment_terms: {
        cash_on_delivery: true,
        cash_on_fulfillment: true,
        layaway: true,
      },
      price: {
        min: 1,
        max: 99999,
      },
      rating: {
        five: false,
        four: false,
        three: true,
        two: false,
        one: false,
      },
      data: [],
    };
  },
  methods: {
    queryItems: async function () {
      this.$q.loading.show();
      this.data = [];
      var query = {};
      if (this.$route.query.location) {
        if (
          this.$route.query.query.trim() != "" &&
          this.$route.query.query != undefined
        ) {
          query["$search"] = this.$route.query.query;
        }
      }
      await this.$dbCon
        .service("services")
        .find({
          query: query,
        })
        .then((results) => {
          this.data.push(...results.data);
        });
      await this.$dbCon
        .service("products")
        .find({
          query: query,
        })
        .then((results) => {
          this.data.push(...results.data);
        });
      this.$q.loading.hide();
    },
  },
  mounted() {
    this.queryItems();
  },
  watch: {
    "payment_terms.cash_on_delivery": function () {
      this.queryItems();
    },
    "payment_terms.cash_on_fulfillment": function () {
      this.queryItems();
    },
    "payment_terms.layaway": function () {
      this.queryItems();
    },
    "$route.query": function () {
      this.queryItems();
    },
  },
};
</script>
