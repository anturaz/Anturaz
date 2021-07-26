<template>
  <div class="row">
    <q-btn
      class="col-11"
      @click="opened=true"
      outline
      color="primary"
      size="sm"
      dense
      label="Edit Service"
    />
    <div class="col-1" />
    <q-dialog v-model="opened">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center bg-primary text-white">
          <div class="text-h6">Edit Service</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="row">
          <div class="col-12">
            <br />
          </div>
          <div class="col-12 row">
            <q-select
              class="col-6 q-pr-sm"
              dense
              square
              outlined
              v-model="data.category"
              :options="category_options"
              label="Category"
            />
            <q-input class="col-6" square outlined dense stack label="Stock Keeping Unit(SKU)" />
            <q-input
              class="col-12 q-pt-sm"
              square
              outlined
              dense
              stack
              label="Service Name"
              ref="inp_service_name"
              v-model="data.service_name"
              :rules="[ val => val.trim()!='' || 'Required']"
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
              :rules="[ val => val.trim()!='' || 'Required']"
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
                val =>  parseFloat(data.regular_price)> parseFloat(data.sale_price)  || 'Invalid Sale Price',
              ]"
              lazy-rules
            />
          </div>
           <div class="col-12 q-pt-sm" />
            <q-card class="col-6" flat bordered>
              <q-card-section class="row">
                <p class="col-12 text-title text-bold text-grey">Enable Cash on Fulfillment?</p>
                <q-btn-toggle
                  class="col-12"
                  spread
                  value="one"
                  style="border:1px solid grey"
                  no-caps
                  rounded
                  unelevated
                  :toggle-color="data.cof? 'primary': 'grey'"
                  color="white"
                  text-color="grey"
                  v-model="data.cof"
                  :options="[
                                {label: 'Yes', value: true},
                                {label: 'No', value: false}
                            ]"
                />
              </q-card-section>
            </q-card>
             <q-card class="col-6" flat bordered>
              <q-card-section class="row">
                <p class="col-12 text-title text-bold text-grey">Enable Lay-away?</p>
                <q-btn-toggle
                  class="col-12"
                  spread
                  value="one"
                  style="border:1px solid grey"
                  no-caps
                  rounded
                  unelevated
                  :toggle-color="data.lay_away? 'primary': 'grey'"
                  color="white"
                  text-color="grey"
                  v-model="data.lay_away"
                  :options="[
                                {label: 'Yes', value: true},
                                {label: 'No', value: false}
                            ]"
                />
              </q-card-section>
            </q-card>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn unelevated label="Save" @click="save" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      data: {},
      category_options: [],
      temp_regular_price: "",
      temp_sale_price: ""
    };
  },
  methods: {
    openModal: function(){
      this.opened=true
    },
    save: async function() {
      var toSubmit = !(await this.validate());
      if (toSubmit) {
        this.$parent.data = this.data;
        this.$dbCon
          .service("services")
          .patch(this.data._id, this.data)
          .then(() => {
            this.$q
              .dialog({
                title: "Success!",
                message: "You successfully updated a service.",
                cancel: {
                  push: true,
                  color: "grey",
                  flat: true
                },
                persistent: true
              })
              .onOk(() => {
                this.opened=false
              });
          });
      }
    },
    validate: async function() {
      var validation = [];
      validation[0] = await this.$refs.inp_service_name.validate();
      validation[2] = await this.$refs.inp_regular_price.validate();
      return validation.includes(false);
    },
    toInputRegularPrice: function() {
      this.temp_regular_price = this.data.regular_price;
    },
    toChangeRegularPrice: function() {
      this.data.regular_price = this.temp_regular_price;
      this.temp_regular_price = this.$prettyMoney(
        parseFloat(this.temp_regular_price)
      );
    },
    toInputSalePrice: function() {
      this.temp_sale_price = this.data.sale_price;
    },
    toChangeSalePrice: function() {
      this.data.sale_price = this.temp_sale_price;
      this.temp_sale_price = this.$prettyMoney(
        parseFloat(this.temp_sale_price)
      );
    }
  },
  mounted() {
    this.data = _.cloneDeep(this.$parent.data);
    this.temp_regular_price = this.$prettyMoney(
      parseFloat(this.data.regular_price)
    );
    this.temp_sale_price = this.$prettyMoney(parseFloat(this.data.sale_price));
    this.$dbCon
      .service("categories")
      .find({
        query: {
          classification: "Service"
        }
      })
      .then(results => {
        results.data.map(category => {
          this.category_options.push(category.category_name);
        });
      });
  }
};
</script>

<style>
</style>
