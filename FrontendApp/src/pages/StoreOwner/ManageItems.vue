<template>
  <div class="q-pa-sm">
    <!-- <q-breadcrumbs class="text-grey" v-if="$route.path!='/StoreOwner/PublishStore'">
      <q-breadcrumbs-el label="Store" icon="store" />
      <q-breadcrumbs-el label="Inventory" icon="inventory" />
      <q-breadcrumbs-el label="Items" />
    </q-breadcrumbs>
    <br />-->
    <div class="q-pb-md">
      <q-toolbar>
        <div class="full-width row justify-end items-center">
          <div
            class="row items-center"
            :class="$q.screen.lt.md ? 'justify-between col-12' : ''"
          >
            <!-- YOU HAVE REMAINING SLOTS  -->
            <div
              class="row justify-center"
              :class="$q.screen.lt.md ? 'col-8' : ''"
            >
              <p class="text-bold" v-if="maximum_items < 6">
                <br />
                You have {{ maximum_items - data.length }} remaining item slots
              </p>
              <p
                class="text-bold"
                v-else-if="maximum_items == data.length && maximum_items == 5"
              >
                <br />You have consumed your free item slots
              </p>
              <p class="text-bold" v-else>
                <br />
                You have {{ maximum_items - data.length }} remaining item slots
              </p>

              <p><br />&nbsp;({{ data.length }}/{{ maximum_items }})</p>
            </div>
            <!-- BUY MORE SLOT BUTTON -->
            <div
              class="row justify-end"
              :class="$q.screen.lt.md ? 'col-4 q-pt-md' : ''"
            >
              <AddMoreItem ref="buy_slots" itemtype="Products" />
            </div>
          </div>
          <q-input
            v-if="$route.path != '/StoreOwner/PublishStore'"
            :class="$q.screen.lt.md ? 'col-12' : ''"
            square
            filled
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </q-toolbar>
    </div>
    <q-card
      v-if="data.length == 0"
      square
      bordered
      flat
      class="q-ma-sm"
      style="width: 150px; height: 200px"
    >
      <q-btn
        unelevated
        style="width: 100%; height: 100%"
        label="Add an item"
        no-caps
        flat
        stack
        color="grey"
        @click="opened = true"
        icon="add"
        size="md"
      />
    </q-card>

    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      grid
      hide-header
    >
      <template v-slot:item="props">
        <!-- ADD AN ITEM -->
        <q-card
          v-if="props.row.__index == 0"
          square
          bordered
          flat
          class="q-ma-sm"
          :style="
            $q.screen.lt.md
              ? 'width: 45% ; height: 260px'
              : 'width: 250px ; height: 280px'
          "
        >
          <q-btn
            unelevated
            style="width: 100%; height: 100%"
            :label="maximum_items < data.length ? 'Buy slots' : 'Add an item'"
            no-caps
            flat
            stack
            color="grey"
            @click="
              maximum_items < data.length
                ? ($refs.buy_slots.opened = true)
                : (opened = true)
            "
            icon="add"
            size="md"
          />
        </q-card>
        <!-- ITEMS -->
        <q-card
          square
          bordered
          flat
          class="q-ma-sm"
          :style="
            $q.screen.lt.md
              ? 'width: 45% ; height: 260px'
              : 'width: 250px ; height: 280px'
          "
        >
          <div v-show="currentItem != props.row.__index">
            <div
              class="q-pa-xs row justify-between text-caption"
              style="cursor: pointer"
              @click="currentItem = props.row.__index"
            >
              <span>
                On-hand:
                <span class="text-primary">25</span>
              </span>
              <div class="text-primary">Manage</div>
            </div>
            <q-separator />
            <div
              style="cursor: pointer"
              @click="currentItem = props.row.__index"
            >
              <q-img
                :src="props.row.photos[0]"
                :ratio="$q.screen.lt.md ? 4 / 3 : 16 / 9"
              />
              <div class="q-pa-xs">
                <div class="text-right">SKU: {{ props.row.SKU }}</div>
                <div>{{ props.row.item_type }}</div>
                <div>
                  {{ $prettyMoney(props.row.regular_price) }}
                  <small class="text-primary q-pl-sm">
                    <strike>{{ $prettyMoney(props.row.sale_price) }}</strike>
                  </small>
                </div>
              </div>
            </div>
            <q-separator />
            <div align="center">
              <AdvertiseButton
                v-if="$compareToCurrentDate(props.row.expiry) != 'past'"
                :related_id="props.row._id"
                item_type="product"
              />
            </div>
          </div>
          <div v-show="currentItem == props.row.__index">
            <div class="q-pa-xs row text-caption">
              <div>Manage SKU: {{ props.row.SKU }}</div>
              <q-space />
              <q-btn
                flat
                icon="close"
                size="sm"
                dense
                @click="currentItem = null"
              />
            </div>
            <q-separator />
            <div class="q-pa-sm">
              <div
                class="q-mb-sm"
                style="cursor: pointer"
                 @click="current_item_id=props.row._id , $refs.manageproduct.openadjuststock(props.row._id)"
                v-if="props.row.item_type == 'Product'"
              >
                <q-icon
                  name="fa fa-edit"
                  class="text-primary q-mr-sm"
                 
                />Add/Deduct inventory
              </div>
              <div class="q-mb-sm" v-else style="cursor: pointer">
                <q-icon name="fa fa-edit" class="text-primary q-mr-sm" />Booking
                Calendar
              </div>
              <div class="q-mb-sm" style="cursor: pointer" @click="current_item_id=props.row._id , $refs.manageproduct.openeditproduct(props.row._id)">
                <q-icon name="fa fa-edit" class="text-primary q-mr-sm" />Edit
                details
              </div>
              <div class="q-mb-sm" style="cursor: pointer" @click="current_item_id=props.row._id , $refs.manageproduct.deleteProduct(props.row._id)">
                <q-icon name="fa fa-edit" class="text-primary q-mr-sm" />Delete
                item
              </div>
            </div>
            <div class="q-ml-sm">
              <font size="2">
                <table v-if="props.row.item_type == 'Product'">
                  <tr>
                    <td>On-hand</td>
                    <td class="text-primary">25</td>
                  </tr>
                  <tr>
                    <td>Sold</td>
                    <td class="text-primary">1</td>
                  </tr>
                  <tr>
                    <td>Cancelled</td>
                    <td class="text-primary">1</td>
                  </tr>
                  <tr>
                    <td>Returned</td>
                    <td class="text-primary">1</td>
                  </tr>
                  <tr>
                    <td>Gift-wrapped</td>
                    <td class="text-primary">1</td>
                  </tr>
                </table>
                <table v-else>
                  <tr>
                    <td>Available</td>
                    <td class="text-primary">25</td>
                  </tr>
                  <tr>
                    <td>Booked</td>
                    <td class="text-primary">1</td>
                  </tr>
                  <tr>
                    <td>Completed</td>
                    <td class="text-primary">1</td>
                  </tr>
                  <tr>
                    <td>Cancelled</td>
                    <td class="text-primary">1</td>
                  </tr>
                  <tr>
                    <td>Refunded</td>
                    <td class="text-primary">1</td>
                  </tr>
                </table>
              </font>
            </div>
          </div>
        </q-card>
        <!-- <div class="q-pa-xs col-xs-12 col-md-4 col-lg-3">
          <q-card>
            <q-img :src="props.row.photos[0]" style="width:100%;height:150px" />

            <AdvertiseButton
              v-if="$compareToCurrentDate(props.row.expiry)!='past'"
              :related_id="props.row._id"
              item_type="product"
            />
            <q-btn
              label="Expired"
              v-else
              icon="info"
              color="red"
              @click="unavailableMessage"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(300%);"
            />
            <q-separator />
            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label>SKU</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{props.row.SKU}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Name</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label
                    caption
                  >{{props.row.item_type=='Product'?props.row.product_name: props.row.service_name}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Item Type</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{props.row.item_type}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Category</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{props.row.category}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Regular Price</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{props.row.regular_price}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Sale Price</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{props.row.sale_price}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-actions align="around">
              <q-btn
                class="full-width"
                color="primary"
                flat
                label="Manage"
                @click="$router.push('Products/ManageProduct?product='+props.row._id)"
              />
            </q-card-actions>
          </q-card>
        </div>-->
      </template>
    </q-table>
    <q-dialog
      v-model="opened"
      persistent
      :maximized="$q.screen.lt.md"
      full-height
    >
      <q-card style="width: 400px">
        <q-card-section class="row items-center text-grey-10">
          <div class="text-h6" v-if="step == 1">Add an item</div>
          <div class="text-h6" v-if="step != 1">
            Adding {{ category.label }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-breadcrumbs
            separator=">"
            class="text-grey-10 col-12 text-body1 q-pb-md"
            active-color="grey-10"
          >
            <q-breadcrumbs-el
              v-if="step == 1"
              label="Item category"
              icon="dashboard"
            />
            <q-breadcrumbs-el
              v-if="step == 2"
              label="Details"
              icon="description"
            />
            <q-breadcrumbs-el v-if="step == 3" label="Photos" icon="photo" />
            <q-breadcrumbs-el
              v-if="step == 4"
              label="Settings"
              icon="settings"
            />
          </q-breadcrumbs>
          <div v-if="step == 1" class="row justify-center">
            <q-select
              class="col-md-12 col-xs-12 q-pt-sm"
              :class="!$q.screen.lt.md ? 'q-pr-sm' : ''"
              v-model="category"
              :options="category_options"
              label="Choose category"
            />
            <div class="col-12" align="right">
              <AddCategory />
            </div>
          </div>
          <div
            v-if="step != 1 && category.type == 'Product'"
            class="row justify-center"
          >
            <AddProduct
              :step.sync="step"
              ref="item_form"
              :category.sync="category.value"
            />
          </div>
          <div
            v-if="step != 1 && category.type == 'Service'"
            class="row justify-center"
          >
            <AddService
              :step.sync="step"
              ref="item_form"
              :category.sync="category.value"
            />
          </div>
          <div align="right" class="q-pt-md">
            <q-btn
              v-if="step == 1"
              color="primary"
              label="Continue"
              @click="step = 2"
              no-caps
              ref="btn_save_next"
              @mouseover="
                ($refs.btn_save_next.unelevated = true),
                  ($refs.btn_save_next.outline = false)
              "
              @mouseleave="
                ($refs.btn_save_next.outline = true),
                  ($refs.btn_save_next.unelevated = false)
              "
              outline
            />
            <div v-if="step != 1">
              <q-btn
                color="grey"
                label="Back"
                @click="step--"
                no-caps
                ref="btn_back"
                @mouseover="
                  ($refs.btn_back.unelevated = true),
                    ($refs.btn_back.flat = false)
                "
                @mouseleave="
                  ($refs.btn_back.flat = true),
                    ($refs.btn_back.unelevated = false)
                "
                flat
              />
              <q-btn
                class="q-ml-sm"
                color="primary"
                label="Continue"
                @click="step++"
                no-caps
                ref="btn_save_next"
                @mouseover="
                  ($refs.btn_save_next.unelevated = true),
                    ($refs.btn_save_next.outline = false)
                "
                @mouseleave="
                  ($refs.btn_save_next.outline = true),
                    ($refs.btn_save_next.unelevated = false)
                "
                outline
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  <ManageProduct ref="manageproduct"   />
  </div>
</template>

<script>
import AddProduct from "./Inventory/addProduct.vue";
import AddService from "./Inventory/addService.vue";
import AdvertiseButton from "./Inventory/advertiseButton.vue";
import AddMoreItem from "./Inventory/addMoreItem.vue";
import AddCategory from "./Inventory/addCategory.vue";
import ManageProduct from "./Inventory/manageProduct.vue";
export default {
  components: {
    AddProduct,
    AddService,
    AdvertiseButton,
    AddMoreItem,
    AddCategory,
    ManageProduct
  },
  data() {
    return {
      data: [],
      currentItem: null,
      current_item_id: "",
      opened: false,
      manage_item: false,
      filter: "",
      maximum_items: 0,
      step: 1,
      item_type: "",
      category_options: [],
      category: {},
      columns: [
        {
          name: "SKU",
          required: true,
          label: "SKU",
          align: "left",
          field: "SKU",
        },
        {
          name: "product_name",
          required: true,
          label: "Product Name",
          align: "left",
          field: "product_name",
        },
        {
          name: "category",
          align: "center",
          label: "Category",
          field: "category",
        },
        {
          name: "regular_price",
          label: "Regular Price",
          field: "regular_price",
        },
        { name: "sale_price", label: "Sale Price", field: "sale_price" },
        { name: "stock", label: "Stock", field: "stock" },
      ],
    };
  },
  methods: {
    max_items: function () {
      this.$q.dialog({
        title: "Maximum number of Products reached!",
        message:
          "To add more product, you may avail it via Bank Deposit or Layaway",
      });
    },
    getData: async function () {
      var products = await this.$dbCon
        .service("products")
        .find({
          query: {
            store_id: this.$local.getItem("store_token"),
            deleted: false,
          },
        })
        .then((results) => {
          results.data.map((service, index) => {
            results.data[index].item_type = "Product";
          });
          return results.data;
        });

      var services = await this.$dbCon
        .service("services")
        .find({
          query: {
            store_id: this.$local.getItem("store_token"),
            deleted: false,
          },
        })
        .then((results) => {
          results.data.map((service, index) => {
            results.data[index].item_type = "Service";
          });
          return results.data;
        });

      this.data = products.concat(services);
    },
    unavailableMessage: function () {
      this.$q.dialog({
        title: "Unavailable Item",
        message:
          "This item is no longer available due to expired item subscription. You may reactivate this item again by purchasing a subscription.",
      });
    },
  },
  watch: {
    step: async function () {
      //VALIDATION PER STEP
      if (this.step == 2 && this.category.value == undefined) {
        this.step = 1;
        this.$q.dialog({
          title: "Choose Item Category",
          message: "Please choose an Item Category to proceed.",
        });
      }
      if (this.step == 3) {
        if (await this.$refs.item_form.validate()) {
          this.step--;
        }
      }
      if (this.step == 4) {
        if (await this.$refs.item_form.validate()) {
          this.step--;
        }
      }
      if (this.step == 6) {
        this.opened = false;
        this.item_type = "";
        this.step = 1;
      }
    },
    opened: function () {
      if (this.opened == false) {
        this.step = 1;
        this.item_type = "";
      }
    },
  },
  async mounted() {
    this.$EventBus.$on("update-category", (chosen_category) => {
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
              },
            })
            .then((results) => {
              this.category_options = [];
              results.data.map((category) => {
                this.category_options.push({
                  label: category.category_name,
                  value: category.category_name,
                  type: category.classification,
                });
                this.$forceUpdate();
                for (var x = 0; x < this.category_options.length; x++) {
                  if (this.category_options[x].value == chosen_category) {
                    this.category = this.category_options[x];
                  }
                }
              });
            });
        });
    });
    this.$EventBus.$on("update-step", (stp) => {
      this.step = stp;
    });
    this.$dbCon.service("products").onDataChange(() => {
      this.getData();
    });
    this.$dbCon.service("services").onDataChange(() => {
      this.getData();
    });
    this.$dbCon.service("item-subscriptions").onDataChange(() => {
      this.getData();
    });

    await this.$dbCon
      .service("item-subscriptions")
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
        },
      })
      .then((results) => {
        console.log(results);
        var maximum_items = 0;
        results.data.map((sub) => {
          maximum_items += sub.items;
        });
        this.maximum_items = maximum_items;
      });

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
            },
          })
          .then((results) => {
            this.category_options = [];
            results.data.map((category) => {
              this.category_options.push({
                label: category.category_name,
                value: category.category_name,
                type: category.classification,
              });
              this.$forceUpdate();
            });
          });
      });
  },
};
</script>

<style>
</style>
