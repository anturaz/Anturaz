<template>
  <!-- <div class="q-pa-md row">
    <div class="col-12">
      <q-breadcrumbs class="text-grey">
        <q-breadcrumbs-el label="Store" icon="store" />

        <q-breadcrumbs-el label="Inventory" icon="inventory" />
        <q-breadcrumbs-el label="Service" />
        <q-breadcrumbs-el :label="data.service_name" />
      </q-breadcrumbs>
      <br />
    </div>
    <div class="col-12">
      <q-btn
        icon="arrow_back_ios"
        color="primary"
        flat
        label="back"
        dense
        @click="$router.push('/StoreOwner/Inventory/Services')"
      />
    </div>
    <div :class="$q.screen.lt.sm? 'col-12': 'col-6'">
      <input class="hidden" type="file" ref="fileInput" @change="onFileSelected" />
      <div style="overflow: hidden;height:300px">
        <q-img :src="currentPicture">
          <q-btn
            fab
            color="primary"
            icon="edit"
            class="absolute"
            @click="changeCurrentPicture()"
            style="top: 1; right: 12px; transform: translateY(20%);"
          />
        </q-img>
      </div>
      <div class="row">
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden;height:100px"
          @click="currentPicture=data.photos[0],currentIndexPicture=0"
        >
          <q-img :src="data.photos[0]" />
        </q-btn>
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden;height:100px"
          @click="currentPicture=data.photos[1],currentIndexPicture=1"
        >
          <q-img :src="data.photos[1]" />
        </q-btn>
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden;height:100px"
          @click="currentPicture=data.photos[2],currentIndexPicture=2"
        >
          <q-img :src="data.photos[2]" />
        </q-btn>
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden;height:100px"
          @click="currentPicture=data.photos[3],currentIndexPicture=3"
        >
          <q-img :src="data.photos[3]" />
        </q-btn>
      </div>
      <br />

      <q-markup-table flat bordered dense>
        <thead>
          <tr>
            <td class="bg-primary text-white" colspan="3">Logs</td>
          </tr>
          <tr>
            <td class="text-bold text-left">Date</td>
            <td class="text-bold text-right">Description</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in data.logs.slice().reverse()" :key="log.date">
            <td class="text-left">{{$formatDate(log.date)}}</td>
            <td class="text-right">{{log.event}}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div :class="$q.screen.lt.sm? 'col-12':'col-6 q-pl-md'">
      <div class="col-12 row">
        <EditService class="col-6" />
        <q-btn
          class="col-6"
          outline
          color="primary"
          size="sm"
          dense
          label="Delete Service"
          @click="deleteService()"
        />
      </div>
      <br />
      <q-markup-table flat bordered dense>
        <tbody>
          <tr>
            <td class="text-bold">SKU:</td>
            <td class="text-right">{{data.SKU}}</td>
          </tr>
          <tr>
            <td class="text-bold">Service Name:</td>
            <td class="text-right">{{data.service_name}}</td>
          </tr>
          <tr>
            <td class="text-bold">Category:</td>
            <td class="text-right">{{data.category}}</td>
          </tr>
          <tr>
            <td class="text-bold">Regular Price:</td>
            <td class="text-right">{{data.regular_price}}</td>
          </tr>
          <tr>
            <td class="text-bold">Sale Price:</td>
            <td class="text-right">{{data.sale_price}}</td>
          </tr>
          
        </tbody>
      </q-markup-table>
      <br />
      <q-card flat bordered>
        <q-card-section>
          <p class="text-bold">Description:</p>
          <div v-html="data.description" />
        </q-card-section>
      </q-card>
    </div>
  </div> -->
  <div class="q-pa-md row">
    <q-dialog v-model="editService" persistent :maximized="$q.screen.lt.md">
      <q-card style="width: 80vh">
        <q-card-section class="row items-center text-grey-10">
          <div class="text-h6">Edit Service</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section class="row">
          <div class="col-12 row">
            <q-select
              class="col-md-12 col-xs-12 q-pt-sm"
              v-model="data.category"
              dense
              stack
              label="Category"
              :options="category_options"
            />

            <q-input
              class="col-md-12 col-xs-12 q-pt-sm"
              v-model="data.service_name"
              dense
              stack
              label="Service name"
              :rules="[val => val.trim() != '' || 'Required']"
              ref="inp_service_name"
            />

            <q-input
              class="col-md-12 col-xs-12 q-pt-sm"
              v-model="data.SKU"
              dense
              stack
              label="Stock Keeping Unit(SKU)"
              :rules="[val => val.trim() != '' || 'Required']"
              ref="inp_sku"
            />
            <div class="col-12">
              <p class="text-title text-black">
                Description
                <span class="text-italic">
                  ( Please indicate full description of the item )
                </span>
              </p>
              <q-editor
                class="col-12 q-pt-sm"
                v-model="data.description"
                min-height="4rem"
                ref="inp_description"
                @input="
                  () => {
                    validateDescription();
                  }
                "
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
              v-model="data.regular_price"
              @focus="toInputRegularPrice"
              @blur="toChangeRegularPrice"
              ref="inp_regular_price"
              :rules="[
                val => val == 0 || 'Invalid Regular Price',
                val => val.trim() != '' || 'Required',
                val =>
                  val < this.temp_sale_price ||
                  'this Regular Price is higher than sale price'
              ]"
              lazy-rules
            />
            <q-input
              class="col-6 q-pt-sm q-pr-sm"
              dense
              stack
              label="Sale Price"
              @focus="toInputSalePrice"
              @blur="toChangeSalePrice"
              v-model="data.sale_price"
              :rules="[]"
              lazy-rules
            />

            <!-- <q-select
              class="col-6 q-pr-sm"
              dense
              square
              outlined
              v-model="data.category"
              :options="category_options"
              label="Category"
            />
            <q-input
              class="col-6"
              square
              outlined
              dense
              stack
              label="Stock Keeping Unit(SKU)"
            />
            <q-input
              class="col-12 q-pt-sm"
              square
              outlined
              dense
              stack
              label="Service Name"
              ref="inp_service_name"
              v-model="data.service_name"
              :rules="[val => val.trim() != '' || 'Required']"
              lazy-rules
              counter
            />
            <p class="text-caption text-grey">Description:</p>
            <q-editor
              class="col-12 q-pt-sm"
              v-model="data.description"
              min-height="4rem"
              ref="inp_description"
            />
            <q-input
              class="col-6 q-pt-sm q-pr-sm"
              square
              outlined
              dense
              stack
              label="Regular Price"
              v-model="temp_regular_price"
              @focus="toInputRegularPrice"
              @blur="toChangeRegularPrice"
              ref="inp_regular_price"
              :rules="[val => val.trim() != '' || 'Required']"
              lazy-rules
            />
            <q-input
              class="col-6 q-pt-sm q-pr-sm"
              square
              outlined
              dense
              stack
              label="Sale Price"
              @focus="toInputSalePrice"
              @blur="toChangeSalePrice"
              v-model="temp_sale_price"
              :rules="[
                val =>
                  parseFloat(data.regular_price) >
                    parseFloat(data.sale_price) || 'Invalid Sale Price'
              ]"
              lazy-rules
            />
          </div>
          <div class="row col-12">
            <q-card class="col-md-6 col-sm-12" flat bordered>
              <q-card-section class="row">
                <p class="col-12 text-title text-bold text-grey">
                  Enable Cash on Fulfillment?
                </p>
                <q-btn-toggle
                  class="col-12"
                  spread
                  value="one"
                  style="border:1px solid grey"
                  no-caps
                  rounded
                  unelevated
                  :toggle-color="data.cof ? 'primary' : 'grey'"
                  color="white"
                  text-color="grey"
                  v-model="data.cof"
                  :options="[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]"
                />
              </q-card-section>
            </q-card>
            <q-card class="col-md-6 col-sm-12" flat bordered>
              <q-card-section class="row">
                <p class="col-12 text-title text-bold text-grey">
                  Enable Lay-away?
                </p>
                <q-btn-toggle
                  class="col-12"
                  spread
                  value="one"
                  style="border:1px solid grey"
                  no-caps
                  rounded
                  unelevated
                  :toggle-color="data.lay_away ? 'primary' : 'grey'"
                  color="white"
                  text-color="grey"
                  v-model="data.lay_away"
                  :options="[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]"
                /> -->
            <!-- </q-card-section>
            </q-card> -->
          </div>
        </q-card-section>

        <q-card-section class="row ">
          <p class="col-6 text-title text-bold text-grey">
            Enable Cash on Fulfillment?
          </p>
          <q-btn-toggle
            class="col-6"
            spread
            value="one"
            style="border:1px solid grey"
            no-caps
            rounded
            unelevated
            :toggle-color="data.cof ? 'primary' : 'grey'"
            color="white"
            text-color="grey"
            v-model="data.cof"
            :options="[
              { label: 'Yes', value: true },
              { label: 'No', value: false }
            ]"
          />
        </q-card-section>

        <q-card-section class="row ">
          <p class="col-6 text-title text-bold text-grey">
            Enable In-Store Service?
          </p>
          <q-btn-toggle
            class="col-6"
            spread
            value="one"
            style="border:1px solid grey"
            no-caps
            rounded
            unelevated
            :toggle-color="data.in_store_service ? 'primary' : 'grey'"
            color="white"
            text-color="grey"
            v-model="data.in_store_service"
            :options="[
              { label: 'Yes', value: true },
              { label: 'No', value: false }
            ]"
          />
        </q-card-section>

        <q-card-section class="row ">
          <p class="col-6 text-title text-bold text-grey">
            Enable Service at Preferred Location?
          </p>
          <q-btn-toggle
            class="col-6"
            spread
            value="one"
            style="border:1px solid grey"
            no-caps
            rounded
            unelevated
            :toggle-color="data.prefered_location ? 'primary' : 'grey'"
            color="white"
            text-color="grey"
            v-model="data.prefered_location"
            :options="[
              { label: 'Yes', value: true },
              { label: 'No', value: false }
            ]"
          />
        </q-card-section>

        <q-card-section class="row" v-if="isVisible">
          <div class="col-6 text-title text-bold text-grey">
            Require 20% downpayment upon booking if Cash on Fulfillment?
          </div>
          <q-btn-toggle
            class="col-6"
            spread
            value="one"
            style="border:1px solid grey"
            no-caps
            rounded
            unelevated
            :toggle-color="data.cof ? 'primary' : 'grey'"
            color="white"
            text-color="grey"
            v-model="data.dp_cof"
            :options="[
              { label: 'Yes', value: true },
              { label: 'No', value: false }
            ]"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pt-md">
          <q-btn
            class="q-ml-sm"
            color="primary"
            label="Save"
            @click="save"
            no-caps
            ref="btn_edit"
            @mouseover="
              ($refs.btn_edit.unelevated = true),
                ($refs.btn_edit.outline = false)
            "
            @mouseleave="
              ($refs.btn_edit.outline = true),
                ($refs.btn_edit.unelevated = false)
            "
            outline
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { data } from "jquery";

