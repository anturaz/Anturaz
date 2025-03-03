<template>
  <div class="q-pa-lg row">
    <div class="col-12 q-pb-xl">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Gift Registry" icon="card_giftcard" />
        <q-breadcrumbs-el :label="data.event_name" />
      </q-breadcrumbs>
      <q-separator />
    </div>
    <div
      class="col-xs-12 col-md-2 col-sm-12 column  flex flex-col items-center justify-center"
      :class="$q.screen.lt.md ? 'q-pb-md' : ''"
    >
      <q-icon name="card_giftcard" size="100px" color="grey" />
      <div class="text-grey text-bold mt-2">GIFT REGISTRY</div>
    </div>
    <div class="col-md-5 col-sm-12">
      <div class="text-bold text-h4">{{ data.event_name }}</div>
      <div class="text-grey">
        <b>Celebrant:</b>
        {{ data.celebrant_name }}
      </div>
      <div class="text-grey" v-if="data.grooms_name">
        <b>Groom:</b>
        {{ data.grooms_name }}
      </div>
      <div class="text-grey">
        <b>Event Date:</b>
        {{ data.event_date }}
      </div>
      <div class="text-grey">
        <b>Shipping Address:</b>

        {{
          data.house_bldg_st +
            " " +
            data.barangay_district +
            ", " +
            data.city_municipality.name +
            ", " +
            data.state_province.name +
            ", " +
            data.country +
            ` (${data.zip_code})`
        }}
      </div>
    </div>
    <div
      class="col-md-5 col-sm-12 q-pr-xl column justify-between"
      align="right"
      v-if="!$q.screen.lt.md"
    >
      <div class="text-grey col-1">
        <b>REFERENCE NUMBER:</b>
        {{ data.reference_number }}
      </div>
      <div
        class="col-1"
        v-if="
          $route.path.split('/')[3] == 'Manage' &&
            data.shopper_id == logged_user
        "
      >
        <Contacts
          :gift_id="data._id"
          :selectedProd="selectedProducts"
          @update:selectedProd="selectedProducts = $event"
          :giftReg="data"
        />
      </div>
      <div
        class="text-grey col-2"
        v-if="
          $route.path.split('/')[3] == 'Manage' &&
            data.shopper_id == logged_user
        "
      >
        <q-btn
          :label="this.data.published ? 'Unpublish' : 'Publish'"
          flat
          color="grey"
          @click="unpublish"
        />
        <q-btn
          label="delete"
          flat
          color="primary"
          @click="deleteGiftRegistry"
        />
      </div>
    </div>
    <div v-else class="row">
      <div>
        <div class="text-grey col-1">
          <b>REFERENCE NUMBER:</b>
          {{ data.reference_number }}
        </div>
      </div>
      <div
        class="row items-start col-12  q-pt-md"
        v-if="
          $route.path.split('/')[3] == 'Manage' &&
            data.shopper_id == logged_user
        "
      >
        <div class="col-5">
          <div
            v-if="
              $route.path.split('/')[3] == 'Manage' &&
                data.shopper_id == logged_user
            "
          >
            <Contacts
              :gift_id="data._id"
              :selectedProd="selectedProducts"
              @update:selectedProd="selectedProducts = $event"
              :giftReg="data"
            />
          </div>
        </div>
        <div class="col-4">
          <q-btn
            :label="this.data.published ? 'Unpublish' : 'Publish'"
            flat
            color="grey"
            @click="unpublish"
          />
        </div>
        <div class="col-3">
          <q-btn
            label="delete"
            flat
            color="primary"
            @click="deleteGiftRegistry"
          />
        </div>
      </div>
    </div>
    <div class="q-pt-lg col-12">
      <q-separator />
    </div>
    <div
      class="col-md-12 col-xs-12 q-pt-md q-pb-md"
      :class="$q.screen.lt.md ? '' : 'q-pl-md'"
    >
      <div class="row " v-if="!$q.screen.lt.md">
        <q-card
          flat
          bordered
          class="q-ma-xs"
          v-for="item in selectedProducts"
          :key="item._id"
          :class="{ 'bg-yellow-1': item.subscribe == true }"
        >
          <q-card-section class="q-pa-xs" style="height: 180px; width: 200px">
            <q-img :ratio="1" :src="item.photos[0]" />
          </q-card-section>
          <q-card-section class="q-pa-xs" style="height: 65px; width: 200px">
            <div
              class="text-title text-bold  q-mt-md"
              v-if="'product_name' in item"
            >
              <p
                style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;"
                class="ellipsis"
              >
                {{ item.product_name }}
              </p>
            </div>
            <div class="text-title text-bold" v-if="'service_name' in item">
              <p
                class="ellipsis q-mt-md"
                style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100% ;"
              >
                {{ item.service_name }}
              </p>
            </div>
            <div>
              <font class="text-bold text-primary">{{
                item.sale_price != ""
                  ? $prettyMoney(item.sale_price)
                  : $prettyMoney(item.regular_price)
              }}</font>
              <font class="text-grey q-pl-sm" v-if="item.sale_price != ''">
                <strike>{{ $prettyMoney(item.regular_price) }}</strike>
              </font>
            </div>

            <div class="row">
              <div
                class="text-grey"
                style="cursor: pointer ;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
              >
                <a
                  :href="'#/StoreDetails?store=' + item.store_id"
                  target="_blank"
                  style="text-decoration: none; color: gray;"
                >
                  <p
                    style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                  >
                    {{ item.store_name }}
                  </p>
                </a>
              </div>
            </div>
          </q-card-section>

          <q-card-section
            class="q-pa-xs"
            style="height: 50px; width: 200px"
            align="right"
          >
            <q-btn
              v-if="
                $route.path.split('/')[3] == 'Manage' &&
                  data.shopper_id == logged_user
              "
              @click="RemoveProduct(item._id)"
              color="grey"
              unelevated
              :label="item.buyed ? 'Taken' : 'Remove'"
              :disabled="item.buyed"
              class="full-width  q-mt-sm"
            />
            <q-btn
              v-else
              @click="buyProductBtn(data.reference_number, item._id)"
              color="primary"
              :label="item.buyed ? 'Taken' : 'Buy'"
              unelevated
              :disabled="item.buyed"
              class="full-width  q-mt-sm"
            />
          </q-card-section>
        </q-card>
      </div>

      <div v-else>
        <div class="row text-dark rounded-borders q-col-gutter-lg">
          <div class="col-12 q-pb-lg">
            <div class="row q-col-gutter-sm">
              <!-- Loop through sortedData -->
              <div
                class="col-6 col-sm-6 col-md-3 q-pb-md"
                :class="
                  sortedData.length === 1 ? 'col-12' : 'col-6 col-xs-6 col-sm-6'
                "
                v-for="item in selectedProducts"
                :key="item._id"
              >
                <q-card
                  flat
                  bordered
                  class=""
                  :class="{ 'bg-yellow-1': item.subscribe == true }"
                >
                  <q-card-section class="q-pa-none q-pb-sm">
                    <q-img :ratio="1" :src="item.photos[0]" />
                  </q-card-section>
                  <q-card-section class="q-pa-xs ">
                    <div
                      class="text-title text-bold"
                      v-if="'product_name' in item"
                    >
                      <p
                        style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;"
                        class="ellipsis"
                      >
                        {{ item.product_name }}
                      </p>
                    </div>

                    <div>
                      <font class="text-bold text-primary">{{
                        item.sale_price != ""
                          ? $prettyMoney(item.sale_price)
                          : $prettyMoney(item.regular_price)
                      }}</font>
                      <br />
                      <font class="text-grey " v-if="item.sale_price != ''">
                        <strike>{{ $prettyMoney(item.regular_price) }}</strike>
                      </font>
                      <font v-else class="text-grey ">
                        <strike>-</strike>
                      </font>
                    </div>
                    <div class="row">
                      <div
                        class="text-grey"
                        style="cursor: pointer ;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                      >
                        <a
                          :href="'#/StoreDetails?store=' + item.store_id"
                          target="_blank"
                          style="text-decoration: none; color: gray;"
                        >
                          <p
                            style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                          >
                            {{ item.store_name }}
                          </p>
                        </a>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-xs ">
                    <!-- <q-btn
                      v-if="'product_name' in item"
                      color="primary"
                      rounded
                      size="sm"
                      style="width: 100%;"
                      @click="
                        $router.replace({
                          path: `/ProductDetails/${item._id}`
                        })
                      "
                      unelevated
                    >
                      <span class="text-body1"> View </span>
                    </q-btn> -->

                    <q-btn
                      v-if="
                        $route.path.split('/')[3] == 'Manage' &&
                          data.shopper_id == logged_user
                      "
                      @click="RemoveProduct(item._id)"
                      color="grey"
                      unelevated
                      style="width: 100%;"
                      :disabled="item.buyed"
                      :label="item.buyed ? 'Taken' : 'Remove'"
                      class="full-width  q-mt-sm"
                    />
                    <q-btn
                      v-else
                      @click="buyProductBtn(data.reference_number, item._id)"
                      color="primary"
                      :label="item.buyed ? 'Taken' : 'Buy'"
                      unelevated
                      style="width: 100%;"
                      :disabled="item.buyed"
                      class="full-width  q-mt-sm"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- old -->
    <!-- <div class="row">
      <q-card
        flat
        bordered
        class="q-ma-sm "
        v-for="item in selectedProducts"
        :key="item._id"
      >
        <q-card-section style="height:180px;width:200px">
          <q-img :ratio="1" :src="item.photos[0]" />
        </q-card-section>
        <q-card-section style="height:75px;width:200px">
          <div class="text-title text-bold" v-if="'product_name' in item">
            {{ item.product_name }}
          </div>
          <div>
            <font class="text-bold text-primary">{{
              item.sale_price != ""
                ? $prettyMoney(item.sale_price)
                : $prettyMoney(item.regular_price)
            }}</font>
            <font class="text-grey q-pl-sm" v-if="item.sale_price != ''">
              <strike>{{ $prettyMoney(item.regular_price) }}</strike>
            </font>
          </div>
          <div class="row">
            <div class="text-primary" style="cursor:pointer">
              {{ item.store_name }}
            </div>
          </div>
        </q-card-section>
        <q-card-section style="height:55px;width:200px" align="right">
          <q-btn
            v-if="
              $route.path.split('/')[3] == 'Manage' &&
                data.shopper_id == logged_user
            "
            @click="RemoveProduct(item._id)"
            color="grey"
            label="Remove"
            unelevated
            :disabled="item.buyed"
          />
          <q-btn
            v-else
            @click="buyProductBtn(data.reference_number, item._id)"
            color="primary"
            :label="item.buyed ? 'Taken' : 'Buy'"
            unelevated
            :disabled="item.buyed"
          />
        </q-card-section>
      </q-card>
    </div> -->

    <div v-if="!$q.screen.lt.md" class="row col-12">
      <q-list
        v-if="
          $route.path.split('/')[3] == 'Manage' &&
            data.shopper_id == logged_user
        "
        padding
        bordered
        class=" col-12 "
      >
        <q-expansion-item
          dense
          dense-toggle
          expand-separator
          icon="add"
          label="Add Products"
          default-opened
        >
          <q-card>
            <q-card-section class="row">
              <q-input
                class="q-pt-md col-sm-12 col-md-2 offset-md-10"
                rounded
                outlined
                dense
                placeholder="Search products"
                v-model="search"
                input-class="text-right"
                debounce="500"
              >
                <template v-slot:append>
                  <q-icon v-if="search === ''" name="search" />
                  <q-icon
                    v-else
                    name="clear"
                    class="cursor-pointer"
                    @click="search = ''"
                  />
                </template>
              </q-input>
              <div class="q-pt-md col-12">
                <div class="row">
                  <div
                    v-if="!products || products.length === 0"
                    class="text-center q-pa-md col-12"
                  >
                    <h4>
                      No gift supplier found in this area 🎁
                    </h4>
                  </div>

                  <template v-else>
                    <q-card
                      flat
                      bordered
                      class="q-ma-xs"
                      v-for="item in products"
                      :key="item._id"
                      :class="{ 'bg-yellow-1': item.subscribe == true }"
                    >
                      <q-card-section
                        class="q-pa-xs"
                        style="height: 180px; width: 200px"
                      >
                        <q-img :ratio="1" :src="item.photos[0]" />
                      </q-card-section>
                      <q-card-section
                        class="q-pa-xs"
                        style="height: 65px; width: 200px"
                      >
                        <div
                          class="text-title text-bold  q-mt-md"
                          v-if="'product_name' in item"
                        >
                          <p
                            style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;"
                            class="ellipsis"
                          >
                            {{ item.product_name }}
                          </p>
                        </div>
                        <div
                          class="text-title text-bold"
                          v-if="'service_name' in item"
                        >
                          <p
                            class="ellipsis q-mt-md"
                            style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100% ;"
                          >
                            {{ item.service_name }}
                          </p>
                        </div>
                        <div>
                          <font class="text-bold text-primary">{{
                            item.sale_price != ""
                              ? $prettyMoney(item.sale_price)
                              : $prettyMoney(item.regular_price)
                          }}</font>
                          <font
                            class="text-grey q-pl-sm"
                            v-if="item.sale_price != ''"
                          >
                            <strike>{{
                              $prettyMoney(item.regular_price)
                            }}</strike>
                          </font>
                        </div>

                        <div class="row">
                          <div
                            class="text-grey"
                            style="cursor: pointer ;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                          >
                            <a
                              :href="'#/StoreDetails?store=' + item.store_id"
                              target="_blank"
                              style="text-decoration: none; color: gray;"
                            >
                              <p
                                style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                              >
                                {{ item.store_name }}
                              </p>
                            </a>
                          </div>
                        </div>
                      </q-card-section>

                      <q-card-section
                        class="q-pa-xs"
                        style="height: 50px; width: 200px"
                        align="right"
                      >
                        <q-btn
                          @click="AddProduct(item._id)"
                          color="primary"
                          label="Add"
                          unelevated
                          style="width: 100%;"
                          class="full-width  q-mt-sm"
                          :disable="isProductAdded(item._id)"
                        />
                      </q-card-section>
                    </q-card>

                    <!-- <q-card
                      flat
                      bordered
                      class="q-ma-sm"
                      v-for="item in products"
                      :key="item._id"
                      :class="{ 'bg-yellow-1': item.subscribe == true }"
                    >
                      <q-card-section style="height:180px;width:200px">
                        <q-img :ratio="1" :src="item.photos[0]" />
                      </q-card-section>
                      <q-card-section style="height:75px;width:200px">
                        <div
                          class="text-title text-bold"
                          v-if="'product_name' in item"
                        >
                          {{ item.product_name }}
                        </div>
                        <div>
                          <font class="text-bold text-primary">
                            {{
                              item.sale_price != ""
                                ? $prettyMoney(item.sale_price)
                                : $prettyMoney(item.regular_price)
                            }}
                          </font>
                          <font
                            class="text-grey q-pl-sm"
                            v-if="item.sale_price != ''"
                          >
                            <strike>{{
                              $prettyMoney(item.regular_price)
                            }}</strike>
                          </font>
                        </div>
                        <div class="row">
                          <div class="text-primary" style="cursor:pointer">
                            {{ item.store_name }}
                          </div>
                        </div>
                      </q-card-section>
                      <q-card-section
                        style="height:55px;width:200px"
                        align="right"
                      >
                        <q-btn
                          @click="AddProduct(item._id)"
                          color="primary"
                          label="Add"
                          unelevated
                          :disable="isProductAdded(item._id)"
                        />
                      </q-card-section>
                    </q-card> -->
                  </template>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>

    <div v-else class="col-12">
      <div
        v-if="
          $route.path.split('/')[3] == 'Manage' &&
            data.shopper_id == logged_user
        "
      >
        <div class="col-12 q-pb-md">
          <q-separator />
        </div>

        <!-- Add Products & Search (Side by Side) -->
        <div class="row justify-between q-mb-md">
          <h6 class="q-ma-none col-6" style="line-height: 45px;">
            Add Products
          </h6>

          <div class="col-6">
            <q-input
              v-model="search"
              label="Search products"
              dense
              debounce="500"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>

        <div
          class="col-md-12 col-xs-12 q-pt-md q-pb-md"
          :class="$q.screen.lt.md ? '' : 'q-pl-md'"
        >
          <div class="row text-dark rounded-borders q-col-gutter-lg">
            <div class="col-12 q-pb-lg">
              <div class="row q-col-gutter-sm">
                <!-- Loop through sortedData -->
                <div
                  class="col-6 col-sm-6 col-md-3 q-pb-md"
                  v-for="item in products"
                  :key="item._id"
                >
                  <q-card
                    flat
                    bordered
                    class=""
                    :class="{ 'bg-yellow-1': item.subscribe == true }"
                  >
                    <q-card-section class="q-pa-none q-pb-sm">
                      <q-img :ratio="1" :src="item.photos[0]" />
                    </q-card-section>
                    <q-card-section class="q-pa-xs ">
                      <div
                        class="text-title text-bold"
                        v-if="'product_name' in item"
                      >
                        <p
                          style="margin-bottom:5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;"
                          class="ellipsis"
                        >
                          {{ item.product_name }}
                        </p>
                      </div>

                      <div>
                        <font class="text-bold text-primary">{{
                          item.sale_price != ""
                            ? $prettyMoney(item.sale_price)
                            : $prettyMoney(item.regular_price)
                        }}</font>
                        <br />
                        <font class="text-grey " v-if="item.sale_price != ''">
                          <strike>{{
                            $prettyMoney(item.regular_price)
                          }}</strike>
                        </font>
                        <font v-else class="text-grey ">
                          <strike>-</strike>
                        </font>
                      </div>
                      <div class="row">
                        <div
                          class="text-grey"
                          style="cursor: pointer ;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                        >
                          <a
                            :href="'#/StoreDetails?store=' + item.store_id"
                            target="_blank"
                            style="text-decoration: none; color: gray;"
                          >
                            <p
                              style="margin:0px;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;"
                            >
                              {{ item.store_name }}
                            </p>
                          </a>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section class="q-pa-xs ">
                      <!-- <q-btn
                      v-if="'product_name' in item"
                      color="primary"
                      rounded
                      size="sm"
                      style="width: 100%;"
                      @click="
                        $router.replace({
                          path: `/ProductDetails/${item._id}`
                        })
                      "
                      unelevated
                    >
                      <span class="text-body1"> View </span>
                    </q-btn> -->

                      <q-btn
                        @click="AddProduct(item._id)"
                        color="primary"
                        label="Add"
                        unelevated
                        style="width: 100%;"
                        class="full-width  q-mt-sm"
                        :disable="isProductAdded(item._id)"
                      />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class=" col-12 q-pb-md">
        <q-separator />
      </div>
      <h5 class="q-mt-none row">Available Products</h5>
      <div class="row col-12 justify-center">
        <q-input v-model="text" label="Label" :dense="dense">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div> -->
      <br />
      <br />
      <br />
      <br /><br />
      <br /><br />
    </div>

    <q-dialog
      v-model="viewProduct"
      persistent
      full-height
      full-width
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="">
        <q-bar class="bg-white">
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="q-pt-none">
          <productDetail
            :giftRegistryNo="reference_no"
            :giftData="data"
            :item-id="selected_item"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import productDetail from "../../Shopper/Home/ProductDetails";
