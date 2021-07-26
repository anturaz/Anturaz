<template>
  <div class="q-pa-sm row">
    <div class="col-12 row q-pa-sm justify-end">
      <div class="self-center text-grey-7" :class="$q.screen.lt.md?'col-4':'col-2'">
        Store Rating
        <q-badge color="primary">3.0</q-badge>
      </div>
      <div :class="$q.screen.lt.md?'col-8':'col-3'">
        <q-input filled v-model="search" label="Search" dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="q-pt-md col-12 row justify-center">
        <div v-for="n in 10" :key="n"  class="q-ma-sm" :style="
              $q.screen.lt.md
                ? 'width: 45%;'
                : 'width: 250px ; height: 280px'
            " >
          <q-card
            square
            bordered
            flat
          >
            <div class="q-pa-xs row justify-between">
              <span>Comments 12</span>
              <div class="text-primary"><q-icon name="message" />1</div>
            </div>
            <q-separator />
            <q-img
              src="https://i.pinimg.com/originals/fe/50/e8/fe50e88d2422830a9573f796cc544105.jpg"
              :ratio="16 / 9"
            />
            <div class="q-pa-xs">
              <div class="text-right">SKU:123455</div>
              <div>HD Make up</div>
              <div>
                {{ $prettyMoney(25000) }}
                <small class="text-primary q-pl-sm">
                  <strike>{{ $prettyMoney(12000) }}</strike>
                </small>
              </div>
            </div>
            <q-separator />
            <div class="row justify-between q-pa-xs">
              <q-rating value="3" size="1em" :max="5" color="primary" />3.0
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      itemDetails: {},
      selectedItem: {},
      data: [],
      contacts: [],
      averageRating: 0,
    };
  },
  mounted() {
    this.$dbCon
      .service("products")
      .find({
        query: {
          store_id: this.$local.getItem("store_token"),
        },
      })
      .then((products) => {
        products.data.map((product) => {
          this.selectedItem = this.items[0];
          this.items.push({
            label: product.product_name,
            value: product._id,
            type: "products",
            sku: product.SKU,
          });
        });
      });
    this.$dbCon
      .service("services")
      .find({
        query: {
          store_id: this.$local.getItem("store_token"),
        },
      })
      .then((services) => {
        services.data.map((service) => {
          this.selectedItem = this.items[0];
          this.items.push({
            label: service.service_name,
            value: service._id,
            type: "services",
            sku: service.SKU,
          });
        });
      });
  },
  watch: {
    selectedItem: async function () {
      //GET ITEM DETAILS
      this.$dbCon
        .service(this.selectedItem.type)
        .find({
          query: {
            _id: this.selectedItem.value,
          },
        })
        .then((results) => {
          this.itemDetails = results.data[0];
        });

      //EMPTY FIRST THE DATA VARIABLE
      this.data = [];
      await this.$dbCon
        .service(
          this.selectedItem.type == "products"
            ? "product-transactions"
            : "service-transactions"
        )
        .find({
          query: {
            item_id: this.selectedItem.value,
          },
        })
        .then(async (results) => {
          var transactionCtr = 0;
          this.averageRating = 0;
          if (results.total != 0) {
            this.data = results.data;

            this.data.map(async (transaction, index) => {
              transactionCtr++;
              this.averageRating += transaction.rate;
            });
            this.averageRating = this.averageRating / transactionCtr;
          }
          this.$forceUpdate();
        });
    },
  },
};
</script>

<style>
</style>