// import EditService from "./editService.vue";
export default {
  components: {
    // EditService
  },
  data() {
    return {
      data: {},
      currentPicture: "",
      currentIndexPicture: 0,
      fileSelected: {},
      editService: false,
      temp_regular_price: "",
      temp_sale_price: "",

      description_error: false,
      description_error_message: "",
      description_counter: 0,
      category_options: [],
      description: "",
      isVisible: false
    };
  },

  watch: {
    "data.in_store_service": function(newVal) {
      if (!newVal && !this.data.prefered_location) {
        this.data.prefered_location = true; // Enforce one to be true
      }
    },
    "data.prefered_location": function(newVal) {
      if (!newVal && !this.data.in_store_service) {
        this.data.in_store_service = true; // Enforce one to be true
      }
    }
  },
  methods: {
    openEditService: async function(serviceId) {
      await this.getData(serviceId);
      this.editService = true;
    },
    toInputRegularPrice() {
      this.temp_regular_price = this.data.regular_price;
    },
    toChangeRegularPrice() {
      if (this.data.regular_price == 0 || this.data.regular_price == "") {
        this.data.regular_price = 0;
      }

      this.temp_regular_price = this.data.regular_price;
      this.data.regular_price = this.$prettyMoney(this.data.regular_price);
    },

    toInputSalePrice() {
      this.temp_sale_price = this.data.sale_price;
    },

    toChangeSalePrice() {
      this.temp_sale_price = this.data.sale_price;
      this.data.sale_price = this.$prettyMoney(this.data.sale_price);
    },

    validateForm: function() {
      let errors = [];

      const text = this.data.description
        .replace(/<br\s*\/?>|&nbsp;|\s+/g, "")
        .trim();
      this.description_error = text === "";
      this.description_error_message = this.description_error
        ? "Description is required."
        : "";

      if (!this.data.SKU.trim()) errors.push("SKU is required.");
      if (!this.data.service_name.trim())
        errors.push("Product Name is required.");

      if (!this.data.regular_price.trim())
        errors.push("Regular Price is required.");

      if (!this.data.sale_price.trim())
        errors.push("Regular Price is required.");

      if (errors.length > 0) {
        let message = "";
        for (let i = 0; i < errors.length; i++) {
          message += errors[i];
          if (i < errors.length - 1) {
            message += "\n"; // Add a line break after each error except the last one
          }
        }
        this.$q.notify({
          type: "negative",
          message: message,
          timeout: 3000,
          html: true,
          color: "red"
        });
        return false;
      }
      return true;
    },

    save: async function() {
      if (this.temp_regular_price == 0) {
        this.data.regular_price = "";
        return this.$q.notify({
          message: "Regular Price must not be 0",
          position: "top-right",
          color: "negative",
          timeout: 2000,
          icon: "report_problem"
        });
      }

      if (+this.temp_regular_price <= +this.temp_sale_price) {
        this.data.regular_price = "";
        return this.$q.notify({
          message: "Sale Price must be higher than Regular Price",
          position: "top-right",
          color: "negative",
          timeout: 2000,
          icon: "report_problem"
        });
      }
      if (!this.validateForm()) return;

      this.data.regular_price = +this.temp_regular_price;
      this.data.sale_price = +this.temp_sale_price;
      this.$dbCon
        .service("services")
        .patch(this.data._id, this.data)
        .then(() => {
          this.$q
            .dialog({
              title: "Success!",
              message: "You successfully updated a Service.",
              persistent: true
            })
            .onOk(() => {
              this.editService = false;
            });
        });
    },
    deleteService: function(serviceId) {
      this.getData(serviceId);
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Do you really want to delete this service? if yes Enter your password",
          prompt: {
            model: "",
            type: "password" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(async password => {
          this.$q.loading.show();
          try {
            const loggedUser = await this.$dbCon.services.users.get(
              this.$local.getItem("user_token")
            );
            await this.$axios.post(this.$appLink + "/authentication", {
              email: loggedUser.email,
              password: password,
              strategy: "local"
            });
            this.data.deleted = true;
            this.$dbCon.service("services").patch(this.data._id, this.data);
            this.$q.dialog({
              title: "Success!",
              message: "You have successfully deleted a service."
            });

            if (this.$route.fullPath == "/StoreOwner/PublishStore")
              this.$router.push("/StoreOwner/PublishStore");
            else this.$router.push("/StoreOwner/Inventory/Services");
          } catch (e) {
            console.log(e);
          }
          this.$q.loading.hide();
        });
    },
    changeCurrentPicture: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you want to replace the current photo?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(() => {
          this.$refs["fileInput"].click();
        });
    },
    onFileSelected: async function() {
      this.$q.loading.show();
      this.fileSelected = event.target.files[0];
      var result = await this.uploadImage(this.fileSelected);
      this.data.photos[this.currentIndexPicture] = result;
      this.currentPicture = this.data.photos[this.currentIndexPicture];
      await this.$forceUpdate();
      this.$dbCon
        .service("services")
        .patch(this.data._id, this.data)
        .then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "Successfully Updated!",
            position: "top-right",
            color: "primary",
            timeout: 700,
            icon: "check"
          });
        });
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
    getData: async function(serviceId) {
      await this.$dbCon
        .service("services")
        .find({
          query: {
            _id: serviceId,
            store_id: this.$local.getItem("store_token")
          }
        })
        .then(result => {
          if (result.data.length == 0) {
            // this.$router.push("/StoreOwner/Inventory");
          } else {
            this.data = result.data[0];
            this.temp_regular_price = result.data[0].regular_price;
            this.temp_sale_price = result.data[0].sale_price;
            // this.temp_sale_price
            this.data.regular_price = this.$prettyMoney(
              this.data.regular_price
            );
            this.data.sale_price = this.$prettyMoney(this.data.sale_price);
            this.currentPicture = this.data.photos[0];
          }
        });
    },

    validateDescription: function() {
      if (this.$sanitize(this.data.description).trim() == "") {
        this.description_error = true;
        this.description_error_message = "This field is required.";
        return;
      } else {
        this.description_error = false;
      }
      this.description_counter = this.$wordsCount(
        this.$sanitize(this.data.description).trim()
      );
      if (this.description_counter > 1000) {
        this.description_error = true;
        this.description_error_message = "Maximum of 1000 words only.";
      } else {
        this.description_error = false;
      }
    }
  },
  mounted() {
    // this.$dbCon
    //   .service("services")
    //   .find({
    //     query: {
    //       _id: this.$route.query.service,
    //       store_id: this.$local.getItem("store_token")
    //     }
    //   })
    //   .then(result => {
    //     if (result.data.length == 0) {
    //       this.$router.push("/StoreOwner/Inventory");
    //     } else {
    //       this.data = result.data[0];
    //       this.currentPicture = this.data.photos[0];
    //     }
    //   });
  }
};
</script>

<style></style>
