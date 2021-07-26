<template>
  <div>
    <q-item>
      <q-item-section avatar>
        <q-avatar size="100px" square>
          <img :ratio="1" :src="product.photos[0]" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-title" lines="1">{{ product.service_name}}</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">Category:</span>
          {{product.category}}
        </q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">Date Needed:</span>
          {{$formatDate_DateOnly(order.date_needed)}}
        </q-item-label>
        <q-item-label caption lines="2" v-if="order.mode_of_delivery!=undefined">
          <span class="text-weight-bold" >Mode of Delivery:</span>
          {{order.mode_of_delivery}}
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <span class="text-primary text-title text-bold" v-if="order.order_number != undefined">RESERVATION# {{order.order_number}}&nbsp;</span>
        <div>
          <span class="text-primary text-title text-bold">{{$prettyMoney(payment.total)}}&nbsp;</span>
        </div>
        <div>Qty {{order.quantity}}</div>
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
    buttonVisible: Boolean
  },
  data() {
    return {
      //order
      product: {},
      shopper: {},
      payment: {}
    };
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
        console.log(payment);
        this.payment = payment.data[0];
      });
  }
};
</script>

<style>
</style>