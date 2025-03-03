<template>
  <div>
    <q-item>
      <q-item-section avatar>
        <q-avatar size="100px" square>
          <img :ratio="1" :src="product.photos[0]" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-title" lines="1">{{
          product.service_name
        }}</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">Category:</span>
          {{ product.category }}
        </q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">Date Needed:</span>
          {{ $formatDate_DateOnly(order.date_needed) }}
        </q-item-label>
        <q-item-label
          caption
          lines="2"
          v-if="order.mode_of_delivery != undefined"
        >
          <span class="text-weight-bold">Mode of Service:</span>
          {{ order.mode_of_service }}
        </q-item-label>

        <q-item-label caption lines="2">
          <span class="text-weight-bold">Quantity: </span>
          {{ order.quantity }}
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <span
          class="text-primary text-title text-bold"
          v-if="order.order_number != undefined"
          >RESERVATION# {{ order.order_number }}&nbsp;</span
        >
        <div v-if="this.payment['breakdown']">
          <span class="text-primary text-title text-bold">
            Charges Breakdown
          </span>
          <div v-for="(breakdown, index) in payment.breakdown" :key="index">
            <q-item-section v-if="breakdown.amount !== 0">
              <q-item-label caption lines="2">
                <span class="text-weight-bold">
                  {{ breakdown.description }}
                </span>
                : {{ $prettyMoney(breakdown.amount) }}
              </q-item-label>
            </q-item-section>
          </div>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">
                Total
              </span>
              : {{ $prettyMoney(totalBreakdownAmount) }}
            </q-item-label>
          </q-item-section>

          <span
            class="text-primary text-title text-bold"
            v-if="order.shipping_details != undefined"
            >Tracking Number#
            {{ order.shipping_details.tracking_number }}&nbsp;</span
          >
        </div>

        <div v-if="this.actionType && checkOutStep == 2">
          <span class="text-primary text-title text-bold">
            Charges Breakdown
            <q-item-section>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">
                  Service
                </span>
                :
                {{
                  $prettyMoney(
                    service.sale_price != 0
                      ? service.sale_price
                      : service.regular_price
                  )
                }}
              </q-item-label>

              <q-item-label caption lines="2">
                <span class="text-weight-bold">
                  Transpo
                </span>
                :
                {{ $prettyMoney(transpo == null ? "0.00" : transpo) }}
              </q-item-label>

              <q-item-label caption lines="2">
                <span class="text-weight-bold">
                  Total
                </span>
                :
                {{
                  $prettyMoney(
                    (service.sale_price != 0
                      ? service.sale_price
                      : service.regular_price) + parseFloat(transpo || 0)
                  )
                }}
              </q-item-label>
            </q-item-section>
          </span>
        </div>
        <q-space />
        <div>
          <q-btn
            v-if="buttonVisible"
            :label="buttonLabel"
            color="primary"
            unelevated
            @click="updateFunction"
          />
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
    updateFunction: Function,
    buttonLabel: String,
    buttonVisible: Boolean,
    service: Array,
    transpo: [String, Number],
    actionType: String,
    checkOutStep: [String, Number]
  },
  data() {
    return {
      //order
      product: {},
      shopper: {},
      payment: {}
    };
  },
  computed: {
    totalBreakdownAmount() {
      return this.payment.breakdown.reduce((total, breakdown) => {
        return total + +breakdown.amount;
      }, 0);
    }
  },
  mounted() {
    this.$dbCon
      .service("services")
      .get(this.order.item_id)
      .then(product => {
        this.product = product;
      });
    this.$dbCon
      .service("users")
      .get(this.order.shopper_id)
      .then(shopper => {
        this.shopper = shopper;
      });
    this.$dbCon
      .service("shopper-payments")
      .find({
        query: {
          related_id: this.order._id
        }
      })
      .then(payment => {
        // console.log(payment);
        this.payment = payment.data[0];
      });
  }
};
</script>

<style></style>
