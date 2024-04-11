<template>
  <div>
    <ProductDetails
      :order="order"
      buttonLabel="SHIP OUT"
      :buttonVisible="true"
      :updateFunction="
        () => {
          opened = true;
        }
      "
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
          />
          <q-input outlined class="q-pa-sm" v-model="courier" label="Courier" />
          <q-input
            outlined
            class="q-pa-sm"
            v-model="eta"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="eta" :options="optionsFn">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- <q-input
            outlined
            class="q-pa-sm"
            v-model="eta"
            label="Estimated Time of Arrival"
            type="textarea"
          /> -->
          <!-- <div class="row">
            <div class="col">
              <div class="q-pl-sm">
                <q-date landscape v-model="eta" :options="optionsFn" />
              </div>
            </div>
          </div> -->
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="opened = false" />
          <q-btn flat label="Submit" color="primary" @click="update" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ProductDetails from "components/ItemDetails/productDetails.vue";
export default {
  props: ["order"],
  components: {
    ProductDetails
  },
  data() {
    return {
      opened: false,
      tracking_number: "",
      courier: "",
      eta: "",
      eta: null
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
    update: function() {
      this.$q
        .dialog({
          title: "Mark as Ship out",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.order.status = "For Receiving";
          this.order.shipping_details = {
            tracking_number: this.tracking_number,
            courier: this.courier,
            eta: this.eta
          };
          this.order.logs.push({
            event: "Ship-out",
            date: new Date()
          });
          this.$dbCon
            .service("product-transactions")
            .patch(this.order._id, this.order)
            .then(() => {
              this.opened = false;
            });
          //EMAIL
        });
    }
  },
  mounted() {}
};
</script>

<style></style>
