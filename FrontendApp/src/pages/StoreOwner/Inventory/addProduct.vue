<template>
  <div class="row">
    <div v-show="step == 2" class="col-12 row">
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
        label="Product Name"
        ref="inp_product_name"
        v-model="product_name"
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
      <div class="col-12">
        <q-editor
          v-model="description"
          min-height="4rem"
          @input="
            () => {
              validateDescription();
            }
          "
          ref="inp_description"
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
        class="col-4 q-pt-sm q-pr-sm"
        dense
        stack
        label="Regular Price"
        v-model="regular_price"
        @focus="toInputRegularPrice"
        @blur="toChangeRegularPrice"
        ref="inp_regular_price"
        :maxlength="14"
        :rules="[
          val => temp_regular_price > 0 || 'Invalid Regular Price',
          val => val.trim() != '' || 'Required'
        ]"
        lazy-rules
      />
      <q-input
        class="col-4 q-pt-sm q-pr-sm"
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
      <q-input
        class="col-4 q-pt-sm"
        dense
        stack
        mask="################"
        label="Stock On Hand"
        v-model="stock"
        ref="inp_stock"
        :rules="[val => val.trim() != '' || 'Required']"
        lazy-rules
      />

      <p class="text-title text-black col-12">
        <span class="">Variant </span>
      </p>

      <q-select
        ref="qSelectSize"
        class="col-12"
        label="Size"
        dense
        stack
        v-model="size"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="100"
        new-value-mode="add-unique"
        :rules="[val => size.length != 0 || 'Required']"
      >
        <template v-slot:after>
          <q-btn
            round
            dense
            flat
            icon="add"
            @click="addInputValue('qSelectSize', 'size')"
          ></q-btn>
        </template>

        <template v-slot:hint>
          <span class="text-grey">
            Click plus icon after typing a size
          </span>
        </template>
      </q-select>

      <q-select
        ref="qSelectColor"
        class="col-12"
        label="Color"
        dense
        stack
        v-model="color"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="100"
        new-value-mode="add-unique"
        :rules="[val => color.length != 0 || 'Required']"
      >
        <template v-slot:after>
          <q-btn
            round
            dense
            flat
            icon="add"
            @click="addInputValue('qSelectColor', 'color')"
          ></q-btn>
        </template>
        <template v-slot:hint>
          <span class="text-grey">
            Click plus icon after typing a color
          </span>
        </template>
      </q-select>

      <q-select
        ref="qSelectMaterial"
        class="col-12"
        label="Material"
        dense
        stack
        v-model="material"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="100"
        new-value-mode="add-unique"
        :rules="[val => material.length != 0 || 'Required']"
      >
        <template v-slot:after>
          <q-btn
            round
            dense
            flat
            icon="add"
            @click="addInputValue('qSelectMaterial', 'material')"
          ></q-btn>
        </template>

        <template v-slot:hint>
          <span class="text-grey">
            Click plus icon after typing a material
          </span>
        </template>
      </q-select>
    </div>
    <!-- PRODUCT PHOTOS -->

    <input
      class="col-12 hidden"
      type="file"
      multiple
      ref="fileInput0"
      @change="onImageSelected0"
      :max-file-size="500000"
    />
    <input
      class="col-12 hidden"
      type="file"
      ref="fileInput1"
      @change="onImageSelected1"
      :max-file-size="500000"
    />
    <input
      class="col-12 hidden"
      type="file"
      ref="fileInput2"
      @change="onImageSelected2"
      :max-file-size="500000"
    />
    <input
      class="col-12 hidden"
      type="file"
      ref="fileInput3"
      @change="onImageSelected3"
      :max-file-size="500000"
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
      <div class="row">
        <div class="col-12 text-title text-black text-bold">Payment Method</div>
        <div class="col-12 q-pt-sm row items-center">
          <div class="col-11 text-title text-grey">
            Online Debit/Credit Card (default)
          </div>
          <!-- <div class="col-1 text-grey text-italic">Active</div> -->
          <q-radio class="col-1" :active="true" readonly />
        </div>

        <div class="col-12 q-pt-sm row items-center">
          <div class="col-11 text-title text-grey">
            Bank Deposit/Wire Transfer (default)
          </div>
          <!-- <div class="col-1 text-grey text-italic">Active</div> -->
          <q-radio class="col-1" :active="true" readonly />
        </div>

        <div class="col-12 q-pt-sm text-title text-black text-bold">
          Other Flexible Options for Your Clients
        </div>
        <div class="col-12 row items-center">
          <div class="col-8 text-title text-grey-8">
            Enable Cash on Delivery?
          </div>
          <div class="col-4 q-gutter-sm">
            <div class="q-gutter-sm">
              <q-radio v-model="cod" :val="true" label="Yes" />
              <q-radio v-model="cod" :val="false" label="No" />
            </div>
          </div>

          <!-- <q-checkbox class="col-1" v-model="cod" /> -->
        </div>
        <!-- <div class="col-12 row items-center">
        <div class="col-11 text-title text-grey-8">
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
        <div class="col-12 text-title text-black text-bold">Others</div>
        <div class="col-12 row items-center">
          <div class="col-8 text-title text-grey-8">
            Enable Gift Wrapping Services?
          </div>
          <div class="col-4 q-gutter-sm">
            <div class="q-gutter-sm">
              <q-radio
                v-model="gift_wrapping_services"
                :val="true"
                label="Yes"
              />
              <q-radio
                v-model="gift_wrapping_services"
                :val="false"
                label="No"
              />
            </div>
          </div>
          <!-- <q-checkbox class="col-1" v-model="gift_wrapping_services" /> -->
          <!-- <GiftWrappingServices v-if="gift_wrapping_services" /> -->
          <q-btn
            flat
            color="grey-8"
            v-if="gift_wrapping_services"
            icon="edit"
            no-caps
            @click="open_giff = true"
            label="Edit Gift Wrap Colors"
            size="md"
          />

          <q-input
            class="col-12 q-pa-sm"
            v-model="gift_wrapping_charge"
            dense
            v-if="gift_wrapping_services"
            label="Gift Wrapping Charges"
            type="number"
          />

          <!-- <q-select
          class="col-12 q-pa-sm"
          v-model="size_classification"
          dense
          v-if="gift_wrapping_services"
          :options="['Small', 'Medium', 'Large', 'Extra Large']"
          label="Size Classification"
        /> -->
          <!-- <q-btn
          flat
          color="grey-8"
          v-if="gift_wrapping_services"
          @click="(opened = true), (toEdit = 'giftwrapping_charges')"
          icon="edit"
          no-caps
          label="Edit giftwrapping charges"
          size="md"
        /> -->
        </div>
        <div class="col-12 row items-center">
          <div class="col-8 text-title text-grey-8">
            Enable Pick-up Item In Store?
          </div>
          <div class="col-4 q-gutter-sm">
            <div class="q-gutter-sm">
              <q-radio v-model="pickup_service" :val="true" label="Yes" />
              <q-radio v-model="pickup_service" :val="false" label="No" />
            </div>
          </div>
          <!-- <q-checkbox class="col-1" v-model="pickup_service" /> -->
          <q-btn
            flat
            color="grey-8"
            v-if="pickup_service"
            icon="edit"
            no-caps
            @click="opened_address = true"
            label="Edit store address"
            size="md"
          />
        </div>

        <div class="col-12 row items-center">
          <div class="col-8 text-title text-grey-8">
            Enable Delivery Services?
          </div>
          <div class="col-4 q-gutter-sm">
            <div class="q-gutter-sm">
              <q-radio v-model="delivery_services" :val="true" label="Yes" />
              <q-radio v-model="delivery_services" :val="false" label="No" />
            </div>
          </div>
          <!-- <q-checkbox class="col-1" v-model="delivery_services" /> -->

          <q-btn
            flat
            color="grey-8"
            v-if="delivery_services"
            icon="edit"
            @click="(opened = true), (toEdit = 'delivery_charges')"
            no-caps
            label="Edit delivery charges"
            size="md"
          />
        </div>
        <div class="col-12 row items-center text-grey-8">
          This item could be delivered within how many days from the date of
          purchase?
          <q-input
            class="q-ma-sm"
            v-model="delivery_period.max"
            type="number"
            max="100"
            style="width:100px"
            dense
            label="Days"
          />
        </div>
      </div>
    </div>
    <q-dialog
      v-model="opened"
      full-height
      full-width
      :maximized="$q.screen.lt.md"
      class="column"
    >
      <q-card style="width: 800px; max-width: 80vw;" class="col-12">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="close"
            @click="(opened = false), (toEdit = '')"
            v-close-popup
          >
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="column">
          <GiftWrappingServices v-if="toEdit == 'giftwrapping_charges'" />
          <Delivery v-if="toEdit == 'delivery_charges'" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="opened_address"
      :maximized="$q.screen.lt.md"
      class="column"
    >
      <q-card style="width: 400px; max-width: 80vw;" class="col-12">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="close"
            @click="(opened_address = false), (toEdit = '')"
            v-close-popup
          >
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form class="row" @submit="saveEditAddress">
            <p class="text-body1 text-grey col-12">Address</p>
            <q-separator class="col-12" />

            <q-select
              label="Region"
              v-model="store.region"
              :options="$regions"
              option-value="designation"
              option-label="designation"
              class="q-pa-md col-12"
              :class="$q.screen.lt.md ? '' : 'col-md-12'"
              input-debounce="0"
              :rules="[
                value =>
                  (typeof value === 'object' &&
                    value !== null &&
                    value.designation &&
                    value.designation.trim() !== '') ||
                  'This Field is required'
              ]"
              lazy-rules
              outlined
              square
              dense
            />

            <q-select
              label="State/Province"
              v-model="store.state_province"
              option-value="name"
              option-label="name"
              :options="provinces"
              class="q-pa-md col-12"
              :class="$q.screen.lt.md ? '' : 'col-md-12'"
              input-debounce="0"
              :rules="[
                value =>
                  (typeof value === 'object' &&
                    value !== null &&
                    value.name &&
                    value.name.trim() !== '') ||
                  'This Field is required'
              ]"
              @filter="filterStateProvince"
              lazy-rules
              outlined
              square
              dense
            />

            <q-input
              label="House/ Building No./ Street"
              v-model="store.house_bldg_st"
              class="q-pa-md col-12"
              :rules="[value => value.trim() != '' || 'This Field is required']"
              lazy-rules
              outlined
              square
              dense
            />
            <q-input
              label="Barangay/ District"
              v-model="store.barangay_district"
              class="q-pa-md col-12"
              :rules="[value => value.trim() != '' || 'This Field is required']"
              lazy-rules
              outlined
              square
              dense
            />
            <q-select
              label="City/Municipality"
              v-model="store.city_municipality"
              :options="municipalities"
              option-value="name"
              option-label="name"
              class="q-pa-md col-12"
              :class="$q.screen.lt.md ? '' : 'col-md-12'"
              input-debounce="0"
              :rules="[
                value =>
                  (typeof value === 'object' &&
                    value !== null &&
                    value.name &&
                    value.name.trim() !== '') ||
                  'This Field is required'
              ]"
              @filter="filterCityMunicipality"
              lazy-rules
              outlined
              square
              dense
            />
            <q-input
              label="Zip Code"
              v-model="store.zip_code"
              class="q-pa-md col-12"
              :rules="[value => value.trim() != '' || 'This Field is required']"
              lazy-rules
              outlined
              square
              dense
            />
            <q-input
              label="Country"
              v-model="store.country"
              class="q-pa-md col-12"
              :rules="[value => value.trim() != '' || 'This Field is required']"
              lazy-rules
              outlined
              square
              dense
              readonly
            />

            <div class="col-12" align="right">
              <q-btn
                label="Save"
                color="primary"
                type="submit"
                no-caps
                ref="btn_save_next"
                :unelevated="isButtonUnelevated"
                :outline="isButtonOutlined"
                @mouseover="
                  isButtonUnelevated = true;
                  isButtonOutlined = false;
                "
                @mouseleave="
                  isButtonUnelevated = false;
                  isButtonOutlined = true;
                "
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="open_giff" :maximized="$q.screen.lt.md" class="column">
      <q-card style="width: 400px; max-width: 80vw;" class="col-12">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="close"
            @click="(opened_address = false), (toEdit = '')"
            v-close-popup
          >
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h5">Colors</div>
          <q-list bordered>
            <q-item v-ripple clickable @click="editColor(0)">
              <q-item-section>
                <span
                  v-bind:style="{
                    'background-color': store.giftwrapping.colors[0]
                  }"
                  style="height: 25px;width: 25px; border-radius: 50%;display: inline-block;"
                />
              </q-item-section>
              <q-item-section>{{
                store.giftwrapping.colors[0]
              }}</q-item-section>
              <q-item-section avatar>
                <q-btn icon="colorize" flat />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item v-ripple clickable @click="editColor(1)">
              <q-item-section>
                <span
                  v-bind:style="{
                    'background-color': store.giftwrapping.colors[1]
                  }"
                  style="height: 25px;width: 25px; border-radius: 50%;display: inline-block;"
                />
              </q-item-section>
              <q-item-section>{{
                store.giftwrapping.colors[1]
              }}</q-item-section>
              <q-item-section avatar>
                <q-btn icon="colorize" flat />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item v-ripple clickable @click="editColor(2)">
              <q-item-section>
                <span
                  v-bind:style="{
                    'background-color': store.giftwrapping.colors[2]
                  }"
                  style="height: 25px;width: 25px; border-radius: 50%;display: inline-block;"
                />
              </q-item-section>
              <q-item-section>{{
                store.giftwrapping.colors[2]
              }}</q-item-section>
              <q-item-section avatar>
                <q-btn icon="colorize" flat />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item v-ripple clickable @click="editColor(3)">
              <q-item-section>
                <span
                  v-bind:style="{
                    'background-color': store.giftwrapping.colors[3]
                  }"
                  style="height: 25px;width: 25px; border-radius: 50%;display: inline-block;"
                />
              </q-item-section>
              <q-item-section>{{
                store.giftwrapping.colors[3]
              }}</q-item-section>
              <q-item-section avatar>
                <q-btn icon="colorize" flat />
              </q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="color_picker">
      <q-card>
        <q-card-section>
          <q-color
            v-model="current_val"
            inline
            no-header
            default-view="palette"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import GiftWrappingServices from "pages/StoreOwner/GiftWrappingServices.vue";