import Contacts from "./Contacts.vue";
export default {
  components: {
    productDetail,
    Contacts
  },
  data() {
    return {
      data: {},
      search: "",
      products: [],
      selectedProducts: [],
      reference_no: "",
      viewProduct: false,
      logged_user: this.$local.getItem("user_token"),
      path_name: "",
      city_mun: "",
      selected_item: null,
      activeDialog: null
    };
  },
  methods: {
    onHandleCard: async function(id, item) {
      const path = item.product_name ? "ProductDetails" : "ServiceDetails";

      return this.$router.push({ path: `/${path}/${id}` });
    },

    getGiftRegData: async function() {
      try {
        const { data } = await this.$dbCon.service("gift-registry").find({
          query: {
            reference_number: this.$route.params.reference_no
          }
        });

        return data;
      } catch (e) {
        console.log(e);
      }
    },

    AddProduct: function(product) {
      // console.log(product);
      if (!this.data.items.includes(product)) {
        this.data.items.push(product);

        this.$dbCon.service("gift-registry").patch(this.data._id, this.data);
      }
    },
    isProductAdded(productId) {
      return this.data.items.includes(productId);
    },

    RemoveProduct: function(product) {
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Are you sure you want to remove this product to the gift registry?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.data.items.splice(this.data.items.indexOf(product), 1);
          this.$dbCon.service("gift-registry").patch(this.data._id, this.data);
        });
    },
    unpublish: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Are you sure you want to " +
            (this.data.published ? "Unpublish" : "Publish") +
            " this Gift Registry?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.data.published = !this.data.published;
          this.$dbCon.service("gift-registry").patch(this.data._id, this.data);
        });
    },
    deleteGiftRegistry: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to delete this Gift Registry?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.data.deleted = true;
          this.$dbCon
            .service("gift-registry")
            .patch(this.data._id, this.data)
            .then(() => {
              this.$router.push("/GiftRegistry");
            });
        });
    },

    buyProductBtn: function(giftRegistryNo, item_id) {
      this.reference_no = giftRegistryNo;
      this.activeDialog = item_id;
      this.selected_item = item_id;
      // console.log(item_id);
      setTimeout(() => {
        this.viewProduct = true;
      }, 100);
      // this.viewProduct = true;
    },

    async getGiftRegData() {
      try {
        const response = await this.$dbCon.service("gift-registry").find({
          query: { reference_number: this.$route.params.reference_no }
        });

        return response.data.length ? response.data[0] : null;
      } catch (e) {
        console.error(e);
        return null;
      }
    },

    async getData() {
      try {
        await this.$dbCon.authenticate();
        const giftRegData = await this.getGiftRegData();

        if (!giftRegData) {
          this.$router.push("/GiftRegistry");
          return;
        }

        this.data = giftRegData;
        this.validateRoutePermissions();

        // Fetch & Process Selected Products
        this.selectedProducts = await this.fetchSelectedProducts(
          this.data.items,
          this.data.buyed_items
        );
      } catch (e) {
        console.error("Error fetching data:", e);
        this.$router.push("/GiftRegistry");
      }
    },

    validateRoutePermissions() {
      const currentPath = this.$route.path.split("/")[3];
      if (currentPath !== "Manage" && currentPath !== undefined) {
        if (!this.data.published || this.data.deleted) {
          this.$router.push("/");
        }
      }
    },

    async fetchSelectedProducts(items, buyedItems) {
      try {
        const response = await this.$axios.get(
          `${this.$appLink}/giftReg-products?items=${items}`
        );
        const products = response.data.data;

        // Fetch Store Details
        await this.updateStoreMap(products);

        return products.map(product => ({
          ...product,
          buyed: buyedItems.includes(product._id),
          store_name: this.storeMap[product.store_id] || "Unknown"
        }));
      } catch (e) {
        console.error("Error fetching selected products:", e);
        return [];
      }
    },

    async updateStoreMap(products) {
      const storeIds = [...new Set(products.map(product => product.store_id))];
      if (!storeIds.length) return;

      const response = await this.$dbCon.service("store").find({
        query: { _id: { $in: storeIds } }
      });

      this.storeMap = response.data.reduce((map, store) => {
        map[store._id] = store.store_name;
        return map;
      }, {});
    },

    async getProductPerMun() {
      try {
        const giftRegData = await this.getGiftRegData();
        if (!giftRegData) return;

        this.city_mun = giftRegData.city_municipality.name;

        const [
          storeFuelDel,
          storeAdvertisment,
          storeDetails
        ] = await this.fetchStoreData(this.city_mun);

        this.storeMap = this.createStoreMap(storeDetails.data);
        const storeIds = storeFuelDel.data.map(({ store_id }) => store_id);
        const subscribedStoreIds = storeAdvertisment.data.map(
          ({ store_id }) => store_id
        );

        const query = {
          query: { deleted: false, store_id: { $in: storeIds } }
        };
        if (this.search.trim() != "") {
          query.query["$search"] = this.search;
        }
        const response = await this.$dbCon.service("products").find(query);

        this.products = this.addSubscriptionAndStore(
          response.data,
          subscribedStoreIds
        );
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    },

    async fetchStoreData(city_municipality) {
      return Promise.all([
        this.$dbCon.service("store-fuel-delivery").find({}),
        // if needed filter for city
        // query: {
        //   fuel_delivery: { $elemMatch: { location: city_municipality } }
        // }
        this.$dbCon.service("store-advertisment").find({
          query: {
            $select: ["store_id"],
            "subscriptions.date_end": { $gte: new Date().toISOString() }
          }
        }),
        this.$dbCon.service("store").find({})
      ]);
    },

    createStoreMap(storeData) {
      return storeData.reduce((map, store) => {
        map[store._id] = store.store_name;
        return map;
      }, {});
    },

    addSubscriptionAndStore(products, subscribedStoreIds) {
      return products.map(product => ({
        ...product,
        subscribe: subscribedStoreIds.includes(product.store_id),
        store_name: this.storeMap[product.store_id] || "Unknown"
      }));
    },

    async getProdPerMunSearch() {
      try {
        const response = await this.$axios.get(
          `${this.$appLink}/productSearch?user_id=${this.city_mun}&search=${
            this.search
          }`
        );
        this.products = response.data.data;
      } catch (e) {
        console.error("Error searching products:", e);
      }
    }
  },

  mounted() {
    this.$dbCon.service("gift-registry").onDataChange(() => {
      this.getData();
    });

    this.path_name = window.location.origin;
    this.getProductPerMun();
  },

  computed: {
    sortedData() {
      return this.selectedProducts.slice().sort((a, b) => {
        if (a.subscribe && !b.subscribe) return -1;
        if (!a.subscribe && b.subscribe) return 1;
        return 0;
      });
    }
  },
  watch: {
    search: async function() {
      if (this.search.trim() != "") {
        this.getProductPerMun();
      }
      this.getProductPerMun();

      // this.getDataFilter();
    }
  }
};
</script>

<style scoped>
.no-result-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 20px;
}

.no-result-icon {
  margin-bottom: 10px;
}
</style>
