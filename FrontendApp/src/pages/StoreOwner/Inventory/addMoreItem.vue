<template>
  <div>
    <q-btn
      unelevated
      :class="$q.screen.lt.md ? 'full-width q-mb-md' : 'q-mr-sm q-ml-sm'"
      @click="opened = true"
      label="BUY SLOTS"
      outline
      color="black"
      size="md"
    />
    <q-dialog v-model="opened">
      <q-card style="width: 600px">
        <q-card-section class="text-h6 text-white bg-primary">
          <div>ADD MORE ITEMS</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row">
          <q-markup-table style="width: 100%" flat>
            <tbody class="text-h4">
              <tr>
                <th class="text-left">Qty</th>
                <th class="text-left">Price/Item</th>
                <th class="text-right">Cost</th>
              </tr>
              <tr>
                <th class="text-left">
                  <q-input
                    autofocus
                    style="width: 100px"
                    type="number"
                    v-model="items"
                    dense
                    @change="
                      (items = Math.floor(items)), items < 1 ? (items = 1) : ''
                    "
                  />
                </th>
                <th class="text-left">
                  <div>&#8369;{{ price }}</div>
                </th>
                <th class="text-right">
                  <b>&#8369;{{ price * items }}</b>
                </th>
              </tr>
            </tbody>
          </q-markup-table>
          <div class="q-pt-lg q-pa-md text-grey" align="left">
            Valid for one year from the date of purchase.
          </div>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="opened = false" color="grey" />
          <q-btn
            class="q-mr-sm"
            label="Pay now"
            @click="$refs.altpaynet.openAltPayNet()"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <AltPayNet
      v-show="false"
      ref="altpaynet"
      :onlinePaymentResult="onlinePaymentResult"
      :item="{
        price: price * items,
        description: months + ' Month/s of Subscription (' + price + '/month)'
      }"
    />
  </div>
</template>

<script>
import AltPayNet from "components/altpaynet_storeOwner.vue";
export default {
  components: {
    AltPayNet
  },
  data() {
    return {
      opened: false,
      step: 1,
      items: 10,
      price: 99.75,
      subscriptions: []
    };
  },
  methods: {
    onlinePaymentResult: async function(result, info) {
      var relatedId = null; //For Store Payments
      this.$dbCon
        .service("item-subscriptions")
        .create({
          store_id: this.$local.getItem("store_token"),
          months: this.months,
          items: this.items,
          total_amount: this.price,
          date_ordered: new Date(),
          date_started: new Date(),
          date_paid: new Date(),
          date_end: this.$addToDate(new Date(), 0, 12),
          status: "Paid",
          deposit_details: info
        })
        .then(async result => {
          await this.$dbCon
            .service("store-payments")
            .create({
              related_id: result._id,
              store_id: this.$local.getItem("store_token"),
              amount: this.items * this.price,
              date_paid: new Date(),
              payment_for: "Item Subscription",
              payment_type: "Online Payment",
              payment_details: info
            })
            .then(() => {
              // window.location.reload();
              this.$router.go(0);
            });
          this.opened = false;
        });
    }
  }
};
</script>

<style></style>