import Delivery from "pages/StoreOwner/Delivery.vue";
import imageCompression from "browser-image-compression";
export default {
  props: ["step", "category"],
  components: {
    GiftWrappingServices,
    Delivery
  },
  // cod
  // gift_wrapping_services
  data() {
    return {
      isButtonUnelevated: false, // New data property
      isButtonOutlined: true, // New data property,
      currentPic: -1,
      category: "",
      category_options: [],
      SKU: "",
      product_name: "",
      description: "",
      regular_price: "",
      temp_regular_price: "",
      sale_price: null,
      temp_sale_price: null,
      stock: "",
      size: [],
      sizeInput: "",
      color: [],
      colorInput: "",
      material: [],
      materialInput: "",
      gift_wrapping_services: false,
      pickup_service: true,
      delivery_services: true,
      cod: false,
      lay_away: true,
      delivery_period: {
        min: 1,
        max: 15
      },
      modelAdd: null,
      gift_wrapping_charge: 0,
      size_classification: "",
      fileSelected: [[], [], [], []],
      photoUrl: ["", "", "", ""],
      validation: [],
      toEdit: "",
      opened: false,
      opened_address: false,
      store: {},
      state_province_options: this.$provinceList,
      sale_price_error: false,
      description_error: false,
      description_error_message: "",
      description_counter: 0,
      open_giff: false,
      provinces: [],
      municipalities: [],
      listMunicipalities: [],
      color_picker: false,
      current_val: "",
      current_color: 0
    };
  },
  methods: {
    addInputValue(refName, modelName) {
      const inputValue = this.$refs[refName].inputValue;
      if (inputValue && !this[modelName].includes(inputValue)) {
        this.$refs[refName].add(inputValue, "add-unique");
      }
    },

    variantInput: function(val, done) {
      done(val[0].toUpperCase() + val.substring(1, val.length));
    },
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

    // refactored by elli

    async save() {
      this.$q.loading.show();

      try {
        const photoPaths = await this.uploadImages(this.fileSelected);
        const expiry = await this.getExpiryDate();
        await this.createProduct(photoPaths, expiry);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.opened = false;
          this.$q.dialog({
            title: "Successfully Saved!",
            message: "You successfully added a product."
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

      if (results.data.length === 0 || results.data[0].status === "Free") {
        return "";
      } else if (results.data[0].status === "Paid") {
        return results.data[0].date_end;
      }
    },

    async createProduct(photoPaths, expiry) {
      const data = {
        sold: 0,
        cancelled: 0,
        off_hand: 0,
        returned: 0,
        gift_wrapped: 0,
        store_id: this.$local.getItem("store_token"),
        category: this.category,
        SKU: this.SKU,
        product_name: this.product_name,
        description: this.description,
        regular_price: +this.temp_regular_price,
        sale_price: +this.temp_sale_price,
        stock: this.stock,
        size: this.size,
        color: this.color,
        material: this.material,
        gift_wrapping_services: this.gift_wrapping_services,
        size_classification: this.size_classification,
        gift_wrapping_charge: +this.gift_wrapping_charge,
        pickup_service: this.pickup_service,
        cod: this.cod,
        lay_away: this.lay_away,
        delivery_services: this.delivery_services,
        delivery_period: this.delivery_period,
        deleted: false,
        photos: photoPaths,
        expiry: expiry,
        logs: [
          {
            event: "added",
            date: new Date(),
            amount: this.stock,
            status: "+"
          }
        ],
        createdAt: new Date()
      };

      await this.$dbCon.service("products").create(data);
    },

    validate: async function() {
      this.validation = [];
      if (this.step == 2) {
        this.validation[0] = await this.$refs.inp_product_name.validate();
        this.validation[1] = await this.$refs.inp_regular_price.validate();
        this.validation[2] = await this.$refs.inp_stock.validate();
        this.validation[3] = await this.$refs.inp_sku.validate();
        this.validation[4] = await this.$refs.qSelectSize.validate();
        this.validation[5] = await this.$refs.qSelectColor.validate();
        this.validation[6] = await this.$refs.qSelectMaterial.validate();
        this.validateDescription();
        if (this.description_error) {
          this.validation[3] = false;
        }
        if (
          parseFloat(this.temp_regular_price) <=
          parseFloat(this.temp_sale_price)
        ) {
          this.sale_price_error = true;
          this.validation[8] = false;
        } else if (parseFloat(this.temp_sale_price) < 1) {
          this.sale_price_error = true;
          this.validation[8] = false;
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

      if (this.step == 4) {
        return false;
      }
    },
    uploadImage: async function(fileSelected) {
      const formData = new FormData();
      formData.append(this.$appLink, fileSelected, fileSelected.name);
      var result = await this.$axios.post(
        this.$appLink + "/uploadProducts",
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
    getData: async function() {
      await this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.$local.getItem("store_token")
          }
        })
        .then(results => {
          this.store = results.data[0];
        });
    },
    filterStateProvince: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.state_province_options = this.$provinceList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    saveEditAddress: async function() {
      this.$q.loading.show();
      try {
        const result = await this.$dbCon
          .service("store")
          .patch(this.store._id, this.store);

        this.opened_address = false;
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.$q.dialog({
            title: "Successfully Saved!",
            message: "Your Store Address has been successfully saved."
          });
          this.$q.loading.hide();
        }, 500);
      }
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
    },

    filterCityMunicipality: function(val, update, abort) {
      if (val === "") {
        update(() => {
          this.municipalities = this.listMunicipalities;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.municipalities = this.listMunicipalities.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterStateProvince: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.state_province_options = this.$provinceList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    editCharge: function(key, currentVal) {
      this.$q
        .dialog({
          title: "Edit Gift Wrapping Charge",
          prompt: {
            model: currentVal,
            type: "text" // optional
          },
          cancel: true
        })
        .onOk(data => {
          this.$q
            .dialog({
              title: "Do you want to continue?",
              message: "Charges apply to all products.",
              cancel: true
            })
            .onOk(() => {
              this.store.giftwrapping.charges[key] = data.trim();
              this.$dbCon
                .service("store")
                .update(this.store._id, this.store)
                .then(() => {
                  this.$q.notify({
                    message: "Successfully Updated!",
                    position: "top-right",
                    color: "primary",
                    timeout: 700,
                    icon: "check"
                  });
                });
            });
        });
    },
    editColor: function(x) {
      this.color_picker = true;
      this.current_color = x;
    }
  },
  watch: {
    step: function() {
      if (this.step == 5) {
        this.save();
      }
    },

    "store.region": {
      handler: function(newVal, oldVal) {
        const listProvince = this.$provinces.filter(
          province => province.region == newVal.designation
        );

        this.provinces = listProvince;
        this.city_municipality = [];
        this.market_areas_option = [];
        this.municipalities = [];
        this.listMunicipalities = [];

        //         provinces
        // municipalities
        // listMunicipalities
      },
      deep: true
    },

    "store.state_province": {
      handler: function(newVal, oldVal) {
        const municipalitiesNewLists = this.$municipalities.filter(
          municipality => municipality.province == newVal.name
        );
        this.municipalities = municipalitiesNewLists;
        this.listMunicipalities = municipalitiesNewLists;
      },
      deep: true
    },

    pickup_service: function(newVal) {
      if (!newVal && !this.delivery_services) {
        this.delivery_services = true; // Enforce one to be true
      }
    },
    delivery_services: function(newVal) {
      if (!newVal && !this.pickup_service) {
        this.pickup_service = true; // Enforce one to be true
      }
    },

    current_val: function() {
      this.store.giftwrapping.colors[this.current_color] = this.current_val;
      this.$dbCon
        .service("store")
        .update(this.store._id, this.store)
        .then(() => {
          this.color_picker = false;
        })
        .then(() => {
          this.$q.notify({
            message: "Successfully Updated!",
            position: "top-right",
            color: "primary",
            timeout: 700,
            icon: "check"
          });
        });
    }
  },
  async mounted() {
    await this.getData();
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });
  }
};
</script>

<style></style>
