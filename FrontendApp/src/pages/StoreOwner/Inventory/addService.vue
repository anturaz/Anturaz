<template>
  <div class="row">
    <div v-show="step == 2" class="col-md-12 col-sm-12 row">
      <q-input
        class="col-md-12 col-xs-12 q-pt-sm"
        v-model="SKU"
        dense
        stack
        label="Stock Keeping Unit(SKU)"
        :rules="[val => val.trim() != '' || 'Required']"
        ref="inp_sku"
      />
      <q-input
        class="col-12 q-pt-sm"
        dense
        stack
        label="Service Name"
        ref="inp_service_name"
        v-model="service_name"
        :maxlength="60"
        :rules="[val => val.trim() != '' || 'Required']"
        lazy-rules
        counter
      />
      <p class="text-title text-black">
        Description
        <span class="text-italic">
          ( Please indicate full description of the item )
        </span>
      </p>
      <div class="col-12 q-pt-sm">
        <q-editor
          v-model="description"
          min-height="4rem"
          ref="inp_description"
          @input="() => validateDescription()"
          :style="description_error ? 'border:solid red 1px' : ''"
        />
        <div v-if="!description_error" align="right">
          <small class="text-grey"
            >{{ description_counter }} / 1000 words</small
          >
        </div>
        <small class="text-red" v-if="description_error">{{
          description_error_message
        }}</small>
      </div>
      <q-input
        class="col-6 q-pt-sm q-pr-sm"
        dense
        stack
        label="Regular Price"
        v-model="regular_price"
        ref="inp_regular_price"
        @focus="toInputRegularPrice"
        @blur="toChangeRegularPrice"
        :rules="[
          val => temp_regular_price > 0 || 'Invalid Regular Price',
          val => val.trim() != '' || 'Required'
        ]"
        lazy-rules
      />
      <q-input
        class="col-6 q-pt-sm q-pr-sm"
        dense
        stack
        label="Sale Price"
        v-model="sale_price"
        @focus="toInputSalePrice"
        @blur="toChangeSalePrice"
        error-message="Invalid Sale Price"
        :error="sale_price_error"
        :rules="[]"
      />
    </div>

    <input
      class="col-12 hidden"
      type="file"
      ref="fileInput0"
      multiple
      @change="onImageSelected0"
    />
    <input
      class="col-12 hidden"
      type="file"
      ref="fileInput1"
      @change="onImageSelected1"
    />
    <input
      class="col-12 hidden"
      type="file"
      ref="fileInput2"
      @change="onImageSelected2"
    />
    <input
      class="col-12 hidden"
      type="file"
      ref="fileInput3"
      @change="onImageSelected3"
    />
    <br />
    <div
      v-show="step == 3"
      class="row flex q-gutter-md justify-center"
      align="center"
    >
      <q-card
        flat
        bordered
        style="min-width:154px;max-width:154px;min-height:152px;max-height:152px;cursor:pointer;overflow: hidden;"
        v-for="i in [0, 1, 2, 3]"
        :key="i"
        @mouseover="currentPic = i"
        @mouseleave="currentPic = -1"
        :style="!validation[3 + i] ? 'border-color:red' : ''"
      >
        <q-card-section v-if="fileSelected[i].length == 0">
          <br />
          <br />
          <q-btn
            icon="add"
            @click="(currentPic = -1), $refs['fileInput' + i].click()"
            color="primary"
            round
            unelevated
          />
        </q-card-section>
        <q-card-section v-if="currentPic == i">
          <br />
          <br />
          <q-btn
            icon="edit"
            @click="(currentPic = -1), $refs['fileInput' + i].click()"
            color="primary"
            round
            unelevated
          />&nbsp;
          <q-btn
            icon="delete"
            @click="(currentPic = -1), (fileSelected[i] = [])"
            color="red"
            round
            unelevated
          />
        </q-card-section>
        <img
          :src="photoUrl[i]"
          v-show="fileSelected[i].length != 0"
          v-if="currentPic != i"
          width="100%"
          height="100%"
        />
      </q-card>
      <br />

      <div class="col-12 text-left q-pl-lg">
        <span class="text-grey text-italic">
          Please limit your photo size to 1MB or less, otherwise adding of item
          may not proceed.
        </span>
      </div>
    </div>
    <div v-show="step == 4" class="col-12 row">
      <div class="col-12 text-title text-black text-bold">Payment Method</div>
      <div class="col-12 q-pt-sm row items-center">
        <div class="col-11 text-title text-grey">
          Online Debit/Credit Card (default)
        </div>
        <!-- <div class="col-1 text-grey text-italic">Active</div> -->
        <q-radio class="col-1" :active="true" readonly />
      </div>
      <div class="col-12 q-pt-sm row items-center">
        <!-- <div class="col-11 text-title text-grey">
          Bank Deposit/Wire Transfer (default)
        </div> -->
        <!-- <div class="col-1 text-grey text-italic">Active</div> -->
        <!-- <q-radio class="col-1" :active="true" readonly /> -->
      </div>
      <div class="col-12 q-pt-sm text-title text-black text-bold">
        Other Flexible Options for Your Clients
      </div>

      <div class="col-12 row items-center">
        <div class="col-8 text-title text-grey-8">
          Enable Cash on Fulfillment?
        </div>
        <div class="col-4 q-gutter-sm">
          <div class="q-gutter-sm">
            <q-radio v-model="cof" :val="true" label="Yes" />
            <q-radio v-model="cof" :val="false" label="No" />
          </div>
        </div>
      </div>
      <div class="col-12 row items-center">
        <div class="col-8 text-title text-grey-8">
          Enable In-Store Service?
        </div>
        <div class="col-4 q-gutter-sm">
          <div class="q-gutter-sm">
            <q-radio v-model="in_store_service" :val="true" label="Yes" />
            <q-radio v-model="in_store_service" :val="false" label="No" />
          </div>
        </div>
      </div>

      <div class="col-12 row items-center">
        <div class="col-8 text-title text-grey-8">
          Enable Service at Preferred Location?
        </div>
        <div class="col-4 q-gutter-sm">
          <div class="q-gutter-sm">
            <q-radio v-model="prefered_location" :val="true" label="Yes" />
            <q-radio v-model="prefered_location" :val="false" label="No" />
          </div>
        </div>
      </div>

      <!-- <div class="col-11 text-title text-grey">
          Enable Cash on Fulfillment?
        </div>
        <q-checkbox class="col-1" v-model="cof" /> -->
      <!-- <div class="col-12 row items-center">
        <div class="col-11 text-title text-grey">
          Enable Layaway?
          <q-btn color="grey" size="sm" round flat icon="help">
            <q-popup-proxy>
              <q-banner>
                <div class="text-bold">What is Layaway?</div>
                a system of paying a deposit to secure an item for later
                purchase.
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </div>
        <q-checkbox class="col-1" v-model="lay_away" />
      </div> -->
      <!--  <div class="col-12 text-title text-black text-bold">Others</div>

      <div class="col-12 row items-center">
        <div class="col-8 text-title text-grey-8">
          Require 20% downpayment upon booking if Cash on Fulfillment?
        </div>
        <div class="col-4 q-gutter-sm">
          <div class="q-gutter-sm">
            <q-radio v-model="dp_cof" :val="true" label="Yes" />
            <q-radio v-model="dp_cof" :val="false" label="No" />
          </div>
        </div>
      </div>  uncomment when needed-->

      <!-- <div class="col-12 row items-center">
        <div class="col-11 text-title text-grey">
          Require 20% downpayment upon booking if Cash on Fulfillment?
        </div>
        <q-checkbox class="col-1" v-model="dp_cof" />
      </div> -->
    </div>
  </div>
