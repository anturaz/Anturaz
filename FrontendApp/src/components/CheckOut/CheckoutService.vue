<template>
  <div
    class="row justify-center "
    :class="$q.screen.lt.md ? 'q-pt-md q-px-sm' : 'q-pa-md'"
  >
    <div class="col-12 ">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el
          label="Reservation"
          icon="menu_book"
          :to="'/ServiceDetails/' + service._id"
        />

        <q-breadcrumbs-el label="Checkout" />
      </q-breadcrumbs>
      <q-separator />
    </div>
    <q-stepper
      class="col-8 col-md-8 col-xs-12"
      flat
      v-model="step"
      vertical
      color="primary"
      animated
    >
      <!-- STEP 1: SHIPPING ADDRESS -->
      <q-step :name="1" title="Set Meeting Details" :done="step > 1">
        <q-stepper-navigation>
          <q-list link>
            <q-item tag="label" v-ripple v-if="service.in_store_service">
              <q-item-section avatar>
                <q-radio
                  v-model="mode_of_service"
                  val="store_location"
                  color="primary"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  >Avail this service at store location</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple v-if="service.prefered_location">
              <q-item-section avatar>
                <q-radio
                  v-model="mode_of_service"
                  val="designated_location"
                  color="primary"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  >Avail this service at your designated location</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>

          <div v-if="mode_of_service == 'store_location'" class="q-pa-sm">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-title text-bold">Store Address</div>
              </q-card-section>

              <q-separator inset />
              <q-card-section>
                {{ store.house_bldg_st }} {{ store.barangay_district }},
                {{ store.city_municipality.name }},
                {{ store.state_province.name }},
                {{ store.country }}</q-card-section
              >
            </q-card>
            <div
              v-if="showUserAddressForm && mode_of_service === 'store_location'"
              class="q-pt-md"
            >
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-title text-bold">
                    Shopper Address
                  </div>
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                  <div class="row">
                    <q-select
                      label="Region"
                      v-model="user.address.region"
                      :options="$regions"
                      option-value="designation"
                      option-label="designation"
                      class="col-sm-12 q-pa-xs  q-pb-md"
                      :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                      lazy-rules
                      input-debounce="0"
                      use-input
                      fill-input
                      dense
                      outlined
                      square
                      :rules="[val => !!val || 'Region is required']"
                    />

                    <q-select
                      label="State/Province"
                      v-model="user.address.state_province"
                      option-value="name"
                      option-label="name"
                      :options="userProvinces"
                      class="col-sm-12 q-pa-xs  q-pb-md"
                      :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                      lazy-rules
                      input-debounce="0"
                      use-input
                      fill-input
                      dense
                      outlined
                      square
                      :rules="[val => !!val || 'State/Province is required']"
                    />
                  </div>

                  <div class="row">
                    <q-input
                      outlined
                      square
                      dense
                      class="col-sm-12 col-md-6 col-xs-12 q-pa-xs  q-pb-md"
                      v-model="user.address.house_bldg_st"
                      label="House/ Building No./ Street"
                      :rules="[
                        val => !!val || 'House/Building No./Street is required'
                      ]"
                    />

                    <q-input
                      outlined
                      square
                      dense
                      class="col-sm-12 col-md-6 col-xs-12 q-pa-xs  q-pb-md"
                      v-model="user.address.barangay_district"
                      label="Barangay/ District"
                      :rules="[val => !!val || 'Barangay/District is required']"
                    />
                  </div>

                  <div class="row">
                    <q-select
                      label="City/Municipality"
                      v-model="user.address.city_municipality"
                      :options="userMunicipalities"
                      option-value="name"
                      option-label="name"
                      class="col-sm-12 q-pa-xs  q-pb-md"
                      :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-4'"
                      lazy-rules
                      input-debounce="0"
                      @filter="filterUserCityMunicipality"
                      use-input
                      fill-input
                      dense
                      outlined
                      :rules="[val => !!val || 'City/Municipality is required']"
                    />

                    <q-input
                      outlined
                      square
                      dense
                      class="col-sm-12 col-md-4 col-xs-12 q-pa-xs  q-pb-md"
                      v-model="user.address.zip_code"
                      label="Zip Code"
                      :rules="[val => !!val || 'Zip Code is required']"
                    />
                    <q-input
                      outlined
                      square
                      dense
                      class="col-sm-12 col-md-4 col-xs-12 q-pa-xs q-pb-md"
                      v-model="user.address.country"
                      readonly
                      label="Country"
                    />
                  </div>
                </q-card-section>
              </q-card>
              <!-- 

          

         -->
              <!-- <q-btn color="primary" @click="saveUserAddress">Save</q-btn> -->
            </div>

            <div>
              <br />
              <div align="right">
                <q-btn
                  color="primary"
                  label="Continue"
                  @click="onContinue"
                  :disable="isAddressTrue || !isShopperAddressComplete"
                />
              </div>
            </div>
          </div>

          <div
            v-if="
              mode_of_service == 'designated_location' &&
                service.prefered_location
            "
            class="q-pa-sm"
          >
            <q-card flat bordered>
              <q-card-section>
                <div class="text-title text-bold">
                  Designated location
                  <q-chip
                    v-if="isAddressTrue"
                    clickable
                    style="width: auto; height: auto; padding: 7px 7px; font-size: 10px; line-height: 1;"
                    @click="fuelLocation = true"
                    color="red"
                    text-color="white"
                    icon="error"
                    >Check store service areas
                  </q-chip>
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section>
                <div class="row">
                  <q-select
                    label="Region"
                    v-model="region"
                    :options="$regions"
                    option-value="designation"
                    option-label="designation"
                    class="col-sm-12 q-pa-xs q-pb-md"
                    :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                    lazy-rules
                    input-debounce="0"
                    use-input
                    fill-input
                    dense
                    outlined
                    square
                    :rules="[val => !!val || 'Region is required']"
                  />

                  <q-select
                    label="State/Province"
                    v-model="state_province"
                    option-value="name"
                    option-label="name"
                    :options="provinces"
                    class="col-sm-12 q-pa-xs q-pb-md"
                    :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                    lazy-rules
                    input-debounce="0"
                    @filter="filterStateProvince"
                    use-input
                    fill-input
                    dense
                    outlined
                    square
                    :rules="[val => !!val || 'State/Province is required']"
                  />
                </div>

                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs col-xs-12 q-pb-md"
                    v-model="house_bldg_st"
                    label="House/ Building No./ Street"
                    :rules="[
                      val => !!val || 'House/Building No./Street is required'
                    ]"
                  />

                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs col-xs-12 q-pb-md"
                    v-model="barangay_district"
                    label="Barangay/ District"
                    :rules="[val => !!val || 'Barangay/District is required']"
                  />
                </div>
                <div class="row">
                  <q-select
                    label="City/Municipality"
                    v-model="city_municipality"
                    :options="municipalities"
                    option-value="name"
                    option-label="name"
                    class="col-sm-12 q-pa-xs q-pb-md"
                    :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-4'"
                    lazy-rules
                    input-debounce="0"
                    @filter="filterCityMunicipality"
                    use-input
                    fill-input
                    dense
                    outlined
                    square
                    :rules="[val => !!val || 'City/Municipality is required']"
                  />

                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 col-xs-12 q-pa-xs q-pb-md"
                    v-model="zip_code"
                    label="Zip Code"
                    :rules="[val => !!val || 'Zip Code is required']"
                  />

                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 col-xs-12 q-pa-xs q-pb-md"
                    v-model="country"
                    readonly
                    label="Country"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-title text-bold">Contact Person</div>
              </q-card-section>

              <q-separator inset />
              <q-card-section>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 col-xs-12 q-pa-xs"
                    v-model="primary_person_name"
                    label="Person Name"
                    :rules="[val => !!val || 'Person name is required']"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    type="number"
                    class="col-sm-12 col-md-6 col-xs-12 q-pa-xs"
                    v-model="primary_contact_number"
                    label="Contact Number"
                    :rules="[val => !!val || 'Contact is required']"
                  />
                </div>
              </q-card-section>
              <!-- <q-card-section>
                <div class="text-title text-bold">Secondary Contact Person</div>
              </q-card-section>

              <q-separator inset />
              <q-card-section>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-xs-12  col-md-6 q-pa-xs"
                    v-model="secondary_person_name"
                    label="Secondary Person Name"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-xs-12  col-md-6 q-pa-xs"
                    v-model="secondary_contact_number"
                    label="Contact Number"
                  />
                </div>
              </q-card-section> -->
            </q-card>

            <div
              v-if="
                showUserAddressForm && mode_of_service === 'designated_location'
              "
              class="q-pt-md"
            >
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-title text-bold">
                    Shopper Address
                  </div>
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                  <div class="row">
                    <q-select
                      label="Region"
                      v-model="user.address.region"
                      :options="$regions"
                      option-value="designation"
                      option-label="designation"
                      class="col-sm-12 q-pa-xs q-pb-md"
                      :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                      lazy-rules
                      input-debounce="0"
                      use-input
                      fill-input
                      dense
                      outlined
                      square
                      :rules="[val => !!val || 'Region is required']"
                    />

                    <q-select
                      label="State/Province"
                      v-model="user.address.state_province"
                      option-value="name"
                      option-label="name"
                      :options="userProvinces"
                      class="col-sm-12 q-pa-xs q-pb-md"
                      :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-6'"
                      lazy-rules
                      input-debounce="0"
                      use-input
                      fill-input
                      dense
                      outlined
                      square
                      :rules="[val => !!val || 'State/Province is required']"
                    />
                  </div>

                  <div class="row">
                    <q-input
                      outlined
                      square
                      dense
                      class="col-sm-12 col-md-6 col-xs-12 q-pa-xs q-pb-md"
                      v-model="user.address.house_bldg_st"
                      label="House/ Building No./ Street"
                      :rules="[
                        val => !!val || 'House/Building No./Street is required'
                      ]"
                    />

                    <q-input
                      outlined
                      square
                      dense
                      class="col-sm-12 col-md-6 col-xs-12 q-pa-xs q-pb-md"
                      v-model="user.address.barangay_district"
                      label="Barangay/ District"
                      :rules="[val => !!val || 'Barangay/District is required']"
                    />
                  </div>

                  <div class="row">
                    <q-select
                      label="City/Municipality"
                      v-model="user.address.city_municipality"
                      :options="userMunicipalities"
                      option-value="name"
                      option-label="name"
                      class="col-sm-12 q-pa-xs q-pb-md"
                      :class="$q.screen.lt.md ? 'col-xs-12' : 'col-md-4'"
                      lazy-rules
                      input-debounce="0"
                      @filter="filterUserCityMunicipality"
                      use-input
                      fill-input
                      dense
                      outlined
                      :rules="[val => !!val || 'City/Municipality is required']"
                    />

                    <q-input
                      outlined
                      square
                      dense
                      class="col-sm-12 col-md-4 col-xs-12 q-pa-xs q-pb-md"
                      v-model="user.address.zip_code"
                      label="Zip Code"
                      :rules="[val => !!val || 'Zip Code is required']"
                    />
                    <q-input
                      outlined
                      square
                      dense
                      class="col-sm-12 col-md-4 col-xs-12 q-pa-xs q-pb-md"
                      v-model="user.address.country"
                      readonly
                      label="Country"
                    />
                  </div>
                </q-card-section>
              </q-card>
              <!-- 

          

         -->
              <!-- <q-btn color="primary" @click="saveUserAddress">Save</q-btn> -->
            </div>
            <br />

            <div class="row justify-between" v-if="isAddressTrue">
              <div class="col-10 col-xs-12  col-lg-10">
                <p
                  style="line-height: 2.5;"
                  class="text-right text-weight-light"
                >
                  Please check your delivery address if within the store's
                  service area to proceed.
                </p>
              </div>
              <div class="col-2 col-xs-12 col-lg-2">
                <div align="right">
                  <q-btn
                    @click="step = 2"
                    color="primary"
                    label="Continue"
                    :disable="isAddressTrue"
                  />
                </div>
              </div>
            </div>

            <div v-else>
              <div align="right">
                <q-btn
                  v-if="this.mode_of_service == 'store_location'"
                  @click="onContinue"
                  color="primary"
                  label="Continue"
                  :disable="isAddressTrue || !isShopperAddressComplete"
                />

                <q-btn
                  v-else
                  @click="onContinue"
                  color="primary"
                  label="Continue"
                  :disable="
                    isAddressTrue ||
                      !isShopperAddressComplete ||
                      !primary_person_name ||
                      !primary_contact_number
                  "
                />
              </div>
            </div>
          </div>
          <!-- 
          <div>
            <q-card flat bordered>
              <q-card-section>
                <div class="text-title text-bold">Meeting Place</div>
              </q-card-section>

              <q-separator inset />
              <q-card-section>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="house_bldg_st"
                    label="House/ Building No./ Street"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="barangay_district"
                    label="Barangay/ District"
                  />
                  <q-select
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    style="min-width:200px"
                    v-model="city_municipality"
                    :options="store.market_areas"
                    label="City/Municipality"
                  />
                </div>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="state_province"
                    label="State/Province"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="zip_code"
                    label="Zip Code"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-4 q-pa-xs"
                    v-model="country"
                    readonly
                    label="Country"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-title text-bold">Primary Contact Person</div>
              </q-card-section>

              <q-separator inset />
              <q-card-section>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs"
                    v-model="primary_person_name"
                    label="Primary Person Name"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs"
                    v-model="primary_contact_number"
                    label="Contact Number"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-title text-bold">Secondary Contact Person</div>
              </q-card-section>

              <q-separator inset />
              <q-card-section>
                <div class="row">
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs"
                    v-model="secondary_person_name"
                    label="Secondary Person Name"
                  />
                  <q-input
                    outlined
                    square
                    dense
                    class="col-sm-12 col-md-6 q-pa-xs"
                    v-model="secondary_contact_number"
                    label="Contact Number"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div> -->
        </q-stepper-navigation>
      </q-step>
      <q-step :name="2" title="Review Order" icon="pageview" :done="step > 2">
        <serviceDetailsOld
          :order="cart"
          :buttonVisible="false"
          :service="service"
          :transpo="matchingFuelTranspo"
          :actionType="true"
          :checkOutStep="step"
        />
        <q-stepper-navigation align="right">
          <q-btn @click="step = 3" color="primary" label="Continue" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="3"
        title="Payment"
        icon="account_balance_wallet"
        :done="step > 3"
      >
        <!-- PAYMENT -->
        <q-tabs
          v-model="payment_option"
          dense
          align="left"
          no-caps
          inline-label
        >
          <q-tab
            :class="
              payment_option == 'Cash on Fulfillment'
                ? 'text-primary'
                : 'text-grey'
            "
            name="Cash on Fulfillment"
            icon="thumb_up"
            label="Cash on Fulfillment"
          />
          <q-tab
            :class="
              payment_option == 'Online Payment' ? 'text-primary' : 'text-grey'
            "
            name="Online Payment"
            icon="credit_card"
            label="Online Payment"
          />
        </q-tabs>
        <q-tab-panels v-model="payment_option" animated>
          <q-tab-panel name="Cash on Fulfillment">
            <q-list bordered>
              <q-item
                clickable
                v-ripple
                @click="payment_type = 'Cash on Fulfillment'"
              >
                <q-item-section avatar>
                  <q-radio
                    v-model="payment_type"
                    val="Full Payment"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Full Payment</q-item-label>

                  <q-item-label caption>
                    <span v-if="!service.cof">
                      <p
                        class="text-weight-light"
                        style="color: red; margin: 0px ; padding-top: 2px; font-style: italic;"
                      >
                        Cash on fullfilment is not applicable for this item.
                      </p>
                    </span>
                  </q-item-label>
                </q-item-section>
              </q-item></q-list
            >
            <br />

            <div class="row">
              <!-- cash on fulfillment button -->
              <!-- <q-btn disable color="primary" label="Pay Now" class="q-ml-sm" /> -->
              <q-btn
                @click="cashOnFulfillment"
                color="primary"
                label="Pay Now"
                class="q-ml-sm"
              />

              <q-btn
                flat
                @click="step = 2"
                color="primary"
                label="Back"
                class="q-ml-sm"
              />
            </div>
          </q-tab-panel>
          <!-- BANK DEPOSIT -->
          <!-- <q-tab-panel name="Bank Deposit">
            <q-list bordered>
              <q-item clickable v-ripple @click="payment_type = 'Full Payment'">
                <q-item-section avatar>
                  <q-radio
                    v-model="payment_type"
                    val="Full Payment"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Full Payment</q-item-label>
                  <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item
                :clickable="enable_layaway_dp"
                :disable="!enable_layaway_dp"
                :v-ripple="enable_layaway_dp"
                @click="payment_type = '20% Downpayment'"
              >
                <q-item-section avatar>
                  <q-radio
                    v-if="enable_layaway_dp"
                    v-model="payment_type"
                    val="20% Downpayment"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>20% Downpayment</q-item-label>
                  <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator /> 
            </q-list>
            <br />
            <div align="right">
              <q-btn color="primary" label="Proceed" @click="bankDeposit" />
              <q-btn
                flat
                @click="step = 2"
                color="primary"
                label="Back"
                class="q-ml-sm"
              />
            </div>
          </q-tab-panel> -->
          <!-- ONLINE PAYMENT -->
          <q-tab-panel name="Online Payment">
            <q-list bordered>
              <q-item clickable v-ripple @click="payment_type = 'Full Payment'">
                <q-item-section avatar>
                  <q-radio
                    v-model="payment_type"
                    val="Full Payment"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Full Payment</q-item-label>
                  <!-- <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </q-item-label> -->
                </q-item-section>
              </q-item>
              <q-separator />
              <!-- <q-item
                :clickable="enable_layaway_dp"
                :disable="!enable_layaway_dp"
                :v-ripple="enable_layaway_dp"
                @click="payment_type = '20% Downpayment'"
              >
                <q-item-section avatar>
                  <q-radio
                    v-if="enable_layaway_dp"
                    v-model="payment_type"
                    val="20% Downpayment"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>20% Downpayment</q-item-label>
                  <q-item-label caption>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </q-item-label>
                </q-item-section>
              </q-item> -->
            </q-list>
            <br />

            <div class="row">
              <AltPayNet
                :onlinePaymentResult="onlinePaymentResult"
                :preparePayment="preparePayment"
                :payment_options="payment_options"
                :shippingAddress="designation_location"
                :cart="cart"
                :mode_of_delivery="mode_of_delivery"
                :shopperPayment="payment"
                :mode_of_service="mode_of_service"
              />
              <q-btn
                flat
                @click="step = 2"
                color="primary"
                label="Back"
                class="q-ml-sm"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-step>

      <q-step :name="4" title="Transaction Receipt" icon="receipt">
        <q-stepper-navigation>
          <serviceDetailsOld
            :order="cart"
            :buttonVisible="false"
            :service="service"
            :transpo="matchingFuelTranspo"
            :actionType="true"
            :checkOutStep="step"
          />
          <div align="right" class="text-grey q-pr-sm">
            Payment Method: {{ payment_option }}
          </div>
          <q-markup-table flat>
            <thead>
              <tr>
                <th class="text-left">Description</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="BD in payment.breakdown" :key="BD.description">
                <td class="text-left">{{ BD.description }}</td>
                <td class="text-right">{{ $prettyMoney(BD.amount) }}</td>
              </tr>
              <tr>
                <td class="text-left text-bold">TOTAL</td>
                <td class="text-right text-bold">
                  {{ $prettyMoney(payment.total) }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
          <div align="right" class="q-pt-sm">
            <q-btn
              color="primary"
              label="Finish"
              @click="$router.push('/Reservations')"
            />
          </div>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <q-dialog v-model="fuelLocation">
      <q-card>
        <q-card-section>
          <div class="text-h6">Locations</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-list>
            <q-item
              v-for="(loc, index) in store_fuel_delivery_charge"
              :key="index"
            >
              <q-item-section>
                <q-item-label caption>
                  City Municipality : {{ loc.location }}</q-item-label
                >
                <q-item-label caption
                  >Province :{{ loc.province }}</q-item-label
                >
                <q-item-label caption
                  >Fuel Transpo: {{ loc.fuel_transpo }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import AltPayNet from "components/altpaynet_shopper.vue";
import serviceDetailsOld from "components/ItemDetails/serviceDetailsOld.vue";
import { getPaymentOptions } from "../../api/services/paymentService";

import {
  emailSender,
  servicePurchaseEmail,
  servicePurchaseEmailToVendor
} from "../../api/services/authenticationService";
export default {
  components: {
    AltPayNet,
    serviceDetailsOld
  },
  props: ["order"],
  data() {
    return {
      fuelLocation: false,
      step: 1,
      mode_of_delivery: "Shipping",
      primary_person_name: "",
      primary_contact_number: "",
      secondary_person_name: "",
      secondary_contact_number: "",
      payment_option: "Bank Deposit",
      payment_type: "Full Payment",
      country: "Philippines",
      house_bldg_st: "",
      barangay_district: "",
      city_municipality: "",
      state_province: "",
      zip_code: "",
      user: {},
      service: {},
      payment: {},
      cart: {},
      store: {},
      delivery_fee: 0,
      enable_layaway_dp: true,
      payment_utilities: {},
      mode_of_service: "designated_location",
      isAddressTrue: true,
      region: "",
      provinces: [],
      municipalities: [],
      listMunicipalities: [],
      store_fuel_delivery_charge: [],
      payment_options: {},
      designation_location: {},

      showUserAddressForm: false,

      userProvinces: [],
      userMunicipalities: [],
      userListMunicipalities: []
    };
  },
  computed: {
    isShopperAddressComplete() {
      const isFilled =
        this.user.address.region &&
        this.user.address.state_province &&
        this.user.address.house_bldg_st &&
        this.user.address.barangay_district &&
        this.user.address.city_municipality &&
        this.user.address.zip_code;
      return isFilled;
    },
    matchingFuelTranspo() {
      const match = this.store_fuel_delivery_charge.find(
        charge =>
          charge.location ===
          (this.mode_of_service === "store_location"
            ? this.store.city_municipality.name
            : this.city_municipality.name)
      );

      return match && this.mode_of_service !== "store_location"
        ? match.fuel_transpo
        : null;
    }
  },
  methods: {
    saveUserAddress: async function() {
      try {
        const { data } = await this.$dbCon
          .service("users")
          .patch(this.user._id, this.user);

        this.showUserAddressForm = false;
        return data;
      } catch (e) {}
    },

    onContinue: async function() {
      const userAddress = this.isShopperAddressComplete;
      if (userAddress) {
        const res = await this.saveUserAddress();
        this.step = 2;
      } else {
        this.step = 2;
      }
    },

    getPayments: async function() {
      try {
        const { data } = await getPaymentOptions();

        this.payment_options = data;
      } catch (error) {
        console.log(error);
      }
    },

    designationLocation: function() {
      if (this.mode_of_service == "store_location") {
        this.designation_location = {
          house_bldg_st: this.store.house_bldg_st,
          barangay_district: this.store.barangay_district,
          city_municipality: this.store.city_municipality.name,
          state_province: this.store.state_province.name,
          zip_code: this.store.zip_code,
          region: this.store.region.designation,
          country: this.store.country
        };
      } else {
        this.designation_location = {
          house_bldg_st: this.house_bldg_st,
          barangay_district: this.barangay_district,
          city_municipality: this.city_municipality.name,
          state_province: this.state_province.region.designation,
          zip_code: this.zip_code,
          region: this.region.designation,
          country: this.country
        };
      }
    },

    //PREPARING PAYMENT DATA
    preparePayment: function() {
      const store_data = {
        name: this.store.store_name,
        mobile_num: this.store.mobile_number,
        landline: this.store.landline_number,
        email: this.store.original_email
      };
      const service_data = {
        name: this.service.service_name,
        sku: this.service.SKU
      };
      this.cart.store_data = store_data;
      this.cart.service_data = service_data;
      this.cart.checkoutTime = new Date();
      // GENERATING BREAKDOWN
      var breakdown = [];
      var total = 0;
      this.designationLocation();

      //Item Price
      breakdown.push({
        description: "Service",
        amount:
          (this.service.sale_price != ""
            ? this.service.sale_price
            : this.service.regular_price) * this.cart.quantity
      });
      // // Convinience Fee
      // breakdown.push({
      //   description: "Convinience Fee",
      //   amount: this.payment_utilities.web_service_fee
      // });

      // Delivery fee
      breakdown.push({
        description: "Fuel/Transportation Fee",
        amount: this.delivery_fee
      });
      // Getting the total amount
      this.cart.primary_person_name = this.primary_person_name;
      this.cart.primary_contact_number = this.primary_contact_number;

      breakdown.map(result => {
        total += parseInt(result.amount);
      });
      if (this.payment_type == "Full Payment") {
        this.prepareFullPayment(breakdown, total);
      } else if (this.payment_type == "20% Downpayment") {
        this.prepareDownpayment(breakdown, total);
      } else if (this.payment_type == "Layaway") {
        this.prepareLayaway(breakdown, total);
      } else if (this.payment_type == "Cash on Fulfillment") {
        this.prepareCashOnFulFill(breakdown, total);
        console.log("here");
      }
      return this.payment;
    },
    prepareFullPayment: function(breakdown, total) {
      this.payment = {
        shopper_id: this.$local.getItem("user_token"),
        related_id: "",
        breakdown: breakdown,
        total: total,
        payment_option: this.payment_option,
        payment_type: "Full Payment",
        payment_details: {},
        status: "Pending",
        type: "Service",
        payment_utilities: this.payment_utilities,
        regular_price: this.service.regular_price,
        sale_price: this.service.sale_price
      };
    },

    prepareCashOnFulFill: function(breakdown, total) {
      this.payment = {
        shopper_id: this.$local.getItem("user_token"),
        related_id: "",
        breakdown: breakdown,
        total: total,
        payment_option: this.payment_option,
        payment_type: "Cash on Fulfillment",
        payment_details: {},
        status: "Pending",
        type: "Service",
        payment_utilities: this.payment_utilities,
        regular_price: this.service.regular_price,
        sale_price: this.service.sale_price
      };
    },

    prepareDownpayment: function(breakdown, total) {
      this.payment = {
        shopper_id: this.$local.getItem("user_token"),
        related_id: "",
        breakdown: breakdown,
        total: total,
        payment_option: this.payment_option,
        payment_type: "20% Downpayment",
        registration_id: "",
        recurring_payments: [
          {
            schedule: "",
            amount: total * 0.2,
            payment_details: {},
            status: "Pending"
          },
          {
            schedule: this.$adjustDate(
              this.$subtractFromDate(this.cart.date_needed, 14, 0),
              0
            ),
            amount: total - total * 0.2,
            payment_details: {},
            status: "Pending"
          }
        ],
        status: "Pending",
        type: "Service",
        payment_utilities: this.payment_utilities,
        regular_price: this.service.regular_price,
        sale_price: this.service.sale_price
      };
    },
    prepareLayaway: function(breakdown, total) {
      var recurring_payments = [];
      var price = total;
      //date needed - date purchased
      var date_needed = this.cart.date_needed;
      var date_purchased = new Date();
      var difference = Math.ceil(
        this.$getDateDiff(date_needed, date_purchased, "days") / 30
      );
      //FIRST PAYMENT
      recurring_payments.push({
        schedule: "",
        amount: price / difference,
        payment_details: {},
        status: "Pending"
      });
      //FOLLOWING BEFORE THE LAST PAYMENT
      for (var x = 1; x < difference - 1; x++) {
        recurring_payments.push({
          schedule: this.$addToDate(date_purchased, 30 * x, 0),
          amount: price / difference,
          payment_details: {},
          status: "Pending"
        });
      }
      //LAST PAYMENT
      recurring_payments.push({
        schedule: this.$subtractFromDate(date_needed, 14, 0),
        amount: price / difference,
        payment_details: {},
        status: "Pending"
      });
      this.payment = {
        shopper_id: this.$local.getItem("user_token"),
        related_id: "",
        breakdown: breakdown,
        total: total,
        payment_option: this.payment_option,
        payment_type: "Layaway",
        registration_id: "",
        recurring_payments: recurring_payments,
        status: "Pending",
        type: "Service",
        payment_utilities: this.payment_utilities,
        regular_price: this.service.regular_price,
        sale_price: this.service.sale_price
      };
      // console.log(this.payment);
    },
    // FUNCTIONS THAT WILL BE PASS TO THE ALTPAYNET COMPONENT
    onlinePaymentFullPayment: async function() {
      this.cart.logs = [
        {
          event: "Ordered",
          date: new Date()
        }
      ];
      this.cart.status = "For Acknowledgement";
      //GET THE CURRENT ORDER NUMBER AND ASSIGN A NUMBER FOR THIS ORDER
      await this.$dbCon
        .service("service-transactions")
        .find({})
        .then(results => {
          this.cart.order_number = results.total + 1;
        });
      this.cart.mode_of_delivery = this.mode_of_delivery;
      this.cart.mode_of_service = this.mode_of_service;
      this.cart.primary_person_name = this.primary_person_name;
      this.cart.primary_contact_number = this.primary_contact_number;
      // this.cart.secondary_person_name = this.secondary_contact_number;
      // this.cart.secondary_contact_number = this.secondary_contact_number;
      // Save to DB the Product Transaction
      var product_transaction = await this.$dbCon
        .service("service-transactions")
        .create(this.cart);
      // Prepare Payment Data
      this.payment.related_id = product_transaction._id;
      var payment = await this.$dbCon
        .service("shopper-payments")
        .create(this.payment);
      this.$dbCon.service("cart").remove(this.cart._id);
    },
    onlinePaymentDownpayment: async function() {
      this.cart.logs = [
        {
          event: "Ordered",
          date: new Date()
        }
      ];
      this.cart.status = "Pending Payment";
      //GET THE CURRENT ORDER NUMBER AND ASSIGN A NUMBER FOR THIS ORDER
      await this.$dbCon
        .service("service-transactions")
        .find({})
        .then(results => {
          this.cart.order_number = results.total + 1;
        });
      this.cart.mode_of_delivery = this.mode_of_delivery;
      this.cart.mode_of_service = this.mode_of_service;
      this.cart.primary_person_name = this.primary_person_name;
      this.cart.primary_contact_number = this.primary_contact_number;
      // this.cart.secondary_person_name = this.secondary_contact_number;
      // this.cart.secondary_contact_number = this.secondary_contact_number;
      // Save to DB the Product Transaction
      var product_transaction = await this.$dbCon
        .service("service-transactions")
        .create(this.cart);
      // Prepare Payment Data
      this.payment.related_id = product_transaction._id;
      this.payment.recurring_payments[0].status = "Done";
      var payment = await this.$dbCon
        .service("shopper-payments")
        .create(this.payment);
      this.$dbCon.service("cart").remove(this.cart._id);
    },
    onlinePaymentLayaway: async function() {
      this.cart.logs = [
        {
          event: "Ordered",
          date: new Date()
        }
      ];
      this.cart.status = "Pending Payment";
      //GET THE CURRENT ORDER NUMBER AND ASSIGN A NUMBER FOR THIS ORDER
      await this.$dbCon
        .service("service-transactions")
        .find({})
        .then(results => {
          this.cart.order_number = results.total + 1;
        });
      this.cart.mode_of_delivery = this.mode_of_delivery;
      this.cart.mode_of_service = this.mode_of_service;
      this.cart.primary_person_name = this.primary_person_name;
      this.cart.primary_contact_number = this.primary_contact_number;
      this.cart.secondary_person_name = this.secondary_contact_number;
      this.cart.secondary_contact_number = this.secondary_contact_number;
      // Save to DB the Product Transaction
      var product_transaction = await this.$dbCon
        .service("service-transactions")
        .create(this.cart);
      // Prepare Payment Data
      this.payment.related_id = product_transaction._id;
      this.payment.recurring_payments[0].status = "Done";
      var payment = await this.$dbCon
        .service("shopper-payments")
        .create(this.payment);
      this.$dbCon.service("cart").remove(this.cart._id);
    },
    //GETTING PAYMENT RESULT
    onlinePaymentResult: async function(result, info) {
      // console.log("INFO", info);
      // console.log("RESULT", result);

      if (result == "success") {
        this.step = 4;
        if (this.payment_type == "Full Payment") {
          this.payment.status = "Done";
          this.payment.payment_details = info;
          await this.onlinePaymentFullPayment();
        } else if (this.payment_type == "20% Downpayment") {
          this.payment.recurring_payments[0].schedule = new Date();
          this.payment.recurring_payments[0].payment_details = info;
          this.payment.registration_id = info.registrationId;
          this.payment.status = "Pending";
          await this.onlinePaymentDownpayment();
        } else if (this.payment_type == "Layaway") {
          this.payment.recurring_payments[0].schedule = new Date();
          this.payment.recurring_payments[0].payment_details = info;
          this.payment.registration_id = info.registrationId;
          this.payment.status = "Pending";
          await this.onlinePaymentLayaway();
        }
        this.$q.dialog({
          title: "Payment Accepted!",
          message: result
        });
      } else {
        this.$q.dialog({
          title: "Payment Rejected!",
          message: info.result.description
        });
      }
    },
    formatOrderNumber: function(number, length = 7) {
      return number.toString().padStart(length, "0");
    },
    getCartTypeLabel: function(cart) {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Add 1 for correct month
      const year = String(now.getFullYear()).slice(2); // Get the last two digits of the year
      const day = String(now.getDate()).padStart(2, "0"); // Get the day, padded to 2 digits
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const dateTimePart = `${month}${year}${day}${hours}${minutes}${seconds}`; // MMYYDDHHMMSS format
      const label = cart.type === "products" ? "PROD" : "SERV";

      return `${label}${dateTimePart}`;
    },
    getTimeOffset: function() {
      const offset = new Date().getTimezoneOffset();
      const hours = Math.abs(Math.floor(offset / 60));
      const minutes = Math.abs(offset % 60);
      const sign = offset > 0 ? "-" : "+";
      return `${sign}${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
    },

    saveCof: async function() {
      this.$q.loading.show();
      try {
        if (this.mode_of_service == "store_location") {
          this.primary_person_name = `${this.user.fname} ${this.user.lname}`;
          this.primary_contact_number = this.user.mobile_number;
        }
        console.log(this.preparePayment());
        this.cart.checkoutTime = new Date();
        // GENERATING BREAKDOWN
        var breakdown = [];
        var total = 0;
        this.cart.logs = [
          {
            event: "Ordered",
            date: new Date()
          }
        ];
        this.cart.mode_of_service =
          this.mode_of_service == "store_location"
            ? "Store Location"
            : "Designated location";
        //Item Price
        breakdown.push({
          description: "Service",
          amount:
            (this.service.sale_price != ""
              ? this.service.sale_price
              : this.service.regular_price) * this.cart.quantity
        });
        // Delivery fee
        breakdown.push({
          description: "Fuel/Transportation Fee",
          amount: this.delivery_fee
        });
        breakdown.map(result => {
          total += parseInt(result.amount);
        });
        // this.prepareFullPayment(breakdown, total);
        this.cart = {
          ...this.cart,
          ...this.payment
        };
        this.cart.status = "For Acknowledgement";
        this.designationLocation();

        const formatedOrderNumber = this.formatOrderNumber(
          this.cart.order_number
        );
        const orderTypeLabel = this.getCartTypeLabel(this.cart);
        const merchant_reference_id = `ANZ-${orderTypeLabel}-${formatedOrderNumber}`;
        const callback_url = `https://staging.anturaz.io/#/${
          this.cart.type === "products" ? "Orders" : "Reservations"
        }`;
        const checkoutData = {
          data: {
            customer: {
              first_name: this.user.fname,
              last_name: this.user.lname,
              billing_address: {
                line1: this.user.address.house_bldg_st,
                line2: this.user.address.barangay_district,
                city_municipality: this.user.address.city_municipality.name,
                zip: this.user.address.zip_code,
                state_province_region: this.user.address.region.designation,
                country_code: "PH"
              },
              shipping_address: {
                line1: this.designation_location.house_bldg_st,
                line2: this.designation_location.barangay_district,
                city_municipality: this.designation_location.city_municipality,
                zip: this.designation_location.zip_code,
                state_province_region: this.designation_location.region,
                country_code: "PH"
              },
              contact: {
                email: this.user.original_email,
                mobile: this.user.mobile_number
              }
            },
            payment: {
              description: "Payment for a product",
              amount: parseFloat(this.payment.total).toFixed(2),
              currency: "PHP",
              option: "COF",
              merchant_reference_id,
              other_references: ["REF1", "REF22"]
            },
            route: {
              callback_url, // add condition if products or services
              notify_user: true
            },
            time_offset: this.getTimeOffset()
          }
        };
        this.cart.checkout_data = checkoutData;
        // Save to DB the Product Transaction
        var service_transaction = await this.$dbCon
          .service("service-transactions")
          .create(this.cart);
        this.payment.related_id = service_transaction._id;
        var payment = await this.$dbCon
          .service("shopper-payments")
          .create(this.payment);
        this.$dbCon.service("cart").remove(this.cart._id);

        // Email here
        const emailMessage = await servicePurchaseEmail(this.cart);
        const subjectToShopper = "ANTURAZ - Service Transaction Confirmation";
        const userData = {
          email: this.user.original_email
        };
        await emailSender(userData, emailMessage, subjectToShopper);

        const emailMessageVendor = await servicePurchaseEmailToVendor(
          this.cart
        );
        const subjectVendor = "ANTURAZ - You have a new service purchase!";
        const vendorData = {
          email: this.store.original_email
        };
        await emailSender(vendorData, emailMessageVendor, subjectVendor);
        // servicePurchaseEmailToVendor
        this.step = 4;
      } catch (e) {}
      this.$q.loading.hide();
    },

    cashOnFulfillment: async function() {
      const { data: storeSchedRes } = await this.$dbCon
        .service("store-schedule")
        .find({
          query: {
            store_id: this.store._id
          }
        });

      await this.$dbCon
        .service("service-transactions")
        .find({})
        .then(results => {
          this.cart.order_number = results.total + 1;
        });
      const newSchedule = {
        date: this.cart.date_needed,
        status: 0,
        remarks: `RESERVATION#${this.cart.order_number}`,
        transaction_status: "For Acknowledgement",
        disable: true
      };

      if (storeSchedRes.length > 0) {
        if (storeSchedRes[0].schedules.length > 0) {
          const storeSchedule = storeSchedRes[0];
          // Check if the date already exists
          const existingSchedule = storeSchedule.schedules.find(
            sched => sched.date === this.cart.date_needed
          );
          if (existingSchedule) {
            alert("❌ Schedule already exists for this date!");
            console.log(
              "❌ Schedule already exists for:",
              this.cart.date_needed
            );
          } else {
            this.saveCof();
            // Push new schedule if date doesn't exist
            storeSchedRes[0].schedules.push(newSchedule);

            // // Update the store schedule in the database
            await this.$dbCon
              .service("store-schedule")
              .patch(storeSchedRes[0]._id, {
                schedules: storeSchedRes[0].schedules
              });

            console.log("✅ New schedule added:", newSchedule);
          }
        } else {
          this.saveCof();

          storeSchedRes[0].schedules.push(newSchedule);

          await this.$dbCon
            .service("store-schedule")
            .patch(storeSchedRes[0]._id, {
              schedules: storeSchedRes[0].schedules
            });

          console.log("new", newSchedule);
        }
      } else {
        console.error(
          "❌ Store schedule not found for store_id:",
          this.store._id
        );
      }
    },

    //INITIALIZING BANK DEPOSIT PAYMENT
    bankDeposit: async function() {
      //preparing payment
      // console.log(this.preparePayment());
      this.payment.deposit_details = [];
      if (this.payment_type == "Full Payment") {
        this.payment.deadline = this.$addToDate(new Date(), 2, 0);
      } else if (this.payment_type == "20% Downpayment") {
        this.payment.recurring_payments[0].schedule = this.$addToDate(
          new Date(),
          2,
          0
        );
      } else if (this.payment_type == "Layaway") {
        this.payment.recurring_payments[0].schedule = this.$addToDate(
          new Date(),
          2,
          0
        );
      }

      this.cart.logs = [
        {
          event: "Ordered",
          date: new Date()
        }
      ];
      this.cart.status = "Pending Payment";
      //GET THE CURRENT ORDER NUMBER AND ASSIGN A NUMBER FOR THIS ORDER
      await this.$dbCon
        .service("service-transactions")
        .find({})
        .then(results => {
          this.cart.order_number = results.total + 1;
        });
      this.cart.mode_of_delivery = this.mode_of_delivery;
      this.cart.mode_of_service = this.mode_of_service;
      this.cart.primary_person_name = this.primary_person_name;
      this.cart.primary_contact_number = this.primary_contact_number;
      this.cart.secondary_person_name = this.secondary_contact_number;
      this.cart.secondary_contact_number = this.secondary_contact_number;
      // Save to DB the Product Transaction
      var service_transaction = await this.$dbCon
        .service("service-transactions")
        .create(this.cart);
      // Prepare Payment Data
      this.payment.related_id = service_transaction._id;
      var payment = await this.$dbCon
        .service("shopper-payments")
        .create(this.payment);
      this.$dbCon.service("cart").remove(this.cart._id);
      await this.reserveSchedule();
      this.step = 4;
    },
    //RESERVING SCHEDULE
    reserveSchedule: async function() {
      var storeSchedules = {};
      await this.$dbCon
        .service("store-schedule")
        .find({ query: { store_id: this.store._id } })
        .then(results => {
          storeSchedules = results.data[0];
        });
      // console.log("1", storeSchedules);
      storeSchedules.schedules.push({
        date: this.cart.date_needed,
        status: 0,
        remarks: "RESERVATION-" + this.cart.order_number
      });
      // console.log("2", storeSchedules);
      // console.log("STOREEE", storeSchedules);
      await this.$dbCon
        .service("store-schedule")
        .patch(storeSchedules._id, storeSchedules);
    },

    getStoreFuelFees: async function() {
      try {
        const { data } = await this.$dbCon.service("store-fuel-delivery").find({
          query: {
            store_id: this.service.store_id
          }
        });
        this.store_fuel_delivery_charge = data[0].fuel_delivery;

        const isTrue = this.store_fuel_delivery_charge.some(
          v => v.location == this.$local.getItem("mun")
        );

        if (!isTrue) this.isAddressTrue = true;
      } catch (e) {
        console.log(e);
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
    filterUserCityMunicipality: function(val, update, abort) {
      if (val === "") {
        update(() => {
          this.userMunicipalities = this.userListMunicipalities;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.userMunicipalities = this.userListMunicipalities.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  },
  async mounted() {
    this.$dbCon
      .service("payment-utilities")
      .find({})
      .then(results => {
        this.payment_utilities = results.data[0];
      });
    this.user = await this.$getUser();
    this.getPayments();
    await this.$dbCon
      .service("cart")
      .get(this.$route.params.cart)
      .then(cart => {
        this.cart = cart;
        this.$dbCon
          .service("services")
          .get(cart.item_id)
          .then(service => {
            this.house_bldg_st = "";
            this.barangay_district = "";
            this.city_municipality = "";
            this.state_province = "";
            this.region = "";
            this.zip_code = "";

            this.service = service;
          });
      })
      .catch(e => {
        this.$router.push("/Orders");
      });

    this.store = await this.$dbCon.service("store").get(this.cart.store_id);
    if (this.store.market_areas.includes(this.user.address.city_municipality)) {
      // console.log(this.user.address.city_municipality);
      // this.house_bldg_st = this.user.address.house_bldg_st;
      // this.barangay_district = this.user.address.barangay_district;
      // this.city_municipality = this.user.address.city_municipality;
      // this.state_province = this.user.address.state_province;
      // this.zip_code = this.user.address.zip_code;
    } else {
      // this.city_municipality = this.store.market_areas[0];
    }
    //GET DELIVERY DETAILS
    this.enable_layaway_dp =
      this.$getDateDiff(
        this.cart.date_needed,
        this.$addToDate(new Date(), 5, 0),
        "months"
      ) >= 3;
    if (
      this.user.address.region == "" &&
      this.user.address.state_province == "" &&
      this.user.address.house_bldg_st == "" &&
      this.user.address.barangay_district == "" &&
      this.user.address.city_municipality == "" &&
      this.user.address.zip_code == ""
    ) {
      console.log("bobo");
      this.showUserAddressForm = true;
    }
    this.getStoreFuelFees();
  },
  watch: {
    city_municipality: {
      handler: function(newVal) {
        if (!this.cart.gift_registry_data) {
          if (newVal) {
            this.isAddressTrue = !this.store_fuel_delivery_charge.some(
              v => v.location == newVal.name
            );
          }
        }

        if (newVal) {
          this.delivery_fee = this.store_fuel_delivery_charge.find(
            delivery => delivery.location == newVal.name
          ).fuel_transpo;
        }
      },
      deep: true
    },

    state_province: {
      handler: function(newVal, oldVal) {
        const municipalitiesNewLists = this.$municipalities.filter(
          municipality => municipality.province == newVal.name
        );
        this.municipalities = municipalitiesNewLists;
        this.listMunicipalities = municipalitiesNewLists;
      },
      deep: true
    },

    region: {
      handler: function(newVal, oldVal) {
        const listProvince = this.$provinces.filter(
          province => province.region == newVal.designation
        );
        if (oldVal.length > 0) {
          // console.log(newVal);
          this.state_province = "";
          this.city_municipality = "";
          this.municipalities = [];
          this.listMunicipalities = [];
        }

        this.provinces = listProvince;
        // this.city_municipality = [];
        this.market_areas_option = [];
        this.municipalities = [];
        this.listMunicipalities = [];
      },
      deep: true
    },
    // city_municipality: async function() {
    //   this.delivery_fee = await this.$getDeliveryTranspoFee(
    //     this.store._id,
    //     this.city_municipality,
    //     "fuel_transpo"
    //   );
    // }
    mode_of_service: {
      handler: function(newVal) {
        if (newVal == "store_location") {
          return (this.isAddressTrue = false);
        } else {
          const fuel_delivery = this.store_fuel_delivery_charge;
          this.isAddressTrue = !fuel_delivery.some(
            data => data.location == this.city_municipality.name
          );
        }
      },
      deep: true
    },
    isShopperAddressComplete(newValue) {
      if (newValue) {
        this.showUserAddressForm = false; // Hide form when all fields are filled
      }
    },

    "user.address.region": {
      handler: function(newVal, oldVal) {
        const listProvince = this.$provinces.filter(
          province => province.region == newVal.designation
        );
        this.userProvinces = listProvince;

        if (oldVal.length > 0) {
          // console.log(newVal);
          this.user.address.state_province = "";
          this.user.address.city_municipality = "";
          this.userMunicipalities = [];
          this.userListMunicipalities = [];
        }
        // // this.city_municipality = [];
        this.market_areas_option = [];
        this.userMunicipalities = [];
        this.userListMunicipalities = [];
      },
      deep: true
    },

    "user.address.state_province": {
      handler: function(newVal, oldVal) {
        const municipalitiesNewLists = this.$municipalities.filter(
          municipality => municipality.province == newVal.name
        );
        this.userMunicipalities = municipalitiesNewLists;
        this.userListMunicipalities = municipalitiesNewLists;
      },
      deep: true
    },

    "user.address": {
      deep: true,
      handler() {
        this.isAddressTrue = this.isShopperAddressComplete();
      }
    }
  }
};
</script>

<style>
.q-field--error .q-field__bottom {
  padding-top: 3px;
}
</style>
