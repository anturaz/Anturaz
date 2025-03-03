<template>
  <div>
    <ProductDetails
      v-if="!$q.screen.lt.md"
      :order="order"
      buttonLabel="Rate now"
      :buttonVisible="true"
      :updateFunction="updateFunc"
    />
    <productDetailsMobile
      v-else
      :order="order"
      buttonLabel="Rate"
      :buttonVisible="true"
      :updateFunction="updateFunc"
    />
    <q-dialog v-model="opened">
      <q-card style="width:600px">
        <q-card-section class="text-h6 text-white bg-primary">
          <div>RATE YOUR ORDER</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh" class="scroll">
          <div class="q-pt-sm q-pl-xl q-pr-xl">
            <ProductDetails :order="order" :buttonVisible="false" />
            <div align="center" class="q-pt-md">
              <q-rating
                v-model="rate"
                size="3.5em"
                color="primary"
                icon-selected="star"
              />
              ({{ rate }})
            </div>
            <q-input
              outlined
              v-model="remarks"
              type="textarea"
              dense
              placeholder="Tell us more!"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="opened = false" />
          <q-btn flat label="Rate" color="primary" @click="update" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ProductDetails from "components/ItemDetails/productDetails.vue";
import productDetailsMobile from "../../../components/ItemDetails/productDetailsMobile.vue";

export default {
  props: ["order"],
  components: {
    ProductDetails,
    productDetailsMobile
  },
  data() {
    return {
      opened: false,
      rate: 3,
      remarks: ""
    };
  },
  methods: {
    updateFunc: function() {
      this.opened = true;
    },
    update: function() {
      this.$q
        .dialog({
          title: "Rate this order",
          message: "Are you sure you want to proceed?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(async () => {
          try {
            let product = await this.$dbCon
              .service("products")
              .get(this.order.item_id);

            // Initialize or update rating fields
            let numberOfRates = product.number_of_rate || 0;
            let totalScore = product.total_score || 0;

            // Update rating values
            numberOfRates += 1;
            totalScore += this.rate;

            // Compute new average rating
            let averageRating = totalScore / numberOfRates;

            // Update product with new rating values
            await this.$dbCon.service("products").patch(this.order.item_id, {
              number_of_rate: numberOfRates,
              total_score: totalScore,
              average_rating: averageRating
            });

            // Update the order status (if needed)
            this.order.status = "Done";
            this.order.rate = this.rate;
            this.order.remarks = this.remarks;
            this.order.logs.push({
              event: "Rated",
              date: new Date()
            });

            // Update order in the database
            await this.$dbCon
              .service("product-transactions")
              .patch(this.order._id, this.order);

            this.opened = false;
            this.$q.notify({ type: "positive", message: "Rating submitted!" });
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: "Error updating rating"
            });
            console.error("Rating update failed:", error);
          }

          // this.order.status = "Done";
          // this.order.rate = this.rate;
          // this.order.remarks = this.remarks;
          // this.order.logs.push({
          //   event: "Rated",
          //   date: new Date()
          // });
          // this.$dbCon
          //   .service("product-transactions")
          //   .patch(this.order._id, this.order)
          //   .then(() => {
          //     this.opened = false;
          //   });
          //EMAIL
        });
    }
  },
  mounted() {}
};
</script>

<style></style>