</template>

<script>
import imageCompression from "browser-image-compression";

export default {
  props: ["step", "category"],
  data() {
    return {
      currentPic: -1,
      opened: false,
      category: "",
      category_options: [],
      SKU: "",
      service_name: "",
      description: "",
      regular_price: "",
      temp_regular_price: "",
      sale_price: "",
      temp_sale_price: null,
      cof: true,
      lay_away: true,
      dp_cof: true,
      fileSelected: [[], [], [], []],
      photoUrl: ["", "", "", ""],
      validation: [],
      sale_price_error: false,
      description_error: false,
      description_error_message: "",
      description_counter: 0,
      in_store_service: true,
      prefered_location: true
    };
  },
  methods: {
    onImageSelected0: function(event) {
      Array.from(event.target.files).map((file, index) => {
        this.photoUrl[index] = URL.createObjectURL(event.target.files[index]);
        this.$forceUpdate();
        this.fileSelected[index] = event.target.files[index];
        this.$forceUpdate();
      });
    },
    onImageSelected1: function(event) {
      this.photoUrl[1] = URL.createObjectURL(event.target.files[0]);
      this.$forceUpdate();
      this.fileSelected[1] = event.target.files[0];
      this.$forceUpdate();
    },
    onImageSelected2: function(event) {
      this.photoUrl[2] = URL.createObjectURL(event.target.files[0]);
      this.$forceUpdate();
      this.fileSelected[2] = event.target.files[0];
      this.$forceUpdate();
    },
    onImageSelected3: function(event) {
      this.photoUrl[3] = URL.createObjectURL(event.target.files[0]);
      this.$forceUpdate();
      this.fileSelected[3] = event.target.files[0];
      this.$forceUpdate();
    },

    async save() {
      this.$q.loading.show();

      if (await this.validate()) {
        return;
      }
      this.saves();
    },

    async save() {
      this.$q.loading.show();

      try {
        const photoPaths = await this.uploadImages(this.fileSelected);
        const expiry = await this.getExpiryDate();
        await this.createService(photoPaths, expiry);
      } catch (e) {
        setTimeout(() => {
          this.opened = false;
          this.$q.dialog({
            title: "Success!",
            message: "You successfully added a service."
          });
          this.$EventBus.$emit("update-step", 6);
          this.$q.loading.hide();
        }, 500);
      }
    },

    async uploadImages(files) {
      const compressedFiles = await Promise.all(
        files.map(file => this.compressImage(file))
      );
      const uploadPromises = compressedFiles.map(file =>
        this.uploadImage(file)
      );
      return Promise.all(uploadPromises);
    },

    async compressImage(file) {
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 1024, // Maximum width or height
        useWebWorker: true // Use web worker for compression
      };
      try {
        const compressedFile = await imageCompression(file, options);
        console.log("Original file size:", file.size / 1024 / 1024, "MB");
        console.log(
          "Compressed file size:",
          compressedFile.size / 1024 / 1024,
          "MB"
        );
        return compressedFile;
      } catch (error) {
        console.error("Error compressing image:", error);
        return file; // Return original file if compression fails
      }
    },

    async getExpiryDate() {
      const results = await this.$dbCon.service("product-subscriptions").find({
        query: {
          store_id: this.$local.getItem("store_token"),
          $or: [
            {
              date_end: {
                $gte: new Date()
              },
              status: "Paid"
            },
            {
              status: "Free"
            }
          ],
          $sort: { date_ordered: -1 }
        }
      });

      if (results.data.length === 0) {
        return "";
      } else if (results.data[0].status === "Free") {
        return "";
      } else if (results.data[0].status === "Paid") {
        return results.data[0].date_end;
      }
    },

    async createService(photoPaths, expiry) {
      await this.$dbCon.service("services").create({
        available: 0,
        booked: 0,
        completed: 0,
        cancelled: 0,
        refunded: 0,
        store_id: this.$local.getItem("store_token"),
        category: this.category,
        SKU: this.SKU,
        service_name: this.service_name,
        description: this.description,
        regular_price: +this.temp_regular_price,
        sale_price: +this.temp_sale_price,
        cof: this.cof,
        dp_cof: this.dp_cof,
        lay_away: this.lay_away,
        deleted: false,
        photos: photoPaths,
        expiry: expiry,
        in_store_service: this.in_store_service,
        prefered_location: this.prefered_location,
        logs: [
          {
            event: "added",
            date: new Date()
          }
        ],
        createdAt: new Date()
      });
      await this.$dbCon.service("products").create(data);
    },

    // old
    // saves: async function() {
    //   this.$q.loading.show();
    //   var photoPaths = [];
    //   photoPaths[0] = await this.uploadImage(this.fileSelected[0]);
    //   photoPaths[1] = await this.uploadImage(this.fileSelected[1]);
    //   photoPaths[2] = await this.uploadImage(this.fileSelected[2]);
    //   photoPaths[3] = await this.uploadImage(this.fileSelected[3]);
    //   // console.log(photoPaths);
    //   var expiry = await this.$dbCon
    //     .service("service-subscriptions")
    //     .find({
    //       query: {
    //         store_id: this.$local.getItem("store_token"),
    //         $or: [
    //           {
    //             date_end: {
    //               $gte: new Date()
    //             },
    //             status: "Paid"
    //           },
    //           {
    //             status: "Free"
    //           }
    //         ],
    //         $sort: { date_ordered: -1 }
    //       }
    //     })
    //     .then(results => {
    //       if (results.data.length == 0) {
    //         return "";
    //       } else if (results.data[0].status == "Free") {
    //         return "";
    //       } else if (results.data[0].status == "Paid") {
    //         return results.data[0].date_end;
    //       }
    //     });
    //   this.$dbCon
    //     .service("services")
    //     .create({
    //       available: 0,
    //       booked: 0,
    //       completed: 0,
    //       cancelled: 0,
    //       refunded: 0,
    //       store_id: this.$local.getItem("store_token"),
    //       category: this.category,
    //       SKU: this.SKU,
    //       service_name: this.service_name,
    //       description: this.description,
    //       regular_price: +this.temp_regular_price,
    //       sale_price: +this.temp_sale_price,
    //       cof: this.cof,
    //       dp_cof: this.dp_cof,
    //       lay_away: this.lay_away,
    //       deleted: false,
    //       photos: photoPaths,
    //       expiry: expiry,
    //       logs: [
    //         {
    //           event: "added",
    //           date: new Date()
    //         }
    //       ],
    //       createdAt: new Date()
    //     })
    //     .then(() => {
    //       this.$q.loading.hide();
    //       this.opened = false;
    //       this.$q.dialog({
    //         title: "Success!",
    //         message: "You successfully added a service."
    //       });
    //     });
    //   this.$EventBus.$emit("update-step", 6);
    // },
    validate: async function() {
      this.validation = [];
      if (this.step == 2) {
        this.validation[0] = await this.$refs.inp_service_name.validate();
        this.validation[1] = await this.$refs.inp_regular_price.validate();
        this.validation[2] = await this.$refs.inp_sku.validate();
        this.validateDescription();
        if (this.description_error) {
          this.validation[3] = false;
        }
        if (
          parseFloat(this.temp_regular_price) <=
          parseFloat(this.temp_sale_price)
        ) {
          this.sale_price_error = true;
          this.validation[4] = false;
        } else if (parseFloat(this.temp_sale_price) < 1) {
          this.sale_price_error = true;
          this.validation[4] = false;
        } else {
          this.sale_price_error = false;
        }
        return this.validation.includes(false);
      }
      if (this.step == 3) {
        this.validation[3] = this.fileSelected[0].length != 0;
        this.validation[4] = this.fileSelected[1].length != 0;
        this.validation[5] = this.fileSelected[2].length != 0;
        this.validation[6] = this.fileSelected[3].length != 0;
        return this.validation.includes(false);
      }
    },
    uploadImage: async function(fileSelected) {
      const formData = new FormData();
      formData.append(this.$appLink, fileSelected, fileSelected.name);
      var result = await this.$axios.post(
        this.$appLink + "/uploadServices",
        formData
      );
      return result.data;
    },
    toInputRegularPrice: function() {
      this.regular_price = this.temp_regular_price;
    },
    toChangeRegularPrice: function() {
      this.temp_regular_price = this.regular_price;
      this.regular_price = this.$prettyMoney(this.regular_price);
    },
    toInputSalePrice: function() {
      this.sale_price = this.temp_sale_price;
    },
    toChangeSalePrice: function() {
      this.temp_sale_price = this.sale_price;
      this.sale_price = this.$prettyMoney(this.sale_price);
    },
    validateDescription: function() {
      if (this.$sanitize(this.description).trim() == "") {
        this.description_error = true;
        this.description_error_message = "This field is required.";
        return;
      } else {
        this.description_error = false;
      }
      this.description_counter = this.$wordsCount(
        this.$sanitize(this.description).trim()
      );
      if (this.description_counter > 1000) {
        this.description_error = true;
        this.description_error_message = "Maximum of 1000 words only.";
      } else {
        this.description_error = false;
      }
    }
  },
  watch: {
    step: function() {
      if (this.step == 5) {
        this.save();
      }
    },

    in_store_service: function(newVal) {
      console.log(newVal);
      if (!newVal && !this.prefered_location) {
        this.prefered_location = true; // Enforce one to be true
      }
    },
    prefered_location: function(newVal) {
      if (!newVal && !this.in_store_service) {
        this.in_store_service = true; // Enforce one to be true
      }
    }
  },
  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.category_options = [];
      this.$dbCon
        .service("store")
        .get(this.$local.getItem("store_token"))
        .then(store => {
          this.$dbCon
            .service("categories")
            .find({
              query: {
                category_name: {
                  $in: store.categories
                },
                classification: "Service"
              }
            })
            .then(results => {
              results.data.map(category => {
                this.category_options.push(category.category_name);
              });
            });
        });
    });
  }
};
</script>

<style></style>
