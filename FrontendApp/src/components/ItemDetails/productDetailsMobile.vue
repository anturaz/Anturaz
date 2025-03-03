<template>
  <div>
    <q-item class="q-pa-none q-pr-none">
      <q-item-section avatar>
        <q-avatar size="100px" square>
          <img
            :ratio="1"
            :src="product.photos[0]"
            size="80px"
            style="width: 100px"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-title" lines="1">{{
          product.product_name
        }}</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">Category:</span>
          {{ product.category }}
        </q-item-label>
        <q-item-label caption lines="2">
          <span
            class="text-weight-bold"
            v-if="order.mode_of_delivery != undefined"
            >Mode of Delivery:</span
          >
          {{ order.mode_of_delivery }}
        </q-item-label>
        <q-item-label caption lines="2">
          <q-btn
            label="Details"
            color="primary"
            size="sm"
            @click="showDetails = true"
          />
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <span
          class="text-primary text-title text-bold"
          v-if="order.order_number != undefined"
          >ORDER# {{ order.order_number }}&nbsp;</span
        >

        <!-- <div>
          <span class="text-primary text-title text-bold"
            >{{ $prettyMoney(payment.total) }}&nbsp;</span
          >
        </div> -->
        <!-- this.payment.breakdow -->
        <div v-if="this.payment['breakdown']">
          <span class="text-primary text-title text-bold">
            Charges Breakdown
          </span>
          <div v-for="(breakdown, index) in payment.breakdown" :key="index">
            <q-item-section v-if="breakdown.amount !== 0">
              <q-item-label caption lines="2">
                <span class="text-weight-bold">
                  {{
                    breakdown.description == "Giftwrapping Charge"
                      ? "Giftwrapping"
                      : breakdown.description
                  }}
                </span>
                : {{ $prettyMoney(breakdown.amount) }}
              </q-item-label>
            </q-item-section>
          </div>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold"> Total </span>
              : {{ $prettyMoney(totalBreakdownAmount) }}
            </q-item-label>
          </q-item-section>

          <!-- <span
            class="text-primary text-title text-bold"
            v-if="order.shipping_details != undefined"
            >Tracking Number#
            {{ order.shipping_details.tracking_number }}&nbsp;</span
          > -->
        </div>

        <div v-if="this.actionType && checkOutStep == 2">
          <span class="text-primary text-title text-bold">
            Charges Breakdown
            <q-item-section>
              <q-item-label caption lines="2">
                <span class="text-weight-bold"> Product </span>
                :
                {{
                  $prettyMoney(
                    product.sale_price != 0
                      ? product.sale_price
                      : product.regular_price
                  )
                }}
              </q-item-label>

              <q-item-label
                caption
                lines="2"
                v-if="order.giftwrapping_details.price !== 0"
              >
                <span class="text-weight-bold"> </span>
                :
                {{
                  $prettyMoney(
                    order.giftwrapping_details.price == 0
                      ? "0.00"
                      : order.giftwrapping_details.price
                  )
                }}
              </q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold"> Delivery Fee </span>
                :
                {{ $prettyMoney(transpo == null ? "0.00" : transpo) }}
              </q-item-label>

              <q-item-label caption lines="2">
                <span class="text-weight-bold"> Total </span>
                :
                {{
                  $prettyMoney(
                    (product.sale_price != 0
                      ? product.sale_price
                      : product.regular_price) +
                      parseFloat(transpo || 0) +
                      parseFloat(order.giftwrapping_details.price)
                  )
                }}
              </q-item-label>
            </q-item-section>
          </span>
        </div>

        <!-- {{
          payment.breakdown.map(data => {
            return data;
          })
        }} -->

        <!-- <span
          v-if="payment.total != undefined"
          class="text-primary text-title text-bold"
          >{{ $prettyMoney(payment.total) }}&nbsp;</span
        > -->
        <!-- <div v-if="order.shipping_details != undefined">
          Delivery Date :
          {{ $formatDate_DateOnly(order.shipping_details.eta) }}
        </div> -->
        <q-space />
        <div>
          <q-btn
            v-if="buttonVisible"
            :label="buttonLabel"
            size="sm"
            color="primary"
            unelevated
            @click="updateFunction"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-dialog v-model="showDetails" persistent>
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="description" label="description" class="text-black" />
          <q-tab name="delivery" label="delivery" class="text-black" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="description">
            <div flat bordered class="">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-bold q-pb-md">
                    <span class="text-black">{{ product.product_name }}</span>
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Category:</span>
                    <span class="text-black">
                      {{ product.category }}
                    </span>
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Estimated Delivery:</span>
                    <span class="text-black">
                      {{ $formatDate_DateOnly(order.date_needed) }}
                    </span>
                  </q-item-label>
                  <q-item-label
                    caption
                    class="text-grey"
                    v-if="order.mode_of_delivery"
                  >
                    <span class="text-weight-bold">Mode of Delivery:</span>
                    <span class="text-black">
                      {{ order.mode_of_delivery }}
                    </span>
                  </q-item-label>
                  <q-item-label caption class="text-grey" v-if="order.size">
                    <span class="text-weight-bold">Size:</span>
                    <span class="text-black">
                      {{ order.size }}
                    </span>
                  </q-item-label>
                  <q-item-label caption class="text-grey" v-if="order.color">
                    <span class="text-weight-bold">Color:</span>
                    <span class="text-black">
                      {{ order.color }}
                    </span>
                  </q-item-label>
                  <q-item-label caption class="text-grey" v-if="order.material">
                    <span class="text-weight-bold">Material:</span>
                    <span class="text-black">
                      {{ order.material }}
                    </span>
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Quantity:</span>
                    <span class="text-black">
                      {{ order.quantity }}
                    </span>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-bold q-pb-md">
                    Name of Customer
                  </q-item-label>

                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">First name:</span>
                    <span class="text-black">
                      {{ order.checkout_data.data.customer.first_name }}</span
                    >
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Last name:</span>
                    <span class="text-black">
                      {{ order.checkout_data.data.customer.last_name }}</span
                    >
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Email:</span>
                    <span class="text-black">
                      {{
                        order.checkout_data.data.customer.contact.email
                      }}</span
                    >
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Mobile#:</span>
                    <span class="text-black">
                      {{
                        order.checkout_data.data.customer.contact.mobile
                      }}</span
                    >
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-tab-panel>

          <q-tab-panel name="delivery">
            <div class="text-h6 text-primary q-mb-md"></div>

            <div flat bordered class="">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-bold q-pb-md">
                    {{
                      order.mode_of_delivery === "Pickup"
                        ? "Pickup"
                        : "Shipping"
                    }}
                    Address
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Date of Delivery :</span>
                    <span
                      v-if="order.shipping_details != undefined"
                      class="text-black"
                    >
                      {{ $formatDate_DateOnly(order.shipping_details.eta) }}
                    </span>
                    <span v-else class="text-black">
                      Pending..
                    </span>
                  </q-item-label>

                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Courier :</span>
                    <span
                      v-if="order.shipping_details != undefined"
                      class="text-black"
                    >
                      {{ order.shipping_details.courier }}
                    </span>
                    <span v-else class="text-black">
                      Pending..
                    </span>
                  </q-item-label>

                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold"> Tracking Number: </span>
                    <span
                      v-if="order.shipping_details != undefined"
                      class="text-black"
                    >
                      {{ order.shipping_details.tracking_number }}
                    </span>
                    <span v-else class="text-black">
                      Pending..
                    </span>
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Address Line 1:</span>
                    <span class="text-black">
                      {{
                        order.checkout_data.data.customer.shipping_address.line1
                      }}</span
                    >
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Address Line 2:</span>
                    <span class="text-black">
                      {{
                        order.checkout_data.data.customer.shipping_address.line2
                      }}</span
                    >
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">City/Municipality:</span>
                    <span class="text-black">
                      {{
                        order.checkout_data.data.customer.shipping_address
                          .city_municipality
                      }}</span
                    >
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">ZIP Code:</span>
                    <span class="text-black">
                      {{
                        order.checkout_data.data.customer.shipping_address.zip
                      }}</span
                    >
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">State/Province/Region:</span>
                    <span class="text-black">
                      {{
                        order.checkout_data.data.customer.shipping_address
                          .state_province_region
                      }}</span
                    >
                  </q-item-label>
                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Country Code:</span>
                    <span class="text-black">
                      {{
                        order.checkout_data.data.customer.shipping_address
                          .country_code
                      }}</span
                    >
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-bold q-pb-md">
                    Contact Person
                  </q-item-label>

                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Full name:</span>
                    <span class="text-black">
                      {{ order.primary_person_name }}</span
                    >
                  </q-item-label>

                  <q-item-label caption class="text-grey">
                    <span class="text-weight-bold">Mobile#:</span>
                    <span class="text-black">
                      {{ order.primary_contact_number }}</span
                    >
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> </q-item-section>
              </q-item>
            </div>
          </q-tab-panel>
        </q-tab-panels>

        <!-- Footer with Close Button -->
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Close" @click="showDetails = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
    updateFunction: Function,
    buttonLabel: String,
    buttonVisible: Boolean,

    product: Array,
    transpo: [String, Number],
    actionType: String,
    checkOutStep: [String, Number]
  },
  data() {
    return {
      //order
      product: {},
      shopper: {},
      payment: {},
      showDetails: false,
      tab: "description"
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
      .service("products")
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
        this.payment = payment.data[0];
      });
  }
};
</script>

<style></style>
