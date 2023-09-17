<template>
  <div>
    <p class="text-subtitle1">Payment Terms</p>
    <div class="q-pb-md">
      <q-checkbox
        v-model="payment_terms.cash_on_delivery"
        label="Cash on Delivery"
        ref="paymen_terms_cash"
      />
      <br />
      <q-checkbox
        v-model="payment_terms.cash_on_fulfillment"
        label="Cash on Fulfillment"
      />

      <br />
      <q-checkbox v-model="payment_terms.layaway" label="Layaway" />
    </div>
    <q-separator />
    <br />
    <p class="text-subtitle1">Price</p>
    <div class="row">
      <q-input
        class="col-5"
        type="number"
        square
        outlined
        v-model="price.min"
        label="Min"
        dense
      />
      <q-input
        class="col-5"
        type="number"
        square
        outlined
        v-model="price.max"
        label="Max"
        dense
      />
      <q-btn
        color="primary"
        style="border-radius: 0px"
        @click="$parent.getData ? $parent.getData() : $parent.queryItems()"
        class="col-2"
        label=">"
        unelevated
      />
    </div>
    <br />
    <q-separator />
    <br />
    <p class="text-subtitle1">Rating</p>
    <!-- <q-checkbox v-model="rating.five" /> -->
    <q-rating v-model="rating" size="2em" :max="5" :min="0" color="primary" />
    <!-- <br />
    <q-checkbox v-model="rating.four" />
    <q-rating readonly :value="4" size="2em" :max="5" color="primary" />
    <br />
    <q-checkbox v-model="rating.three" />
    <q-rating readonly :value="3" size="2em" :max="5" color="primary" />
    <br />
    <q-checkbox v-model="rating.two" />
    <q-rating readonly :value="2" size="2em" :max="5" color="primary" />
    <br />
    <q-checkbox v-model="rating.one" />
    <q-rating readonly :value="1" size="2em" :max="5" color="primary" /> -->
  </div>
</template>
<script>
export default {
  props: ["payment_terms", "price", "rating", "queryItems"],

  data() {
    return {};
  },

  mounted() {
    // this.$parent.getData ? this.$parent.getData() : $parent.queryItems();
  }
};
</script>
