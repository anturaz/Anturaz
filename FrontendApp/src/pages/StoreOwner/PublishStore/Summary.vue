<template>
  <div class="row">
    <div class="col-12 row justify-center text-h5 text-primary">Your store is ready to go online</div>
    <q-separator class="q-ma-md col-12" />
    <div class="col-md-3 col-xs-12" align="center">
      <img :src="store.logo" style="width:200px;height:200px;" />
      <a :href="'/#/store/'+store.unique_link" target="_blank">
        <q-btn
          label="View Online Store"
          flat
          color="primary"
          ref="btn_view"
          @mouseover="$refs.btn_view.unelevated=true, $refs.btn_view.flat=false"
          @mouseleave="$refs.btn_view.flat=true,$refs.btn_view.unelevated=false"
        />
      </a>
    </div>
    <q-form class="col-md-9 col-xs-12 q-pb-md" @submit="save" @reset="back">
      <q-input
        label="Store Name"
        v-model="store.store_name"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
      />
      <q-input
        label="Store Unique Link"
        v-model="store.unique_link"
        prefix="www.anturaz.com/store/"
        :rules="[ value => value.trim() !='' || 'This Field is required' ]"
        class="q-mb-sm"
        :hint="'suggestion: www.anturaz.com/store/'+store.store_name.toLowerCase().split(' ').join('-')"
        lazy-rules
      />
      <q-select
        v-model="store.categories"
        :rules="[ () =>  store.categories.length!=0 || 'This Field is required' ]"
        class="col-xs-12 q-mb-md"
        lazy-rules
        use-chips
        use-input
        multiple
        fill-input
        input-debounce="0"
        @filter="filterCategories"
        :options="categories_option"
        label="Categories"
        @focus="()=>{categories_done=true}"
        @blur="()=>{categories_done=false}"
        ref="categories"
        hint="You may select one or multiple"
        :placeholder="!categories_done?'': 'search..'"
        dense
      >
        <template v-slot:append>
          <q-item>
            <q-item-section class="text-grey">
              <q-btn
                label="done"
                unelevated
                color="primary"
                v-show="$q.screen.lt.md && categories_done"
                v-close-popup
              />
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        v-model="store.market_areas"
        use-chips
        use-input
        multiple
        fill-input
        class="col-xs-12 q-mb-md"
        :rules="[ () =>  store.market_areas.length !=0 || 'This Field is required' ]"
        lazy-rules
        input-debounce="0"
        :options="market_areas_option"
        @filter="filterMarketPlace"
        label="Market Areas"
        @focus="()=>{market_areas_done=true}"
        @blur="()=>{market_areas_done=false}"
        :placeholder="!market_areas_done?'': 'search..'"
        hint="You may select one or multiple"
        dense
      >
        <template v-slot:append>
          <q-item>
            <q-item-section class="text-grey">
              <q-btn
                label="done"
                unelevated
                color="primary"
                ref="market_areas_done"
                v-show="$q.screen.lt.md && market_areas_done"
                v-close-popup
              />
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input
        label="Owner's First Name"
        v-model="user.fname"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
      />
      <q-input
        label="Owner's Last Name"
        v-model="user.lname"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
      />
      <q-input
        label="Mobile Number"
        v-model="store.mobile_number"
        class="col-md-6 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
        mask="9## ### ####"
        unmasked-value
        prefix="(+63)"
      >
        <template v-slot:before>
          <q-avatar>
            <img
              src="https://cdn4.iconfinder.com/data/icons/world-flags-circular/1000/Flag_of_The_Philippines_-_Circle-512.png"
            />
          </q-avatar>
        </template>
      </q-input>
      <q-input
        label="Landline Number"
        v-model="store.landline_number"
        class="col-md-6 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        dense
        mask="(##) #### ####"
        unmasked-value
      />
      <!-- <q-separator class="col-12" /> -->
      <q-input
        label="House/ Building No./ Street"
        v-model="store.house_bldg_st"
        class="col-md-6 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
      />
      <q-input
        label="Barangay/ District"
        v-model="store.barangay_district"
        class="col-md-6 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
      />
      <q-input
        label="City/Municipality"
        v-model="store.city_municipality"
        class="col-md-6 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
      />
      <q-select
        label="State/Province"
        v-model="store.state_province"
        :options="state_province_options"
        class="col-md-6 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        input-debounce="0"
        @filter="filterStateProvince"
        use-input
        fill-input
        dense
      />
      <q-input
        label="Zip Code"
        v-model="store.zip_code"
        class="col-md-6 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
      />
      <q-select
        label="Country"
        v-model="store.country"
        :options="country_options"
        class="col-md-6 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
        disable
      />

      <!-- <q-separator class="col-12" /> -->
      <q-select
        label="Bank Name"
        v-model="store.bank_name"
        :options="bank_options"
        class="col-md-4 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        input-debounce="0"
        @filter="filterBank"
        use-input
        fill-input
        lazy-rules
        dense
      />
      <q-input
        label="Account Name"
        v-model="store.account_name"
        class="col-md-4 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
      />
      <q-input
        label="Account Number"
        v-model="store.account_number"
        class="col-md-4 col-xs-12"
        :class="$q.screen.lt.md?'': 'q-pa-sm'"
        :rules="[ value =>  value.trim() !='' || 'This Field is required' ]"
        lazy-rules
        dense
      />
      <div align="right" class="q-pt-lg">
        <q-btn
          label="Back"
          type="reset"
          color="grey"
          class="q-mr-sm"
          no-caps
          ref="btn_back"
          @mouseover="$refs.btn_back.unelevated=true, $refs.btn_back.flat=false"
          @mouseleave="$refs.btn_back.flat=true,$refs.btn_back.unelevated=false"
          flat
        />
    
        <q-btn label="Go Online" @click="save" color="primary" type="submit" />
      </div>
     
    </q-form>
  </div>
