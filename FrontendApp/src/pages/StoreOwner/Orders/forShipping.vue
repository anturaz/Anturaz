<template>
  <div>
    <ProductDetails
      v-if="!$q.screen.lt.md"
      :order="order"
      buttonLabel="SHIP OUT"
      :buttonVisible="true"
      :updateFunction="
        () => {
          opened = true;
        }
      "
    />
    <productDetailsMobile
      v-else
      buttonLabel="SHIP OUT"
      :buttonVisible="true"
      :updateFunction="
        () => {
          opened = true;
        }
      "
      :order="order"
    />
    <q-dialog v-model="opened">
      <q-card style="width:500px">
        <q-card-section class="text-h6 text-white bg-primary">
          <div>Shipping Information</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh" class="scroll">
          <q-input
            outlined
            class="q-pa-sm"
            v-model="tracking_number"
            label="Tracking Number"
            :error="!tracking_number && submitAttempted"
            error-message="Tracking Number is required"
          />

          <q-input
            outlined
            class="q-pa-sm"
            v-model="courier"
            label="Courier"
            :error="!courier && submitAttempted"
            error-message="Courier is required"
          />

          <q-input
            outlined
            class="q-pa-sm"
            v-model="eta"
            mask="date"
            label="Estimated Delivery"
            :error="!eta && submitAttempted"
            error-message="Estimated Delivery is required"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="eta"
                    :options="optionsFn"
                    label="Estimated Delivery"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="opened = false" />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="validateAndSubmit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ProductDetails from "components/ItemDetails/productDetails.vue";
import productDetailsMobile from "../../../components/ItemDetails/productDetailsMobile.vue";

import {
  emailSender,
  producTShipOutEmail
} from "../../../api/services/authenticationService";
export default {
  props: ["order"],
  components: {
    ProductDetails,
    productDetailsMobile
  },
  data() {
    return {
      opened: false,
      tracking_number: "",
      courier: "",
      eta: "",
      eta: null,
      submitAttempted: false
    };
  },
  methods: {
    optionsFn(date) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns 0-indexed month
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}/${month}/${day}`;
      // this.eta = formattedDate;
      return date >= formattedDate;
      // console.log(date);
    },

    validateAndSubmit() {
      this.submitAttempted = true; // Mark that submit was attempted

      if (!this.tracking_number || !this.courier || !this.eta) {
        this.$q.notify({
          type: "negative",
          message: "Please fill out all required fields before submitting."
        });
        return;
      }

      this.update();
    },

    async update() {
      this.$q
        .dialog({
          title: "Mark as Ship out",
          message: "Are you sure you want to proceed?",
          cancel: { push: true, color: "grey", flat: true }
        })
        .onOk(async () => {
          this.order.status = "For Receiving";
          this.order.shipping_details = {
            tracking_number: this.tracking_number,
            courier: this.courier,
            eta: this.eta
          };
          this.order.logs.push({ event: "Ship-out", date: new Date() });

          try {
            const data = await this.$dbCon
              .service("product-transactions")
              .patch(this.order._id, this.order);

            const deliveryData = {
              track_num: this.tracking_number,
              courier: this.courier,
              date: this.eta
            };

            this.$q.notify({
              type: "positive",
              message: "Order successfully marked as shipped!"
            });
            const emailMessage = producTShipOutEmail(data, deliveryData);
            console.log(emailMessage);
            const subject = "Anturaz - Your item has been shipped out";
            const userData = {
              email: data.checkout_data.data.customer.contact.email
            };
            await emailSender(userData, emailMessage, subject);
            this.opened = false; // Close modal
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: "Error updating order. Please try again."
            });
          }
        });
    }
  },
  mounted() {}
};
</script>

<style></style>
