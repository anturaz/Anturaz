<template>
  <div class="q-pa-md row">
    <!-- <div class="col-12">
      <q-breadcrumbs class="text-grey">
        <q-breadcrumbs-el label="Store" icon="store" />
        <q-breadcrumbs-el label="Inventory" icon="inventory" />
        <q-breadcrumbs-el label="Products" />
        <q-breadcrumbs-el :label="data.product_name" />
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
        @click="$router.push('/StoreOwner/Inventory/Products')"
      />
    </div>
    <div :class="$q.screen.lt.sm ? 'col-12' : 'col-6'">
      <input
        class="hidden"
        type="file"
        ref="fileInput"
        @change="onFileSelected"
      />
      <div style="overflow: hidden; height: 300px">
        <q-img :src="currentPicture">
          <q-btn
            fab
            color="primary"
            icon="edit"
            class="absolute"
            @click="changeCurrentPicture()"
            style="top: 1; right: 12px; transform: translateY(20%)"
          />
        </q-img>
      </div>
      <div class="row">
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden; height: 100px"
          @click="(currentPicture = data.photos[0]), (currentIndexPicture = 0)"
        >
          <q-img :src="data.photos[0]" />
        </q-btn>
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden; height: 100px"
          @click="(currentPicture = data.photos[1]), (currentIndexPicture = 1)"
        >
          <q-img :src="data.photos[1]" />
        </q-btn>
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden; height: 100px"
          @click="(currentPicture = data.photos[2]), (currentIndexPicture = 2)"
        >
          <q-img :src="data.photos[2]" />
        </q-btn>
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden; height: 100px"
          @click="(currentPicture = data.photos[3]), (currentIndexPicture = 3)"
        >
          <q-img :src="data.photos[3]" />
        </q-btn>
      </div>
      <br />

      <q-markup-table flat bordered dense>
        <thead>
          <tr class="text-h5">
            <td class="bg-primary text-white text-bold" colspan="2">
              Current Stock
            </td>
            <td class="bg-primary text-white">{{ data.stock }}</td>
          </tr>
          <tr>
            <td class="bg-primary text-white" colspan="3">Logs</td>
          </tr>
          <tr>
            <td class="text-bold text-left">Date</td>
            <td class="text-bold text-right">Number</td>
            <td class="text-bold text-right">Description</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in data.logs.slice().reverse()" :key="log.date">
            <td class="text-left">{{ $formatDate(log.date) }}</td>
            <td class="text-right">{{ log.status + log.amount }}</td>
            <td class="text-right">{{ log.event }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <div :class="$q.screen.lt.sm ? 'col-12' : 'col-6 q-pl-md'">
      <div class="col-12 row">
        <q-btn
          class="col-4 q-pr-sm"
          outline
          color="primary"
          size="sm"
          dense
          label="Delete Product"
          @click="deleteProduct()"
        />
      </div>
      <br />
      <q-markup-table flat bordered dense>
        <tbody>
          <tr>
            <td class="text-bold">SKU:</td>
            <td class="text-right"></td>
          </tr>
          <tr>
            <td class="text-bold">Product Name:</td>
            <td class="text-right">{{ data.product_name }}</td>
          </tr>
          <tr>
            <td class="text-bold">Category:</td>
            <td class="text-right">{{ data.category }}</td>
          </tr>
          <tr>
            <td class="text-bold">Regular Price:</td>
            <td class="text-right">{{ data.regular_price }}</td>
          </tr>
          <tr>
            <td class="text-bold">Sale Price:</td>
            <td class="text-right">{{ data.sale_price }}</td>
          </tr>
          <tr>
            <td class="text-bold">Size:</td>
            <td class="text-right">
              <q-chip v-for="size in data.size" :key="size" :label="size" />
            </td>
          </tr>
          <tr>
            <td class="text-bold">Color:</td>
            <td class="text-right">
              <q-chip v-for="color in data.color" :key="color" :label="color" />
            </td>
          </tr>
          <tr>
            <td class="text-bold">Material:</td>
            <td class="text-right">
              <q-chip
                v-for="material in data.material"
                :key="material"
                :label="material"
              />
            </td>
          </tr>
          <tr>
            <td class="text-bold">Gift Wrapping Services:</td>
            <td class="text-right">
              {{ data.gift_wrapping_services ? "YES" : "NO" }}
            </td>
          </tr>
          <tr>
            <td class="text-bold">Pickup Service:</td>
            <td class="text-right">{{ data.pickup_service ? "YES" : "NO" }}</td>
          </tr>
          <tr>
            <td class="text-bold">Delivery Period:</td>
            <td class="text-right">
              {{
                data.delivery_period.min +
                "-" +
                data.delivery_period.max +
                " Days"
              }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-card flat bordered>
        <q-card-section>
          <p class="text-bold">Description:</p>
          <div v-html="data.description" />
        </q-card-section>
      </q-card>
    </div> -->
    <!-- ADJUST STOCK -->
    <q-dialog
      v-model="adjuststock"
      persistent
      :maximized="$q.screen.lt.md"
      full-height
    >
      <q-card style="width: 400px">
        <q-card-section class="row items-center text-grey-10">
          <div class="text-h6">Adjust Stock</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-sm">
          <q-input
            square
            outlined
            dense
            stack-label
            label="Stock on Hand"
            v-model="number_of_stock"
            min="1"
            type="number"
          />
          <q-input
            square
            outlined
            dense
            stack-label
            label="Reason for Adjustment"
            v-model="description"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="q-ml-sm"
            color="primary"
            label="Submit"
            @click="saveadjuststock"
            no-caps
            ref="btn_adjust_stock"
            @mouseover="
              ($refs.btn_adjust_stock.unelevated = true),
                ($refs.btn_adjust_stock.outline = false)
            "
            @mouseleave="
              ($refs.btn_adjust_stock.outline = true),
                ($refs.btn_adjust_stock.unelevated = false)
            "
            outline
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- EDIT PRODUCT -->
    <q-dialog v-model="editproduct" persistent :maximized="$q.screen.lt.md">
      <q-card style="width: 80vh">
        <q-card-section class="row items-center text-grey-10">
          <div class="text-h6">Edit Product</div>
          <!-- <div class="text-h6">Edit Product</div> -->
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />
        <q-card-section class="row">
          <q-breadcrumbs
            separator=">"
            class="text-grey-10 col-12 text-body1 q-pb-md"
            active-color="grey-10"
          >
            <q-breadcrumbs-el label="Details" icon="description" />
          </q-breadcrumbs>

          <div class="col-12 row">
            <q-select
              class="col-md-12 col-xs-12 q-pt-sm"
              dense
              stack
              v-model="data.category"
              :options="category_options"
              label="Category"
            />

            <q-input
              class="col-12 q-pt-md"
              v-model="data.SKU"
              dense
              stack
              label="Stock Keeping Unit(SKU)"
              :rules="[val => val.trim() != '' || 'Required']"
            />

            <q-input
              class="col-12 q-pt-sm"
              dense
              stack
              label="Product Name"
              ref="inp_product_name"
              v-model="data.product_name"
              :rules="[val => val.trim() != '' || 'Required']"
              lazy-rules
              counter
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
                min-height="15rem"
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
              class="col-4 q-pt-md q-pr-sm"
              dense
              stack
              label="Regular Price"
              v-model="data.regular_price"
              @focus="toInputRegularPrice"
              @blur="toChangeRegularPrice"
              ref="inp_regular_price"
              :rules="[val => val.trim() != '' || 'Required']"
              lazy-rules
            />
            <q-input
              class="col-4 q-pt-md q-pr-sm"
              dense
              stack
              label="Sale Price"
              @focus="toInputSalePrice"
              @blur="toChangeSalePrice"
              v-model="data.sale_price"
              :rules="[]"
              lazy-rules
            />

            <q-input
              class="col-4 q-pt-md"
              dense
              stack
              label="Stock On Hand"
              v-model="data.stock"
              ref="inp_stock"
              :rules="[val => val.trim() != '' || 'Required']"
              lazy-rules
            />
          </div>

          <p class="text-title text-black col-12">
            <span class="">Variant</span>
          </p>

          <!-- <q-select
            label="Size"
            class="col-12 q-pt-md"
            dense
            stack
            v-model="data.size"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
          /> -->

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
            :rules="[val => data.size.length != 0 || 'Required']"
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
            v-model="data.color"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="100"
            new-value-mode="add-unique"
            :rules="[val => data.color.length != 0 || 'Required']"
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
            v-model="data.material"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="100"
            new-value-mode="add-unique"
            :rules="[val => data.material.length != 0 || 'Required']"
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
        </q-card-section>

        <q-card-section class="row ">
          <p class="col-6 text-title text-bold text-grey">
            Enable Gift Wrapping Services?
          </p>

          <q-btn-toggle
            class="col-6"
            spread
            value="one"
            style="border: 1px solid grey"
            no-caps
            rounded
            unelevated
            :toggle-color="data.gift_wrapping_services ? 'primary' : 'grey'"
            color="white"
            text-color="grey"
            v-model="data.gift_wrapping_services"
            :options="[
              { label: 'Yes', value: true },
              { label: 'No', value: false }
            ]"
          />

          <q-input
            class="col-12  q-pr-sm"
            dense
            stack
            label="Gift wrapping charge"
            v-model="data.gift_wrapping_charge"
            @focus="toInputGiftCharge"
            @blur="toChangeGiftCharge"
            v-if="data.gift_wrapping_services"
            lazy-rules
          />
        </q-card-section>

        <q-card-section class="row">
          <p class="col-6 text-title text-bold text-grey">
            Enable Pick-up Item In Store?
          </p>

          <q-btn-toggle
            class="col-6"
            spread
            value="one"
            style="border: 1px solid grey"
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

        <q-card-section class="row">
          <p class="col-6 text-title text-bold text-grey">
            Enable Cash in Delivery?
          </p>

          <q-btn-toggle
            class="col-6"
            spread
            value="one"
            style="border: 1px solid grey"
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

        <q-card-section class="row">
          <p class="col-6 text-title text-bold text-grey">
            Enable Delivery Services?
          </p>

          <q-btn-toggle
            class="col-6"
            spread
            value="one"
            style="border: 1px solid grey"
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
          <div class="col-12 text-grey">
            Delivery Period (From {{ data.delivery_period.min }} days to
            {{ data.delivery_period.max }} days):

            <div class="row">
              <q-input
                class="col-12  q-pr-sm"
                dense
                stack
                label="Max"
                v-model="data.delivery_period.max"
                lazy-rules
                type="number"
                :rules="[
                  val => data.delivery_period.max.length != 0 || 'Required'
                ]"
              />
            </div>

            <!-- <q-range
              v-model="data.delivery_period"
              color="grey"
              label
              markers
              :min="1"
              :max="15"
            /> -->
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <!-- <q-btn
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
          /> -->
          <q-btn
            class="q-ml-sm"
            color="primary"
            label="Save"
            @click="save"
            no-caps
            ref="btn_edit"
            :unelevated="btnEditUnelevated"
            :outline="btnEditOutline"
            @mouseover="onMouseOver"
            @mouseleave="onMouseLeave"
            outline
          />
        </q-card-actions>
      </q-card>

      <!-- <q-card style="width: 400px">
        <q-card-section class="row items-center text-grey-10">
          <div class="text-h6">Edit Product</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section class="row">
          <div class="col-12 row">
            <q-select
              class="col-12"
              dense
              square
              outlined
              v-model="data.category"
              :options="category_options"
              label="Category"
            />

            <q-input
              class="col-12 q-pt-sm"
              square
              outlined
              dense
              stack
              v-model="data.stock"
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
          <div class="col-12 q-gutter-sm row">
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
            <q-select
              class="col-12 q-pt-sm"
              dense
              square
              outlined
              v-model="data.size_classification"
              :options="gift_wrapping_size_classification"
              label="Gift Wrapping Size"
            />

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
                    style="border: 1px solid grey"
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
                    style="border: 1px solid grey"
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
                    style="border: 1px solid grey"
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
                    style="border: 1px solid grey"
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
                  style="border: 1px solid grey"
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
      </q-card> -->
    </q-dialog>
  </div>