</template>

<script>
import { provinceList } from "../../../data-set/province.js";
export default {
  data() {
    return {
      store: {},
      user: {},
      market_areas_option: [],
      categories_option: [],
      categories_list: [],
      market_areas_done: false,
      categories_done: false,
      bank_options: this.$bankList,
      state_province_options: this.$provinceList,
      country_options: this.$countryList,
      edit_mode: false,
    };
  },
  methods: {
    filterStateProvince: function (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.state_province_options = this.$provinceList.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterBank: function (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.bank_options = this.$bankList.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterMarketPlace: function (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.market_areas_option = provinceList.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterCategories: function (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.categories_option = this.categories_list.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    save: async function () {
      if (this.edit_mode == true) {
        this.edit_mode = false;
        await this.$dbCon.service("store").patch(this.store._id, this.store);
        await this.$dbCon.service("users").patch(this.user._id, this.user);
        await this.$forceUpdate();
        this.$q.dialog({
          title: "Saved!",
          message: "Your store details is now updated.",
        });
        return;
      }
      this.store.current_step = -1;
      await this.$dbCon.service("store").patch(this.store._id, this.store);

      await this.$forceUpdate();
    },
    back: async function () {
      if (this.edit_mode == true) {
        this.getData();
        this.edit_mode = false;
        return;
      }
      this.store.current_step = 5;
      await this.$dbCon.service("store").patch(this.store._id, this.store);
      await this.$forceUpdate();
    },
    getData: async function () {
      await this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.$local.getItem("store_token"),
          },
        })
        .then((results) => {
          this.store = results.data[0];
          this.photoUrl = this.store.logo;
          console.log(this.store);
        });
      this.user = await this.$getUser();
    },
  },
  mounted() {
    this.market_areas_option = provinceList;
    this.$dbCon
      .service("categories")
      .find({
        query: {
          $select: ["category_name"],
        },
      })
      .then((results) => {
        results.data.map((category) => {
          this.categories_option.push(category.category_name);
          this.categories_list.push(category.category_name);
        });
      });
    this.$dbCon.service("store").onDataChange(() => {
      this.getData();
    });
  },
};
</script>

<style>
</style>