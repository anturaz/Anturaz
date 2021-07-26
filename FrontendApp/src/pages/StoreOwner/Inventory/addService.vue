<template>
  <div class="row">
    <div v-show="step==2" class="col-md-12 col-sm-12 row">
      <q-input
        class="col-md-12 col-xs-12 q-pt-sm"
        v-model="SKU"
        dense
        stack
        label="Stock Keeping Unit(SKU)"
        :rules="[ val => val.trim()!='' || 'Required']"
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
        :rules="[ val => val.trim()!='' || 'Required']"
        lazy-rules
        counter
      />
      <p class="text-title text-black">Description:</p>
      <div class="col-12 q-pt-sm">
        <q-editor
          v-model="description"
          min-height="4rem"
          ref="inp_description"
          @input="()=>validateDescription()"
          :style="description_error?'border:solid red 1px': ''"
        />
        <div v-if="!description_error" align="right">
          <small class="text-grey">{{description_counter}} / 1000 words</small>
        </div>
        <small class="text-red" v-if="description_error">{{description_error_message}}</small>
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
        :rules="[val=> temp_regular_price>0 || 'Invalid Regular Price', val => val.trim()!='' || 'Required']"
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

    <input class="col-12 hidden" type="file" ref="fileInput0" multiple @change="onImageSelected0" />
    <input class="col-12 hidden" type="file" ref="fileInput1" @change="onImageSelected1" />
    <input class="col-12 hidden" type="file" ref="fileInput2" @change="onImageSelected2" />
    <input class="col-12 hidden" type="file" ref="fileInput3" @change="onImageSelected3" />
    <br />
    <div v-show="step==3" class="row flex q-gutter-md justify-center" align="center">
      <q-card
        flat
        bordered
        style="min-width:154px;max-width:154px;min-height:152px;max-height:152px;cursor:pointer;overflow: hidden;"
        v-for="i in [0,1,2,3]"
        :key="i"
        @mouseover="currentPic=i"
        @mouseleave="currentPic=-1"
        :style="!validation[3+i]? 'border-color:red': ''"
      >
        <q-card-section v-if="fileSelected[i].length==0">
          <br />
          <br />
          <q-btn
            icon="add"
            @click="currentPic=-1,$refs['fileInput'+i].click()"
            color="primary"
            round
            unelevated
          />
        </q-card-section>
        <q-card-section v-if="currentPic==i">
          <br />
          <br />
          <q-btn
            icon="edit"
            @click="currentPic=-1,$refs['fileInput'+i].click()"
            color="primary"
            round
            unelevated
          />&nbsp;
          <q-btn
            icon="delete"
            @click="currentPic=-1,fileSelected[i]=[]"
            color="red"
            round
            unelevated
          />
        </q-card-section>
        <img
          :src="photoUrl[i]"
          v-show="fileSelected[i].length!=0"
          v-if="currentPic!=i"
          width="100%"
          height="100%"
        />
      </q-card>
    </div>
    <div v-show="step==4" class="col-12">
      <div class="col-12 text-title text-black text-bold">Payment Method</div>
      <div class="col-12 q-pt-sm row items-center">
        <div class="col-11 text-title text-grey">Online Debit/Credit Card (default)</div>
        <!-- <div class="col-1 text-grey text-italic">Active</div> -->
         <q-radio class="col-1" :active="true" readonly />
      </div>
      <div class="col-12 q-pt-sm row items-center">
        <div class="col-11 text-title text-grey">Bank Deposit/Wire Transfer (default)</div>
        <!-- <div class="col-1 text-grey text-italic">Active</div> -->
         <q-radio class="col-1" :active="true" readonly />
      </div>
      <div
        class="col-12 q-pt-sm text-title text-black text-bold"
      >Other Flexible Options for Your Clients</div>
      <div class="col-12 row items-center">
        <div class="col-11 text-title text-grey">Enable Cash on Fulfillment?</div>
        <q-checkbox class="col-1" v-model="cof" />
      </div>
      <div class="col-12 row items-center">
        <div class="col-11 text-title text-grey">
          Enable Layaway?
          <q-btn color="grey" size="sm" round flat icon="help">
            <q-popup-proxy>
              <q-banner>
                <div class="text-bold">What is Layaway?</div>a system of paying a deposit to secure an item for later purchase.
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </div>
        <q-checkbox class="col-1" v-model="lay_away" />
      </div>
      <div class="col-12 text-title text-black text-bold">Others</div>
      <div class="col-12 row items-center">
        <div
          class="col-11 text-title text-grey"
        >Require 20% downpayment upon booking if Cash on Fulfillment?</div>
        <q-checkbox class="col-1" v-model="dp_cof" />
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    onImageSelected0: function (event) {
      Array.from(event.target.files).map((file, index) => {
        this.photoUrl[index] = URL.createObjectURL(event.target.files[index]);
        this.$forceUpdate();
        this.fileSelected[index] = event.target.files[index];
        this.$forceUpdate();
      });
    },
    onImageSelected1: function (event) {
      this.photoUrl[1] = URL.createObjectURL(event.target.files[0]);
      this.$forceUpdate();
      this.fileSelected[1] = event.target.files[0];
      this.$forceUpdate();
    },
    onImageSelected2: function (event) {
      this.photoUrl[2] = URL.createObjectURL(event.target.files[0]);
      this.$forceUpdate();
      this.fileSelected[2] = event.target.files[0];
      this.$forceUpdate();
    },
    onImageSelected3: function (event) {
      this.photoUrl[3] = URL.createObjectURL(event.target.files[0]);
      this.$forceUpdate();
      this.fileSelected[3] = event.target.files[0];
      this.$forceUpdate();
    },
    save: async function () {
      this.$q.loading.show();
      var photoPaths = [];
      photoPaths[0] = await this.uploadImage(this.fileSelected[0]);
      photoPaths[1] = await this.uploadImage(this.fileSelected[1]);
      photoPaths[2] = await this.uploadImage(this.fileSelected[2]);
      photoPaths[3] = await this.uploadImage(this.fileSelected[3]);
      console.log(photoPaths);
      var expiry = await this.$dbCon
        .service("service-subscriptions")
        .find({
          query: {
            store_id: this.$local.getItem("store_token"),
            $or: [
              {
                date_end: {
                  $gte: new Date(),
                },
                status: "Paid",
              },
              {
                status: "Free",
              },
            ],
            $sort: { date_ordered: -1 },
          },
        })
        .then((results) => {
          if (results.data.length == 0) {
            return "";
          } else if (results.data[0].status == "Free") {
            return "";
          } else if (results.data[0].status == "Paid") {
            return results.data[0].date_end;
          }
        });
      this.$dbCon
        .service("services")
        .create({
          store_id: this.$local.getItem("store_token"),
          category: this.category,
          SKU: this.SKU,
          service_name: this.service_name,
          description: this.description,
          regular_price: this.temp_regular_price,
          sale_price: this.temp_sale_price,
          cof: this.cof,
          lay_away: this.lay_away,
          deleted: false,
          photos: photoPaths,
          expiry: expiry,
          logs: [
            {
              event: "added",
              date: new Date(),
            },
          ],
          createdAt: new Date(),
        })
        .then(() => {
          this.$q.loading.hide();
          this.opened = false;
          this.$q.dialog({
            title: "Success!",
            message: "You successfully added a service.",
          });
        });
      this.$EventBus.$emit("update-step", 6);
    },
    validate: async function () {
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
    uploadImage: async function (fileSelected) {
      const formData = new FormData();
      formData.append(this.$appLink, fileSelected, fileSelected.name);
      var result = await this.$axios.post(
        this.$appLink + "/uploadServices",
        formData
      );
      return result.data;
    },
    toInputRegularPrice: function () {
      this.regular_price = this.temp_regular_price;
    },
    toChangeRegularPrice: function () {
      this.temp_regular_price = this.regular_price;
      this.regular_price = this.$prettyMoney(this.regular_price);
    },
    toInputSalePrice: function () {
      this.sale_price = this.temp_sale_price;
    },
    toChangeSalePrice: function () {
      this.temp_sale_price = this.sale_price;
      this.sale_price = this.$prettyMoney(this.sale_price);
    },
    validateDescription: function () {
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
    },
  },
  watch: {
    step: function () {
      if (this.step == 5) {
        this.save();
      }
    },
  },
  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.category_options = [];
      this.$dbCon
        .service("store")
        .get(this.$local.getItem("store_token"))
        .then((store) => {
          this.$dbCon
            .service("categories")
            .find({
              query: {
                category_name: {
                  $in: store.categories,
                },
                classification: "Service",
              },
            })
            .then((results) => {
              results.data.map((category) => {
                this.category_options.push(category.category_name);
              });
            });
        });
    });
  },
};
</script>

<style>
</style>
