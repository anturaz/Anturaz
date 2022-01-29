<template >
  <div class="row justify-center q-pa-md">
    <div class="col-12">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/"  />
        <q-breadcrumbs-el label="Reservation" icon="menu_book" />

        <q-breadcrumbs-el label="Checkout" />
      </q-breadcrumbs>
      <q-separator />
    </div>
    <q-stepper class="col-8 col-md-8" flat v-model="step" vertical color="primary" animated>
      <!-- STEP 1: SHIPPING ADDRESS -->
      <q-step :name="1" title="Set Meeting Details" :done="step > 1">
        <q-stepper-navigation>
          <div>
            <q-card flat bordered>
              <q-card-section>
                <div class="text-title text-bold">Meeting Place</div>
              </q-card-section>

              <q-separator inset />
              <q-card-section>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="house_bldg_st"
                    label="House/ Building No./ Street"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="barangay_district"
                    label="Barangay/ District"
                  />
                   <q-select
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    style="min-width:200px"
                    v-model="city_municipality"
                    :options="store.market_areas"
                    label="City/Municipality"
                  />
                </div>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="state_province"
                    label="State/Province"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="zip_code"
                    label="Zip Code"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="country"
                    readonly
                    label="Country"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-title text-bold">Primary Contact Person</div>
              </q-card-section>

              <q-separator inset />
              <q-card-section>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs"
                    v-model="primary_person_name"
                    label="Primary Person Name"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs"
                    v-model="primary_contact_number"
                    label="Contact Number"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-title text-bold">Secondary Contact Person</div>
              </q-card-section>

              <q-separator inset />
              <q-card-section>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs"
                    v-model="secondary_person_name"
                    label="Secondary Person Name"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs"
                    v-model="secondary_contact_number"
                    label="Contact Number"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>

          <br />
          <div align="right">
            <q-btn @click="step = 2" color="primary" label="Continue" />
          </div>
        </q-stepper-navigation>
      </q-step>
      <q-step :name="2" title="Review Order" icon="pageview" :done="step > 2">
        <ServiceDetails :order="cart" :buttonVisible="false" />
        <q-stepper-navigation align="right">
          <q-btn @click="step = 3" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="3" title="Payment" icon="account_balance_wallet" :done="step > 3">
        <!-- PAYMENT -->
        <q-tabs v-model="payment_option" dense align="left" no-caps inline-label>
          <q-tab
            :class="payment_option=='Bank Deposit'?'text-primary':'text-grey'"
            name="Bank Deposit"
            icon="account_balance"
            label="Bank Deposit"
          />
          <q-tab
            :class="payment_option=='Online Payment'?'text-primary':'text-grey'"
            name="Online Payment"
            icon="credit_card"
            label="Online Payment"
          />
        </q-tabs>
        <q-tab-panels v-model="payment_option" animated>
          <!-- BANK DEPOSIT -->
          <q-tab-panel name="Bank Deposit">
            <q-list bordered>
              <q-item clickable v-ripple @click="payment_type='Full Payment'">
                <q-item-section avatar>
                  <q-radio v-model="payment_type" val="Full Payment" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Full Payment</q-item-label>
                  <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item
                :clickable="enable_layaway_dp"
                :disable="!enable_layaway_dp"
                :v-ripple="enable_layaway_dp"
                @click="payment_type='20% Downpayment'"
              >
                <q-item-section avatar>
                  <q-radio
                    v-if="enable_layaway_dp"
                    v-model="payment_type"
                    val="20% Downpayment"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>20% Downpayment</q-item-label>
                  <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item
                :clickable="enable_layaway_dp"
                :disable="!enable_layaway_dp"
                :v-ripple="enable_layaway_dp"
                @click="payment_type='Layaway'"
              >
                <q-item-section avatar>
                  <q-radio
                    v-if="enable_layaway_dp"
                    v-model="payment_type"
                    val="Layaway"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Layaway</q-item-label>
                  <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <br />
            <div align="right">
              <q-btn color="primary" label="Proceed" @click="bankDeposit" />
              <q-btn flat @click="step   = 2" color="primary" label="Back" class="q-ml-sm" />
            </div>
          </q-tab-panel>
          <!-- ONLINE PAYMENT -->
          <q-tab-panel name="Online Payment">
            <q-list bordered>
              <q-item clickable v-ripple @click="payment_type='Full Payment'">
                <q-item-section avatar>
                  <q-radio v-model="payment_type" val="Full Payment" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Full Payment</q-item-label>
                  <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item
                :clickable="enable_layaway_dp"
                :disable="!enable_layaway_dp"
                :v-ripple="enable_layaway_dp"
                @click="payment_type='20% Downpayment'"
              >
                <q-item-section avatar>
                  <q-radio
                    v-if="enable_layaway_dp"
                    v-model="payment_type"
                    val="20% Downpayment"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>20% Downpayment</q-item-label>
                  <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item
                :clickable="enable_layaway_dp"
                :disable="!enable_layaway_dp"
                :v-ripple="enable_layaway_dp"
                @click="payment_type='Layaway'"
              >
                <q-item-section avatar>
                  <q-radio
                    v-if="enable_layaway_dp"
                    v-model="payment_type"
                    val="Layaway"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Layaway</q-item-label>
                  <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <br />

            <div class="row">
              <AltPayNet
                :onlinePaymentResult="onlinePaymentResult"
                :preparePayment="preparePayment"
              />
              <q-btn flat @click="step   = 2" color="primary" label="Back" class="q-ml-sm" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-step>

      <q-step :name="4" title="Transaction Receipt" icon="receipt">
        <q-stepper-navigation>
          <ServiceDetails :order="cart" :buttonVisible="false" />
           <div align="right" class="text-grey q-pr-sm">Payment Method: {{payment_option}}</div>
          <q-markup-table flat>
            <thead>
              <tr>
                <th class="text-left">Description</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="BD in payment.breakdown" :key="BD.description">
                <td class="text-left">{{BD.description}}</td>
                <td class="text-right">{{$prettyMoney(BD.amount)}}</td>
              </tr>
              <tr>
                <td class="text-left text-bold">TOTAL</td>
                <td class="text-right text-bold">{{$prettyMoney(payment.total)}}</td>
              </tr>
            </tbody>
          </q-markup-table>
          <div align="right" class="q-pt-sm">
          <q-btn color="primary" label="Finish" @click="$router.push('/Reservations')" />
          </div>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import AltPayNet from "components/altpaynet_shopper.vue";
