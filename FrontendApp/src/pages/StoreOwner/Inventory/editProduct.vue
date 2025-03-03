<template>
  <div class="row">
    <q-btn
      class="col-11"
      @click="opened = true"
      outline
      color="primary"
      size="sm"
      dense
      label="Edit Product"
    />
    <div class="col-1" />
    <q-dialog v-model="opened">
      <q-card style="width: 1200px; max-width: 80vw;">
        <q-card-section class="row bg-primary text-white">
          <div class="text-h6">Edit Product</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="row">
          <div class="col-12">
            <br />
          </div>
          <div class="col-7 row">
            <q-select
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
              label="Product Name"
              ref="inp_product_name"
              v-model="data.product_name"
              :rules="[val => val.trim() != '' || 'Required']"
              lazy-rules
              counter
            />
            <p class="text-caption text-grey">Description:</p>
            <q-editor
              class="col-12 q-pt-sm"
              v-model="data.description"
              min-height="15rem"
              ref="inp_description"
            />
            <q-input
              class="col-4 q-pt-sm q-pr-sm"
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
              class="col-4 q-pt-sm q-pr-sm"
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
            <q-input
              class="col-4 q-pt-sm"
              square
              outlined
              dense
              stack
              label="Stock On Hand"
              v-model="data.stock"
              ref="inp_stock"
              :rules="[val => val.trim() != '' || 'Required']"
              lazy-rules
            />
          </div>
          <div class="col-5 q-pl-md q-gutter-sm row">
            <q-card class="col-12" flat bordered>
              <q-card-section>
                <p class="text-title text-bold text-grey">Variant</p>
                <q-select
                  label="Size"
                  class="col-12 q-pt-sm"
                  square
                  outlined
                  dense
                  stack
                  v-model="data.size"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />

                <q-select
                  ref="qSelectSize"
                  class="col-12"
                  label="Size"
                  dense
                  stack
                  v-model="data.size"
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
                  label="Color"
                  class="col-12 q-pt-sm"
                  square
                  outlined
                  dense
                  stack
                  v-model="data.color"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />
                <q-select
                  label="Material"
                  class="col-12 q-pt-sm"
                  square
                  outlined
                  dense
                  stack
                  v-model="data.material"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />
              </q-card-section>
            </q-card>
            <div class="row col-12">
              <q-card class="col-md-6 col-sm-12" flat bordered>
                <q-card-section class="row">
                  <p class="col-12 text-title text-bold text-grey">
                    Enable Gift Wrapping Services?
                  </p>

                  <q-btn-toggle
                    class="col-12"
                    spread
                    value="one"
                    style="border:1px solid grey"
                    no-caps
                    rounded
                    unelevated
                    :toggle-color="
                      data.gift_wrapping_services ? 'primary' : 'grey'
                    "
                    color="white"
                    text-color="grey"
                    v-model="data.gift_wrapping_services"
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
                    Enable Pick-up Item In Store?
                  </p>

                  <q-btn-toggle
                    class="col-12"
                    spread
                    value="one"
                    style="border:1px solid grey"
                    no-caps
                    rounded
                    unelevated
                    :toggle-color="data.pickup_service ? 'primary' : 'grey'"
                    color="white"
                    text-color="grey"
                    v-model="data.pickup_service"
                    :options="[
                      { label: 'Yes', value: true },
                      { label: 'No', value: false }
                    ]"
                  />
                </q-card-section>
              </q-card>
            </div>
            <div class="row">
              <q-card class="col-md-6 col-sm-12" flat bordered>
                <q-card-section class="row">
                  <p class="col-12 text-title text-bold text-grey">
                    Enable Cash in Delivery?
                  </p>

                  <q-btn-toggle
                    class="col-12"
                    spread
                    value="one"
                    style="border:1px solid grey"
                    no-caps
                    rounded
                    unelevated
                    :toggle-color="data.cod ? 'primary' : 'grey'"
                    color="white"
                    text-color="grey"
                    v-model="data.cod"
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
                  />
                </q-card-section>
              </q-card>
            </div>
            <q-card class="col-12" flat bordered>
              <q-card-section class="row">
                <p class="col-6 text-title text-bold text-grey">
                  Enable Delivery Services?
                </p>

                <q-btn-toggle
                  class="col-6"
                  spread
                  value="one"
                  style="border:1px solid grey"
                  no-caps
                  rounded
                  unelevated
                  :toggle-color="data.delivery_services ? 'primary' : 'grey'"
                  color="white"
                  text-color="grey"
                  v-model="data.delivery_services"
                  :options="[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false }
                  ]"
                />
                <div
                  v-if="data.delivery_services == true"
                  class="col-12 text-grey"
                >
                  Delivery Period (From {{ data.delivery_period.min }} days to
                  {{ data.delivery_period.max }} days):
                  <q-range
                    v-model="data.delivery_period"
                    color="grey"
                    label
                    markers
                    :min="1"
                    :max="15"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
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
    addInputValue(refName, modelName) {
      const inputValue = this.$refs[refName].inputValue;
      if (inputValue && !this[modelName].includes(inputValue)) {
        this.$refs[refName].add(inputValue, "add-unique");
      }
    },

    openModal: function() {
      this.opened = true;
    },
    save: async function() {
      var toSubmit = !(await this.validate());
      if (toSubmit) {
        this.$parent.data = this.data;
        this.$dbCon
          .service("products")
          .patch(this.data._id, this.data)
          .then(() => {
            this.$q
              .dialog({
                title: "Success!",
                message: "You successfully added a product.",
                persistent: true
              })
              .onOk(() => {
                this.opened = false;
              });
          });
      }
    },
    validate: async function() {
      var validation = [];
      validation[0] = await this.$refs.inp_product_name.validate();
      validation[2] = await this.$refs.inp_regular_price.validate();
      validation[3] = await this.$refs.inp_stock.validate();
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
          classification: "Product"
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

<style></style>