</template>

<script>
import AdjustStock from "./adjustStock.vue";
import EditProduct from "./editProduct.vue";
export default {
  props: ["product_id"],
  components: {
    AdjustStock,
    EditProduct
  },
  data() {
    return {
      data: {},
      adjuststock: false,
      number_of_stock: 0,
      editproduct: false,
      currentPicture: "",
      currentIndexPicture: 0,
      fileSelected: {},
      temp_regular_price: "",
      temp_sale_price: "",
      temp_gift_charge: "",
      description: "",
      gift_wrapping_size_classification: [
        "Small",
        "Medium",
        "Large",
        "Extra Large"
      ],
      description_error: false,
      description_error_message: "",
      description_counter: 0,
      category_options: [],
      btnEditOutline: true,
      btnEditUnelevated: false
    };
  },
  watch: {
    "data.pickup_service": function(newVal) {
      if (!newVal && !this.data.delivery_services) {
        this.data.delivery_services = true; // Enforce one to be true
      }
    },
    "data.delivery_services": function(newVal) {
      if (!newVal && !this.data.pickup_service) {
        this.data.pickup_service = true; // Enforce one to be true
      }
    }
  },
  methods: {
    addInputValue(refName, modelName) {
      const inputValue = this.$refs[refName].inputValue;
      if (inputValue && !this.data[modelName].includes(inputValue)) {
        this.data[modelName].push(inputValue);
        // this.$refs[refName].add(inputValue, "add-unique");
      }
    },

    onMouseOver() {
      this.btnEditUnelevated = true;
      this.btnEditOutline = false;
    },
    onMouseLeave() {
      this.btnEditOutline = true;
      this.btnEditUnelevated = false;
    },
    onImageSelected0(event) {
      Array.from(event.target.files).map((file, index) => {
        this.photoUrl[index] = URL.createObjectURL(event.target.files[index]);
        this.$forceUpdate();
        this.fileSelected[index] = event.target.files[index];
        this.$forceUpdate();
      });
    },
    onImageSelected0: function(event) {
      Array.from(event.target.files).map((file, index) => {
        this.photoUrl[index] = URL.createObjectURL(event.target.files[index]);
        this.$forceUpdate();
        this.fileSelected[index] = event.target.files[index];
        this.$forceUpdate();
      });
    },

    validateForm: function() {
      let errors = [];

      if (this.data.stock <= 0 || this.data.stock === "") {
        errors.push("Stock on Hand must be greater than zero.");
      }
      const text = this.data.description
        .replace(/<br\s*\/?>|&nbsp;|\s+/g, "")
        .trim();
      this.description_error = text === "";
      this.description_error_message = this.description_error
        ? "Description is required."
        : "";

      if (!this.data.SKU.trim()) errors.push("SKU is required.");
      if (!this.data.product_name.trim())
        errors.push("Product Name is required.");

      if (!this.data.regular_price.trim())
        errors.push("Regular Price is required.");

      if (!this.data.sale_price.trim())
        errors.push("Regular Price is required.");
      if (!this.data.color || this.data.color.length === 0) {
        errors.push("At least one Color is required.");
      }

      if (!this.data.size || this.data.size.length === 0) {
        errors.push("At least one Size is required.");
      }

      if (!this.data.material || this.data.material.length === 0) {
        errors.push("At least one Material is required.");
      }

      if (!this.data.material || this.data.material.length === 0) {
        errors.push("At least one Material is required.");
      }
      if (
        !this.data.delivery_period.max ||
        this.data.delivery_period.max === 0
      ) {
        errors.push("Delivery period must be greater than 0.");
      }

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

    // Elli Updates
    save: async function() {
      if (!this.validateForm()) return;

      // this.$parent.data = this.data;

      this.data.regular_price = +this.temp_regular_price;
      this.data.sale_price = +this.temp_sale_price;
      this.data.gift_wrapping_charge = +this.temp_gift_charge;

      // this.$parent.data = this.data;
      this.$dbCon
        .service("products")
        .patch(this.data._id, this.data)
        .then(() => {
          this.$q
            .dialog({
              title: "Success!",
              message: "You successfully updated a product.",
              persistent: true
            })
            .onOk(() => {
              this.editproduct = false;
            });
        });
    },

    // --

    openadjuststock: async function(productId) {
      await this.getData(productId);
      this.number_of_stock = this.data.stock;
      this.adjuststock = true;
    },
    saveadjuststock: async function() {
      var add = this.number_of_stock >= this.data.stock;
      var amount = add
        ? this.number_of_stock - this.data.stock
        : this.data.stock - this.number_of_stock;
      this.data.stock = this.number_of_stock;
      await this.data.logs.push({
        event: this.description,
        date: new Date(),
        amount: amount,
        status: add ? "+" : "-"
      });
      this.$dbCon
        .service("products")
        .patch(this.data._id, this.data)
        .then(() => {
          this.$q
            .dialog({
              title: "Success!",
              message: "You successfully updated the inventory."
            })
            .onOk(() => {
              this.adjuststock = false;
            });
          this.$dbCon
            .service("store")
            .find({
              query: {
                _id: this.$local.getItem("store_token")
              }
            })
            .then(result => {
              //     this.$axios.post(this.$appLink + "/customizableEmail", {
              //       receiver: result.data[0].email,
              //       subject: "Stock Adjustment",
              //       message: `<h3>Stock Adjustment</h3>
              // <p>Your stock has been adjusted!</p>
              // `
              //     });
            });
        });
    },
    openeditproduct: async function(productId) {
      this.getData(productId).then(() => {
        this.editproduct = true;
        this.data.regular_price = this.$prettyMoney(this.data.regular_price);
        this.data.sale_price = this.$prettyMoney(this.data.sale_price);
        this.data.gift_wrapping_charge = this.$prettyMoney(
          !this.data.gift_wrapping_charge ? 0 : this.data.gift_wrapping_charge
        );
      });
      // this.editproduct = true;
      // console.log(this.data.regular_price);
    },

    deleteProduct: function(productId) {
      console.log("delete product");

      this.getData(productId);
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Do you really want to delete this product? if yes Enter your password",
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
            this.$dbCon.service("products").patch(this.data._id, this.data);
            this.$q.dialog({
              title: "Success!",
              message: "You have successfully deleted a product."
            });
            if (this.$route.fullPath == "/StoreOwner/PublishStore")
              this.$router.push("/StoreOwner/PublishStore");
            else this.$router.push("/StoreOwner/Inventory/Products");
          } catch (e) {
            console.log(e);
          }
          this.$q.loading.hide();
        });
    },
    // deleteProduct: function(productId) {
    //   this.getData(productId);
    //   this.$q
    //     .dialog({
    //       title: "Confirmation",
    //       message: "Do you really want to delete this product?",
    //       cancel: {
    //         push: true,
    //         color: "grey",
    //         flat: true
    //       }
    //     })
    //     .onOk(() => {
    //       this.$q
    //         .dialog({
    //           title: "Confirmation",
    //           message: "Enter your password",
    //           prompt: {
    //             model: "",
    //             type: "password" // optional
    //           },
    //           cancel: true,
    //           persistent: true
    //         })
    //         .onOk(data => {
    //           this.$dbCon
    //             .service("store")
    //             .find({
    //               query: {
    //                 _id: this.$local.getItem("store_token")
    //               }
    //             })
    //             .then(result => {
    //               if (result.data[0].password == data) {
    //                 this.data.deleted = true;
    //                 this.$dbCon
    //                   .service("products")
    //                   .patch(this.data._id, this.data)
    //                   .then(() => {
    //                     this.$dbCon
    //                       .service("store")
    //                       .find({
    //                         query: {
    //                           _id: this.$local.getItem("store_token")
    //                         }
    //                       })
    //                       .then(result => {
    //                         this.$axios.post(
    //                           this.$appLink + "/customizableEmail",
    //                           {
    //                             receiver: result.data[0].email,
    //                             subject: "Deleted Product",
    //                             message: `<h3>Deleted Product</h3>
    //               <p>Your product has been deleted!</p>
    //               `
    //                           }
    //                         );
    //                       });
    //                     this.$q.dialog({
    //                       title: "Success!",
    //                       message: "You have successfully deleted a product."
    //                     });
    //                     // this.$router.push("/StoreOwner/Inventory/Products");
    //                   });
    //               } else {
    //                 this.$q.dialog({
    //                   title: "Error!",
    //                   message:
    //                     "Unable to delete product. You have entered wrong password",
    //                   cancel: {
    //                     push: true,
    //                     color: "grey",
    //                     flat: true
    //                   }
    //                 });
    //               }
    //             });
    //         });
    //     });
    // },
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
        .service("products")
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
        this.$appLink + "/uploadProducts",
        formData
      );
      return result.data;
    },
    getData: async function(productId) {
      // console.log("product id: ", productId);
      await this.$dbCon
        .service("products")
        .find({
          query: {
            _id: productId,
            store_id: this.$local.getItem("store_token")
          }
        })
        .then(async result => {
          if (result.data.length == 0) {
            // this.$router.push("/StoreOwner/Inventory");
          } else {
            const product = result.data[0];

            if (!product.hasOwnProperty("gift_wrapping_charge")) {
              product.gift_wrapping_charge = 0;
              await this.$dbCon
                .service("products")
                .patch(productId, product)
                .then(res => {
                  this.data.gift_wrapping_charge = res.gift_wrapping_charge;
                });
            }

            this.data = product;
            this.temp_regular_price = product.regular_price;
            this.temp_sale_price = product.sale_price;
            this.currentPicture = product.photos[0];
          }
        });
    },
    toInputRegularPrice() {
      this.temp_regular_price = this.data.regular_price;
    },
    toChangeRegularPrice() {
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

    toInputGiftCharge() {
      this.temp_gift_charge = this.data.gift_wrapping_charge;
    },
    toInputDeliveryDate() {
      this.temp_delivery_period = this.data.delivery_period;
    },

    toChangeGiftCharge() {
      this.temp_gift_charge = this.data.gift_wrapping_charge;
      this.data.gift_wrapping_charge = this.$prettyMoney(
        this.data.gift_wrapping_charge
      );
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
    //  this.getData();
    // this.$dbCon.service("products").onDataChange(() => {
    //   this.getData();
    // });
  }
};
</script>

<style></style>