import ServiceDetails from "components/ItemDetails/serviceDetails.vue";
export default {
  components: {
    AltPayNet,
    ServiceDetails
  },
  props: ["order"],
  data() {
    return {
      step: 1,
      mode_of_delivery: "Shipping",
      primary_person_name: "",
      primary_contact_number: "",
      secondary_person_name: "",
      secondary_contact_number: "",
      payment_option: "Bank Deposit",
      payment_type: "Full Payment",
      country: "Philippines",
      house_bldg_st: "",
      barangay_district: "",
      city_municipality: "",
      state_province: "",
      zip_code: "",
      user: {},
      service: {},
      payment: {},
      cart: {},
      store: {},
      delivery_fee: 0,
      enable_layaway_dp: true,
      payment_utilities: {}
    };
  },
  methods: {
    //PREPARING PAYMENT DATA
    preparePayment: function() {
      // GENERATING BREAKDOWN
      var breakdown = [];
      var total = 0;
      //Item Price
      breakdown.push({
        description: "Service",
        amount:
          (this.service.sale_price != ""
            ? this.service.sale_price
            : this.service.regular_price) * this.cart.quantity
      });
      // Convinience Fee
      breakdown.push({
        description: "Convinience Fee",
        amount: this.payment_utilities.web_service_fee
      });

      // Delivery fee
      breakdown.push({
        description: "Fuel/Transportation Fee",
        amount: this.delivery_fee
      });
      // Getting the total amount
      breakdown.map(result => {
        total += parseInt(result.amount);
      });
      if (this.payment_type == "Full Payment") {
        this.prepareFullPayment(breakdown, total);
      } else if (this.payment_type == "20% Downpayment") {
        this.prepareDownpayment(breakdown, total);
      } else if (this.payment_type == "Layaway") {
        this.prepareLayaway(breakdown, total);
      }
      return this.payment;
    },
    prepareFullPayment: function(breakdown, total) {
      this.payment = {
        shopper_id: this.$local.getItem("user_token"),
        related_id: "",
        breakdown: breakdown,
        total: total,
        payment_option: this.payment_option,
        payment_type: "Full Payment",
        payment_details: {},
        status: "Pending",
        type: "Service",
        payment_utilities: this.payment_utilities,
        regular_price: this.service.regular_price,
        sale_price: this.service.sale_price
      };
    },
    prepareDownpayment: function(breakdown, total) {
      this.payment = {
        shopper_id: this.$local.getItem("user_token"),
        related_id: "",
        breakdown: breakdown,
        total: total,
        payment_option: this.payment_option,
        payment_type: "20% Downpayment",
        registration_id: "",
        recurring_payments: [
          {
            schedule: "",
            amount: total * 0.2,
            payment_details: {},
            status: "Pending"
          },
          {
            schedule: this.$adjustDate(
              this.$subtractFromDate(this.cart.date_needed, 14, 0),
              0
            ),
            amount: total - total * 0.2,
            payment_details: {},
            status: "Pending"
          }
        ],
        status: "Pending",
        type: "Service",
        payment_utilities: this.payment_utilities,
        regular_price: this.service.regular_price,
        sale_price: this.service.sale_price
      };
    },
    prepareLayaway: function(breakdown, total) {
      var recurring_payments = [];
      var price = total;
      //date needed - date purchased
      var date_needed = this.cart.date_needed;
      var date_purchased = new Date();
      var difference = Math.ceil(
        this.$getDateDiff(date_needed, date_purchased, "days") / 30
      );
      //FIRST PAYMENT
      recurring_payments.push({
        schedule: "",
        amount: price / difference,
        payment_details: {},
        status: "Pending"
      });
      //FOLLOWING BEFORE THE LAST PAYMENT
      for (var x = 1; x < difference - 1; x++) {
        recurring_payments.push({
          schedule: this.$addToDate(date_purchased, 30 * x, 0),
          amount: price / difference,
          payment_details: {},
          status: "Pending"
        });
      }
      //LAST PAYMENT
      recurring_payments.push({
        schedule: this.$subtractFromDate(date_needed, 14, 0),
        amount: price / difference,
        payment_details: {},
        status: "Pending"
      });
      this.payment = {
        shopper_id: this.$local.getItem("user_token"),
        related_id: "",
        breakdown: breakdown,
        total: total,
        payment_option: this.payment_option,
        payment_type: "Layaway",
        registration_id: "",
        recurring_payments: recurring_payments,
        status: "Pending",
        type: "Service",
        payment_utilities: this.payment_utilities,
        regular_price: this.service.regular_price,
        sale_price: this.service.sale_price
      };
      console.log(this.payment);
    },
    // FUNCTIONS THAT WILL BE PASS TO THE ALTPAYNET COMPONENT
    onlinePaymentFullPayment: async function() {
      this.cart.logs = [
        {
          event: "Ordered",
          date: new Date()
        }
      ];
      this.cart.status = "For Acknowledgement";
      //GET THE CURRENT ORDER NUMBER AND ASSIGN A NUMBER FOR THIS ORDER
      await this.$dbCon
        .service("service-transactions")
        .find({})
        .then(results => {
          this.cart.order_number = results.total + 1;
        });
      this.cart.mode_of_delivery = this.mode_of_delivery;
      this.cart.primary_person_name = this.primary_person_name;
      this.cart.primary_contact_number = this.primary_contact_number;
      this.cart.secondary_person_name = this.secondary_contact_number;
      this.cart.secondary_contact_number = this.secondary_contact_number;
      // Save to DB the Product Transaction
      var product_transaction = await this.$dbCon
        .service("service-transactions")
        .create(this.cart);
      // Prepare Payment Data
      this.payment.related_id = product_transaction._id;
      var payment = await this.$dbCon
        .service("shopper-payments")
        .create(this.payment);
      this.$dbCon.service("cart").remove(this.cart._id);
    },
    onlinePaymentDownpayment: async function() {
      this.cart.logs = [
        {
          event: "Ordered",
          date: new Date()
        }
      ];
      this.cart.status = "Pending Payment";
      //GET THE CURRENT ORDER NUMBER AND ASSIGN A NUMBER FOR THIS ORDER
      await this.$dbCon
        .service("service-transactions")
        .find({})
        .then(results => {
          this.cart.order_number = results.total + 1;
        });
      this.cart.mode_of_delivery = this.mode_of_delivery;
      this.cart.primary_person_name = this.primary_person_name;
      this.cart.primary_contact_number = this.primary_contact_number;
      this.cart.secondary_person_name = this.secondary_contact_number;
      this.cart.secondary_contact_number = this.secondary_contact_number;
      // Save to DB the Product Transaction
      var product_transaction = await this.$dbCon
        .service("service-transactions")
        .create(this.cart);
      // Prepare Payment Data
      this.payment.related_id = product_transaction._id;
      this.payment.recurring_payments[0].status = "Done";
      var payment = await this.$dbCon
        .service("shopper-payments")
        .create(this.payment);
      this.$dbCon.service("cart").remove(this.cart._id);
    },
    onlinePaymentLayaway: async function() {
      this.cart.logs = [
        {
          event: "Ordered",
          date: new Date()
        }
      ];
      this.cart.status = "Pending Payment";
      //GET THE CURRENT ORDER NUMBER AND ASSIGN A NUMBER FOR THIS ORDER
      await this.$dbCon
        .service("service-transactions")
        .find({})
        .then(results => {
          this.cart.order_number = results.total + 1;
        });
      this.cart.mode_of_delivery = this.mode_of_delivery;
      this.cart.primary_person_name = this.primary_person_name;
      this.cart.primary_contact_number = this.primary_contact_number;
      this.cart.secondary_person_name = this.secondary_contact_number;
      this.cart.secondary_contact_number = this.secondary_contact_number;
      // Save to DB the Product Transaction
      var product_transaction = await this.$dbCon
        .service("service-transactions")
        .create(this.cart);
      // Prepare Payment Data
      this.payment.related_id = product_transaction._id;
      this.payment.recurring_payments[0].status = "Done";
      var payment = await this.$dbCon
        .service("shopper-payments")
        .create(this.payment);
      this.$dbCon.service("cart").remove(this.cart._id);
    },
    //GETTING PAYMENT RESULT
    onlinePaymentResult: async function(result, info) {
      console.log("INFO", info);
      console.log("RESULT", result);

      if (result == "success") {
        this.step = 4;
        if (this.payment_type == "Full Payment") {
          this.payment.status = "Done";
          this.payment.payment_details = info;
          await this.onlinePaymentFullPayment();
        } else if (this.payment_type == "20% Downpayment") {
          this.payment.recurring_payments[0].schedule = new Date();
          this.payment.recurring_payments[0].payment_details = info;
          this.payment.registration_id = info.registrationId;
          this.payment.status = "Pending";
          await this.onlinePaymentDownpayment();
        } else if (this.payment_type == "Layaway") {
          this.payment.recurring_payments[0].schedule = new Date();
          this.payment.recurring_payments[0].payment_details = info;
          this.payment.registration_id = info.registrationId;
          this.payment.status = "Pending";
          await this.onlinePaymentLayaway();
        }
        this.$q.dialog({
          title: "Payment Accepted!",
          message: result
        });
      } else {
        this.$q.dialog({
          title: "Payment Rejected!",
          message: info.result.description
        });
      }
    },
    //INITIALIZING BANK DEPOSIT PAYMENT
    bankDeposit: async function() {
      //preparing payment
      console.log(this.preparePayment());
      this.payment.deposit_details = [];
      if (this.payment_type == "Full Payment") {
        this.payment.deadline = this.$addToDate(new Date(), 2, 0);
      } else if (this.payment_type == "20% Downpayment") {
        this.payment.recurring_payments[0].schedule = this.$addToDate(
          new Date(),
          2,
          0
        );
      } else if (this.payment_type == "Layaway") {
        this.payment.recurring_payments[0].schedule = this.$addToDate(
          new Date(),
          2,
          0
        );
      }

      this.cart.logs = [
        {
          event: "Ordered",
          date: new Date()
        }
      ];
      this.cart.status = "Pending Payment";
      //GET THE CURRENT ORDER NUMBER AND ASSIGN A NUMBER FOR THIS ORDER
      await this.$dbCon
        .service("service-transactions")
        .find({})
        .then(results => {
          this.cart.order_number = results.total + 1;
        });
      this.cart.mode_of_delivery = this.mode_of_delivery;
      this.cart.primary_person_name = this.primary_person_name;
      this.cart.primary_contact_number = this.primary_contact_number;
      this.cart.secondary_person_name = this.secondary_contact_number;
      this.cart.secondary_contact_number = this.secondary_contact_number;
      // Save to DB the Product Transaction
      var service_transaction = await this.$dbCon
        .service("service-transactions")
        .create(this.cart);
      // Prepare Payment Data
      this.payment.related_id = service_transaction._id;
      var payment = await this.$dbCon
        .service("shopper-payments")
        .create(this.payment);
      this.$dbCon.service("cart").remove(this.cart._id);
      await this.reserveSchedule();
      this.step = 4;
    },
    //RESERVING SCHEDULE
    reserveSchedule: async function() {
      var storeSchedules = {};
      await this.$dbCon
        .service("store-schedule")
        .find({ query: { store_id: this.store._id } })
        .then(results => {
          storeSchedules = results.data[0];
        });
      console.log("1", storeSchedules);
      storeSchedules.schedules.push({
        date: this.cart.date_needed,
        status: 0,
        remarks: "RESERVATION-" + this.cart.order_number
      });
      console.log("2", storeSchedules);
      console.log("STOREEE", storeSchedules);
      await this.$dbCon
        .service("store-schedule")
        .patch(storeSchedules._id, storeSchedules);
    }
  },
  async mounted() {
    this.$dbCon
      .service("payment-utilities")
      .find({})
      .then(results => {
        this.payment_utilities = results.data[0];
      });
    this.user = await this.$getUser();

    await this.$dbCon
      .service("cart")
      .get(this.$route.params.cart)
      .then(cart => {
        this.cart = cart;
        this.$dbCon
          .service("services")
          .get(cart.item_id)
          .then(service => {
            this.service = service;
          });
      })
      .catch(e => {
        this.$router.push("/Orders");
      });
    this.store = await this.$dbCon.service("store").get(this.cart.store_id);
     if (this.store.market_areas.includes(this.user.address.city_municipality)) {
      this.house_bldg_st = this.user.address.house_bldg_st;
      this.barangay_district = this.user.address.barangay_district;
      this.city_municipality = this.user.address.city_municipality;
      this.state_province = this.user.address.state_province;
      this.zip_code = this.user.address.zip_code;
    } else {
      this.city_municipality = this.store.market_areas[0];
    }
    //GET DELIVERY DETAILS
    this.enable_layaway_dp =
      this.$getDateDiff(
        this.cart.date_needed,
        this.$addToDate(new Date(), 5, 0),
        "months"
      ) >= 3;
  },
  watch: {
    city_municipality: async function(){
     this.delivery_fee= await this.$getDeliveryTranspoFee(
            this.store._id,
            this.city_municipality,
            "fuel_transpo"
          )
    }
  }
};
</script>

<style>
</style>