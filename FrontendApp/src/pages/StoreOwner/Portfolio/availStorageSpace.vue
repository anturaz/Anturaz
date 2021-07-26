<template>
  <div>
    <q-btn label="Add Storage" class="q-mr-sm" :class="$q.screen.lt.md?'full-width':''" unelevated color="primary" @click="opened=true" />
    <q-dialog v-model="opened">
      <q-card style="width:600px">
        <q-card-section class="text-h6 text-white bg-primary">
          <div>Add portfolio storage</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row">
          <q-markup-table flat style="width:100%">
            <tbody class="text-h4">
              <tr>
                <th class="text-left text-bold">
                  <b>Size</b>
                </th>
                <th class="text-left text-bold">
                  <b>Price/MB</b>
                </th>
                <th class="text-right text-bold">
                  <b>Cost</b>
                </th>
              </tr>
              <tr>
                <th class="text-left">
                  <q-input
                    autofocus
                    type="number"
                    style="width:100px"
                    v-model="mb"
                    min="10"
                    dense
                    @change="mb=Math.floor(mb), mb<10?mb=10:''"
                  />
                </th>
                <th class="text-left">
                  <div>{{$prettyMoney(rate)}}</div>
                </th>
                <th class="text-right">{{$prettyMoney(rate*mb)}}</th>
              </tr>
            </tbody>
          </q-markup-table>
          <div
            class="q-pt-lg q-pa-md text-grey"
            align="left"
          >Minimum purchase is 10MB. Valid for one year from the date of purchase.</div>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right">
          <q-btn
            label="Cancel"
            @click="opened=false"
            color="grey"
            no-caps
            ref="btn_back"
            @mouseover="$refs.btn_back.unelevated=true, $refs.btn_back.flat=false"
            @mouseleave="$refs.btn_back.flat=true,$refs.btn_back.unelevated=false"
            flat
          />
          <q-btn
            class="q-mr-sm"
            label="Pay now"
            @click="$refs.altpaynet.openAltPayNet()"
            color="primary"
            no-caps
            ref="btn_save_next"
            @mouseover="$refs.btn_save_next.unelevated=true, $refs.btn_save_next.outline=false"
            @mouseleave="$refs.btn_save_next.outline=true,$refs.btn_save_next.unelevated=false"
            outline
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <AltPayNet
      v-show="false"
      :onlinePaymentResult="onlinePaymentResult"
      :item="{ price:rate*mb, description: 'Storage Subscription: 1MB/PHP1.00/Year'}"
      ref="altpaynet"
    />
  </div>
</template>

<script>
import AltPayNet from "components/altpaynet_storeOwner.vue";
export default {
  components: {
    AltPayNet,
  },
  data() {
    return {
      opened: false,
      rate: 5,
      mb: 10,
    };
  },

  methods: {
    onlinePaymentResult: async function (result, info) {
      this.$dbCon
        .service("gallery-subscription")
        .create({
          store_id: this.$local.getItem("store_token"),
          mb: this.mb,
          total_amount: this.price,
          date_started: new Date(),
          date_paid: new Date(),
          date_end: this.$addToDate(new Date(), 0, 12),
          status: "Paid",
          deposit_details: result,
        })
        .then(() => {
          this.opened = false;
          this.$q.dialog({
            title: "Success!",
            message: "You have successfully availed extra storage space.",
          });
        });
    },
  },
};
</script>

<style>
</style>