<template>
  <div class="q-pa-lg row justify-center">
    <div class="col-md-9 col-sm-12 row">
      <!-- HEADER -->
      <div class="col-12">
        <q-breadcrumbs class="q-pb-md text-grey">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="grey" />
          </template>
          <q-breadcrumbs-el class="text-grey" label="Anturaz" />
          <q-breadcrumbs-el class="text-grey" label="Products" />
          <q-breadcrumbs-el class="text-grey" :label="data.category" />
          <q-breadcrumbs-el class="text-grey" :label="data.product_name" />
        </q-breadcrumbs>
        <q-separator />
      </div>

      <!-- IMAGES -->

      <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 q-pt-md">
        <div
          style="overflow: hidden;"
          :style="!$q.screen.lt.md ? 'height: 400px' : ''"
        >
          <q-img :src="currentPicture" :ratio="1" />
        </div>
        <div class="q-pt-sm row">
          <q-card
            flat
            bordered
            square
            :style="
              'border-width:medium;border-color:' +
                (currentIndexPicture == 0 ? $primaryColor : 'white')
            "
            class="col-3"
            outline
            color="grey"
            style="overflow: hidden; height: 100px; cursor: pointer"
            @click="
              (currentPicture = data.photos[0]), (currentIndexPicture = 0)
            "
          >
            <q-img :src="data.photos[0]" :ratio="1" />
          </q-card>
          <q-card
            flat
            bordered
            square
            :style="
              'border-width:medium;border-color:' +
                (currentIndexPicture == 1 ? $primaryColor : 'white')
            "
            class="col-3"
            outline
            color="grey"
            style="overflow: hidden; height: 100px; cursor: pointer"
            @click="
              (currentPicture = data.photos[1]), (currentIndexPicture = 1)
            "
          >
            <q-img :src="data.photos[1]" :ratio="1" />
          </q-card>
          <q-card
            flat
            bordered
            square
            :style="
              'border-width:medium;border-color:' +
                (currentIndexPicture == 2 ? $primaryColor : 'white')
            "
            class="col-3"
            outline
            color="grey"
            style="overflow: hidden; height: 100px; cursor: pointer"
            @click="
              (currentPicture = data.photos[2]), (currentIndexPicture = 2)
            "
          >
            <q-img :src="data.photos[2]" :ratio="1" />
          </q-card>
          <q-card
            flat
            bordered
            square
            :style="
              'border-width:medium;border-color:' +
                (currentIndexPicture == 3 ? $primaryColor : 'white')
            "
            class="col-3"
            outline
            color="grey"
            style="overflow: hidden; height: 100px; cursor: pointer"
            @click="
              (currentPicture = data.photos[3]), (currentIndexPicture = 3)
            "
          >
            <q-img :src="data.photos[3]" :ratio="1" />
          </q-card>
        </div>
      </div>
      <!-- DESCRIPTION 1 -->
      <div
        class="col-6 col-lg-6 col-xs-12 q-pt-md q-pl-md"
        v-if="!$q.screen.lt.md"
        style="padding-left: 50px;"
      >
        <q-list class="q-mt-sm q-mb-sm full-width" style="padding: 0px;">
          <q-item
            clickable
            v-ripple
            @click="$router.push('/StoreDetails?store=' + store._id)"
            style="padding: 0px;"
          >
            <q-item-section avatar>
              <q-icon v-if="store.logo == ''" name="store" color="grey" />
              <q-img
                v-if="store.logo != ''"
                :src="store.logo"
                :ratio="1"
                style="height: 70px; width: 70px;"
              />
            </q-item-section>
            <q-item-section class="text-h5">{{
              store.store_name
            }}</q-item-section>
          </q-item>
        </q-list>

        <div class="row">
          <div class="col-12 q-mt-xs">
            <div class="text-h5">{{ data.product_name }}</div>
          </div>
          <div class="col-12 q-mt-xs text-h6">
            <!-- <q-rating :value="2" size="1em" :max="5" color="primary" /> -->
            <q-rating
              :value="data.average_rating ? data.average_rating : 0"
              size="1em"
              :max="5"
              :color="data['average_rating'] != null ? 'primary' : 'grey'"
            />
            <span v-if="data['average_rating'] != null" class="text-primary">
              {{ data.average_rating.toFixed(2) }}
            </span>
            <span class="text-grey" v-else>
              No reviews yet
            </span>
          </div>

          <div class="col-12 q-mt-xs">
            <div class="text-body1 ">SKU: {{ data.SKU }}</div>
          </div>

          <div class="col-12 q-mt-xs text-h4">
            <div class="row">
              <div class="q-pr-sm text-primary text-bold text-h4 self-center">
                {{
                  data.sale_price != 0
                    ? $prettyMoney(data.sale_price)
                    : $prettyMoney(data.regular_price)
                }}
                <!-- {{ $prettyMoney(data.sale_price) }} -->
              </div>
              <q-chip
                v-if="data.sale_price != 0"
                color="primary"
                dense
                text-color="white"
                class="self-center"
              >
                {{
                  Math.round(
                    100 - (data.sale_price / data.regular_price) * 100
                  )
                }}% OFF
              </q-chip>
              <div
                v-if="data.sale_price != 0"
                class="q-pr-sm text-title self-center"
              >
                <strike class="text-grey text-h6">{{
                  $prettyMoney(data.regular_price)
                }}</strike
                >&nbsp;
              </div>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <div v-if="data.size.length != 0">
              <span class="text-subtitle1">Size</span>
              <q-space />
              <q-chip
                class="q-mt-sm text-body1"
                color="primary"
                :disable="data.stock == 0"
                :class="size == s ? 'bg-primary text-white' : 'grey'"
                clickable
                rounded
                outline
                @click="size = s"
                v-for="s in data.size"
                :key="s"
              >
                <span class="text-black">
                  {{ s }}
                </span>
              </q-chip>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <div class="col-8" v-if="data.color.length != 0">
              <span class="text-subtitle1">Color</span>
              <q-space />
              <q-chip
                class="text-body1"
                color="primary"
                :disable="data.stock == 0"
                :class="color == c ? 'bg-primary text-white' : 'grey'"
                clickable
                rounded
                outline
                @click="color = c"
                v-for="c in data.color"
                :key="c"
              >
                <span class="text-black"> {{ c }}</span>
              </q-chip>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <div class="col-8" v-if="data.material.length != 0">
              <span class="text-subtitle1">Material</span>
              <q-space />
              <q-chip
                class="text-body1"
                color="primary"
                :disable="data.stock == 0"
                :class="material == m ? 'bg-primary text-white' : 'grey'"
                clickable
                rounded
                outline
                @click="material = m"
                v-for="m in data.material"
                :key="m"
              >
                <span class="text-black"> {{ m }}</span>
              </q-chip>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <div class="col-8">
              <div class="row">
                <div class="col-12">
                  <span class="text-title text-subtitle1">Quantity</span>
                </div>

                <div class="col-2">
                  <q-input
                    type="number"
                    class="col-1"
                    :disable="data.stock == 0"
                    v-model="quantity"
                    debounce="200"
                    outlined
                    squared
                    dense
                  />
                </div>
                <div
                  class="col-3 q-pl-sm"
                  style="display: flex; flex-direction: column; justify-content: flex-end;"
                >
                  <span class="text-grey"
                    >Only {{ data.stock }} items left!</span
                  >
                </div>
              </div>

              <!-- Gift Registry No: -->

              <div clss="col-8" v-if="giftRegistryNo">
                <span class="text-title text-bold"
                  >Gift Registry Reference No</span
                >
                <q-input
                  type="text"
                  class="col-1"
                  :disable="data.stock == 0"
                  v-model="giftRegistryNo"
                  debounce="200"
                  outlined
                  squared
                  dense
                  disable
                />
              </div>
            </div>
          </div>

          <div class="col-12 q-mt-md" v-if="data.gift_wrapping_services">
            <div class="col-8">
              <span class="text-subtitle1"
                >Gift Wrapping Services ({{
                  data.gift_wrapping_charge == 0
                    ? "Free"
                    : `₱${data.gift_wrapping_charge}`
                }})</span
              >
              <div>
                <q-checkbox v-model="giftwrapping" class="q-pl-none">
                  <span class="text-body1">
                    Gift wrap this item
                  </span>
                </q-checkbox>
              </div>

              <div class="" v-if="giftwrapping">
                <div class="q-pt-sm q-pb-sm">Select Wrappper</div>
                <div>
                  <q-btn
                    v-for="color in store.giftwrapping.colors"
                    :key="color"
                    unelevated
                    @click="giftwrapping_color = color"
                    class="q-mr-sm text-body1"
                    :color="giftwrapping_color == color ? 'primary' : 'grey-4'"
                  >
                    <span
                      v-bind:style="{ 'background-color': color }"
                      style="
                        height: 25px;
                        width: 25px;
                        border-radius: 50%;
                        display: inline-block;
                      "
                    />
                  </q-btn>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 q-pt-sm">
            <div class="row">
              <div class="col-12">
                <span class="text-subtitle1">Date Needed</span>
              </div>

              <div class="col-4">
                <q-input
                  outlined
                  class="col-12 q-pt-sm"
                  :disable="data.stock == 0"
                  :value="$formatDate_DateOnly(date_needed)"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" />
                  </template>
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      :disable="data.stock == 0"
                      v-model="date_needed"
                      :options="getDateOptions"
                    />
                  </q-popup-proxy>
                </q-input>
              </div>
            </div>

            <div class="col-8">
              <div class="q-pl-sm">
                <span
                  class="text-red text-subtitle2 q-pt-xs"
                  v-if="
                    $getDateDiff(
                      date_needed,
                      this.$addToDate(new Date(), 5, 0),
                      'months'
                    ) < 3
                  "
                >
                </span>
              </div>
            </div>
            <div class="col-12 q-pt-sm">
              <span class="text-grey">
                This item requires {{ data.delivery_period.max }} days lead time
                prior to delivery date
              </span>
            </div>

            <div class="col-12 q-mt-xl q-mb-lg">
              <div class="row justify-around">
                <q-btn
                  rounded
                  unelevated
                  color="primary"
                  class="col-5"
                  size="md"
                  @click="checkLogin"
                  :disabled="isDisabled"
                >
                  <span class="text-black">
                    CHECKOUT
                  </span>
                </q-btn>
                <div class="col-1"></div>
                <q-btn
                  outline
                  rounded
                  color="primary"
                  class="col-5"
                  size="md"
                  @click="addToCart"
                >
                  <span class="text-black">
                    ADD TO CART
                  </span>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <q-list class="q-mt-sm q-mb-sm full-width" style="padding: 0px;">
          <q-item
            clickable
            v-ripple
            @click="$router.push('/StoreDetails?store=' + store._id)"
            style="padding: 0px;"
          >
            <q-item-section avatar>
              <q-icon v-if="store.logo == ''" name="store" color="grey" />
              <q-img v-if="store.logo != ''" :src="store.logo" :ratio="1" />
            </q-item-section>
            <q-item-section class=" text-h6">{{
              store.store_name
            }}</q-item-section>
          </q-item>
        </q-list>
        <div class="row">
          <div class="col-12 q-mt-xs">
            <div class="text-h5">{{ data.product_name }}</div>
          </div>

          <div class="col-12 q-mt-xs text-h6">
            <!-- <q-rating :value="2" size="1em" :max="5" color="primary" /> -->
            <q-rating
              :value="data.average_rating ? data.average_rating : 0"
              size="1em"
              :max="5"
              :color="data['average_rating'] != null ? 'primary' : 'grey'"
            />
            <span v-if="data['average_rating'] != null" class="text-primary">
              {{ data.average_rating.toFixed(2) }}
            </span>
            <span class="text-grey" v-else>
              No reviews yet
            </span>
          </div>

          <div class="col-12 q-mt-xs">
            <div class="text-body1 ">SKU: {{ data.SKU }}</div>
          </div>

          <div class="col-12 q-mt-xs text-h4">
            <div class="row">
              <div class="q-pr-sm text-primary text-bold text-h4 self-center">
                {{
                  data.sale_price != 0
                    ? $prettyMoney(data.sale_price)
                    : $prettyMoney(data.regular_price)
                }}
              </div>
              <q-chip
                v-if="data.sale_price != 0"
                color="primary"
                dense
                text-color="white"
                class="self-center"
              >
                {{
                  Math.round(
                    100 - (data.sale_price / data.regular_price) * 100
                  )
                }}% OFF
              </q-chip>
              <div
                v-if="data.sale_price != 0"
                class="q-pr-sm text-title self-center"
              >
                <strike class="text-grey text-h6">{{
                  $prettyMoney(data.regular_price)
                }}</strike
                >&nbsp;
              </div>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <div v-if="data.size.length != 0">
              <span class="text-subtitle1">Size</span>
              <q-space />
              <q-chip
                class="q-mt-sm text-body1"
                color="primary"
                :disable="data.stock == 0"
                :class="size == s ? 'bg-primary text-white' : 'grey'"
                clickable
                rounded
                outline
                @click="size = s"
                v-for="s in data.size"
                :key="s"
              >
                <span class="text-black">
                  {{ s }}
                </span>
              </q-chip>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <div class="col-8" v-if="data.color.length != 0">
              <span class="text-subtitle1">Color</span>
              <q-space />
              <q-chip
                class="text-body1"
                color="primary"
                :disable="data.stock == 0"
                :class="color == c ? 'bg-primary text-white' : 'grey'"
                clickable
                rounded
                outline
                @click="color = c"
                v-for="c in data.color"
                :key="c"
              >
                <span class="text-black"> {{ c }}</span>
              </q-chip>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <div class="col-8" v-if="data.material.length != 0">
              <span class="text-subtitle1">Material</span>
              <q-space />
              <q-chip
                class="text-body1"
                color="primary"
                :disable="data.stock == 0"
                :class="material == m ? 'bg-primary text-white' : 'grey'"
                clickable
                rounded
                outline
                @click="material = m"
                v-for="m in data.material"
                :key="m"
              >
                <span class="text-black"> {{ m }}</span>
              </q-chip>
            </div>
          </div>

          <div class="col-12 q-mt-sm">
            <div class="col-8">
              <div class="row">
                <div class="col-12">
                  <span class="text-title text-subtitle1">Quantity</span>
                </div>

                <div class="col-2">
                  <q-input
                    type="number"
                    class="col-1"
                    :disable="data.stock == 0"
                    v-model="quantity"
                    debounce="200"
                    outlined
                    squared
                    dense
                  />
                </div>
                <div
                  class="col-4 q-pl-sm"
                  style="display: flex; flex-direction: column; justify-content: flex-end;"
                >
                  <span class="text-grey"
                    >Only {{ data.stock }} items left!</span
                  >
                </div>
              </div>

              <!-- Gift Registry No: -->

              <div clss="col-8" v-if="giftRegistryNo">
                <span class="text-title text-bold"
                  >Gift Registry Reference No</span
                >
                <q-input
                  type="text"
                  class="col-1"
                  :disable="data.stock == 0"
                  v-model="giftRegistryNo"
                  debounce="200"
                  outlined
                  squared
                  dense
                  disable
                />
              </div>
            </div>
          </div>
          <div class="col-12 q-mt-md" v-if="data.gift_wrapping_services">
            <div class="col-8">
              <span class="text-subtitle1"
                >Gift Wrapping Services ({{
                  data.gift_wrapping_charge == 0
                    ? "Free"
                    : `₱${data.gift_wrapping_charge}`
                }})</span
              >
              <div>
                <q-checkbox v-model="giftwrapping" class="q-pl-none">
                  <span class="text-body1">
                    Gift wrap this item
                  </span>
                </q-checkbox>
              </div>

              <div class="" v-if="giftwrapping">
                <div class="q-pt-sm q-pb-sm">Select Wrappper</div>
                <div>
                  <q-btn
                    v-for="color in store.giftwrapping.colors"
                    :key="color"
                    unelevated
                    @click="giftwrapping_color = color"
                    class="q-mr-sm text-body1"
                    :color="giftwrapping_color == color ? 'primary' : 'grey-4'"
                  >
                    <span
                      v-bind:style="{ 'background-color': color }"
                      style="
                        height: 25px;
                        width: 25px;
                        border-radius: 50%;
                        display: inline-block;
                      "
                    />
                  </q-btn>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 q-pt-sm">
            <div class="row">
              <div class="col-12">
                <span class="text-subtitle1">Date Needed</span>
              </div>

              <div class="col-12">
                <q-input
                  outlined
                  class="col-12 q-pt-sm"
                  :disable="data.stock == 0"
                  :value="$formatDate_DateOnly(date_needed)"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" />
                  </template>
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      :disable="data.stock == 0"
                      v-model="date_needed"
                      :options="getDateOptions"
                    />
                  </q-popup-proxy>
                </q-input>
              </div>
            </div>

            <div class="col-8">
              <div class="q-pl-sm">
                <span
                  class="text-red text-subtitle2 q-pt-xs"
                  v-if="
                    $getDateDiff(
                      date_needed,
                      this.$addToDate(new Date(), 5, 0),
                      'months'
                    ) < 3
                  "
                >
                </span>
              </div>
            </div>
            <div class="col-12 q-pt-sm">
              <span class="text-grey">
                This item requires {{ data.delivery_period.max }} days lead time
                prior to delivery date
              </span>
            </div>

            <div class="col-12 q-mt-md q-mb-lg">
              <div class="row justify-around">
                <q-btn
                  rounded
                  unelevated
                  color="primary"
                  class="col-5"
                  size="md"
                  @click="checkLogin"
                  :disabled="isDisabled"
                >
                  <span class="text-black">
                    CHECKOUT
                  </span>
                </q-btn>
                <div class="col-1"></div>
                <q-btn
                  outline
                  rounded
                  color="primary"
                  class="col-5"
                  size="md"
                  @click="addToCart"
                >
                  <span class="text-black">
                    ADD TO CART
                  </span>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 q-pt-lg">
        <!-- DESCRIPTION AND REVIEW -->
        <q-card flat bordered>
          <q-tabs v-model="tab" inline-label class="shadow-2">
            <q-tab name="description" icon="description" label="Description" />
            <!-- <q-tab name="payment" icon="payment" label="Payment Options" /> -->
            <q-tab name="reviews" icon="star" label="Reviews" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="description">
              <div v-html="data.description" />
            </q-tab-panel>
            <q-tab-panel name="payment"></q-tab-panel>
            <q-tab-panel name="reviews">
              <div v-if="product_transactions.length != 0">
                <!-- <q-card flat v-for="st in product_transactions" :key="st._id">
                  <q-card-section>
                    <q-icon name="schedule" />
                    {{ $formatDate(st.logs[st.logs.length - 1].date) }}
                    <div>
                      <font class="text-grey">{{ st.remarks }}</font>
                    </div>
                    <q-rating
                      :value="st.rate"
                      size="1em"
                      :max="5"
                      color="primary"
                    />
                  </q-card-section>
                </q-card> -->

                <q-item
                  v-for="st in product_transactions"
                  :key="st._id + '-transaction'"
                  clickable
                  v-ripple
                >
                  <q-item-section side>
                    <!-- Shopper Image (Rounded) -->
                    <q-avatar rounded>
                      <q-icon
                        v-if="!st.shopper_image || st.shopper_image === ''"
                        color="black"
                        name="far fa-user"
                        size="25px"
                        style="padding-top: 20%; position: relative; top: -3px;"
                        alt="Default Avatar"
                      />

                      <img
                        v-else
                        :src="st.shopper_image"
                        alt="Default Avatar"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ st.full_name }}</q-item-label>
                    <q-item-label>{{
                      st.logs[st.logs.length - 1].date
                        ? $formatDate(st.logs[st.logs.length - 1].date)
                        : "N/A"
                    }}</q-item-label>
                    <q-item-label caption>
                      {{ st.remarks ? st.remarks : "No Remarks" }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-rating
                      :value="st.rate"
                      max="5"
                      size="1em"
                      color="primary"
                      no-dimming
                    />
                  </q-item-section>
                </q-item>
              </div>
              <div v-else>
                No Reviews yet
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>

      <div class="col-12 q-mt-xl" v-if="!$q.screen.lt.md">
        <RecommendedProducts />
      </div>
    </div>

    <div class="col-12 " v-if="$q.screen.lt.md">
      <RecommendedProducts />
    </div>

    <!-- LOGIN FORM -->
    <q-dialog v-model="loginForm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-space />
          <q-btn icon="close" flat round dense size="xs" v-close-popup />
        </q-card-section>
        <q-card-section>
          <ShopperLoginForm :afterLogin="afterLogin" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- PAYMENT -->
    <q-dialog v-model="checkout">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center">
          <div class="text-h6">Checkout</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section></q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import ShopperLoginForm from "components/shopperLoginForm.vue";
import RecommendedProducts from "pages/Shopper/Home/RecommendedProducts.vue";
import CheckoutProduct from "components/CheckOut/CheckoutProduct.vue";
import { data } from "jquery";

import { findProdTranWithShopper } from "../../../api/services/productTransactionsServices";
export default {
  components: {
    ShopperLoginForm,
    RecommendedProducts,
    CheckoutProduct
  },
  props: {
    giftRegistryNo: String,
    giftData: Object,
    itemId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab: "description",
      data: {},
      store: {},
      product_transactions: [],
      currentPicture: "",
      currentIndexPicture: 0,
      size: null,
      color: null,
      giftSize: null,
      material: null,
      giftwrapping: false,
      giftwrapping_color: "",
      giftwrapping_size: "small",
      date_needed: null,
      payment_option: "",
      quantity: "1",
      loginForm: false,
      checkout: false,
      service_transactions: []
    };
  },
  computed: {
    isDisabled() {
      return !this.size || !this.material || !this.color; // Button disabled if either is null
    }
  },
  methods: {
    getDateOptions(date) {
      const maxDeliveryDate = this.$addToDate(
        new Date(),
        this.data.delivery_period.max,
        0
      );
      return date >= this.$formatDateForPicker(maxDeliveryDate);
    },
    formatSizeName(key) {
      // console.log(key);
      return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());
    },
    // get all service transaction
    getAllServiceTrans: async function() {
      try {
        const response = await this.$dbCon
          .service("service-transactions")
          .find({
            query: {
              _id: this.data.store_id
            }
          });
        // console.log("service transaction", response);
      } catch (e) {}
    },

    afterLogin: function() {
      this.loginForm = false;
      this.checkLogin();
    },
    checkIfLoggedIn: async function() {
      var checker = true;
      await this.$dbCon
        .authenticate()
        .then(response => {
          if (this.$local.has("user_token")) {
            this.$dbCon
              .service("users")
              .find({ query: { _id: this.$local.getItem("user_token") } })
              .then(results => {
                if (results.data[0].system_user_type == "Shopper") {
                  checker = true;
                } else {
                  checker = false;
                }
              });
          } else {
            checker = false;
          }
        })
        .catch(e => {
          checker = false;
        });
      return checker;
    },
    addToCart: async function() {
      //VALIDATE FIRST
      if (await this.checkIfLoggedIn()) {
        this.addToCartSignedIn();
      } else {
        this.addToCartNotSignedIn();
      }
    },
    addToCartSignedIn: async function() {
      const giftData = this.giftData ? this.giftData : null;
      const data = {
        item_id: this.data._id,
        store_id: this.data.store_id,
        shopper_id: this.$local.getItem("user_token"),
        type: "products",
        quantity: this.quantity,
        size: this.size,
        color: this.color,
        material: this.material,
        date_needed: this.date_needed,
        giftwrapping: this.giftwrapping,
        giftwrapping_details: {
          color: this.giftwrapping_color,
          size: this.giftSize,
          price: this.store.giftwrapping.charges[this.giftSize]
        },
        gift_registry_data: giftData
      };

      this.$dbCon
        .service("cart")
        .create(data)
        .then(() => {
          this.$q.notify({
            message: "Item Added To Cart!",
            position: "top-right",
            color: "green",
            timeout: 700,
            icon: "shopping_cart"
          });
        });
    },
    addToCartNotSignedIn: function() {
      var cart = [];
      if (this.$session.has("cart")) {
        cart = this.$session.get("cart");
      } else {
        this.$session.set("cart", []);
      }
      const giftData = this.giftData ? this.giftData : null;
      cart.push({
        item_id: this.data._id,
        store_id: this.data.store_id,
        type: "products",
        quantity: this.quantity,
        size: this.size,
        color: this.color,
        material: this.material,
        date_needed: this.date_needed,
        giftwrapping: this.giftwrapping,
        giftwrapping_details: {
          color: this.giftwrapping_color,
          size: this.giftSize,
          price: this.store.giftwrapping.charges[this.giftSize]
        },
        gift_registry_data: giftData
      });
      this.$session.set("cart", cart);
      this.$q.notify({
        message: "Item Added To Cart!",
        position: "top-right",
        color: "green",
        timeout: 700,
        icon: "shopping_cart"
      });
      this.$EventBus.$emit("modify-cart", null);
    },
    checkoutSignedIn: async function() {
      // console.log(this.giftwrapping);
      let giftWrapCharge = 0;
      if (this.giftwrapping) {
        giftWrapCharge = this.data.gift_wrapping_charge;
      }
      // console.log(giftWrapCharge);
      //  charge: this.data.gift_wrapping_charge,
      const giftData = this.giftData ? this.giftData : null;
      this.$dbCon
        .service("cart")
        .create({
          item_id: this.data._id,
          store_id: this.data.store_id,
          shopper_id: this.$local.getItem("user_token"),
          type: "products",
          quantity: this.quantity,
          size: this.size,
          color: this.color,
          material: this.material,
          date_needed: this.date_needed,
          giftwrapping: this.giftwrapping,
          giftwrapping_details: {
            color: this.giftwrapping_color,
            size: this.giftSize,

            price: giftWrapCharge
          },
          gift_registry_data: giftData
        })
        .then(response => {
          this.$router.push("/CheckoutProduct/" + response._id);
        });
    },
    checkLogin: async function() {
      this.$dbCon
        .authenticate()
        .then(() => {
          this.checkoutSignedIn();
        })
        .catch(() => {
          this.loginForm = true;
        });
    },

    checkItemId: function() {
      // console.log(this.itemId);
    },

    // get products
    getProducts: async function() {
      this.$q.loading.show();
      try {
        const response = await this.$dbCon
          .service("products")
          .find({ query: { _id: this.$route.params.product } });
        this.data = response.data[0];
        this.date_needed = this.$formatDateForPicker(
          this.$addToDate(new Date(), response.data[0].delivery_period.max, 0)
        );
        this.currentPicture = response.data[0].photos[0];
        this.giftSize = response.data[0].size_classification;

        await this.$dbCon
          .service("store")
          .find({
            query: {
              _id: this.data.store_id
            }
          })
          .then(results => {
            this.store = results.data[0];
            this.giftwrapping_color = this.store.giftwrapping.colors[0];
          });
      } catch (e) {
        console.log(e);
      }
      this.$q.loading.hide();
    }
  },
  watch: {
    quantity: function() {
      if (this.quantity < 1) {
        this.quantity = 1;
      }
      if (this.quantity % 2 == 0) {
        this.quantity = this.quantity - (this.quantity % 2);
      }
      if (this.quantity > this.data.stock) {
        this.quantity = this.data.stock;
      }
    }
  },
  async mounted() {
    //GET ALL PRODUCT TRANSACTIONS
    if (this.giftData) {
      // this.checkItemId();
      const response = await this.$dbCon
        .service("products")
        .find({ query: { _id: this.itemId } });
      this.data = response.data[0];
      this.currentPicture = this.data.photos[0];
      this.giftSize = response.data[0].size_classification;
      console.log(this.giftData.event_date);
      this.date_needed = this.giftData.event_date;
      await this.$dbCon
        .service("store")
        .find({
          query: {
            _id: this.data.store_id
          }
        })
        .then(results => {
          this.store = results.data[0];
          this.giftwrapping_color = this.store.giftwrapping.colors[0];
        });
    } else {
      this.getProducts();
      await this.$dbCon.service("products").onDataChange(() => {
        this.getProducts();
      });
      // await this.$dbCon
      //   .service("products")
      //   .find({
      //     query: {
      //       _id: this.$route.params.product
      //     }
      //   })
      //   .then(results => {
      //     this.data = results.data[0];
      //     this.currentPicture = this.data.photos[0];
      //     this.giftSize = results.data[0].size_classification;
      //   });
    }
    this.$dbCon
      .service("product-transactions")
      .find({
        query: {
          item_id: this.$route.params.product,
          status: "Done"
        }
      })
      .then(results => {
        this.product_transactions = results.data;
      });

    await findProdTranWithShopper(this.$route.params.product).then(results => {
      console.log(results);
      this.product_transactions = results;
    });

    this.getAllServiceTrans();
    this.$router.push(this.$route.path);
  }
};
</script>
