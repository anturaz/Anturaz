<template>
  <div>
    <q-layout class="vertical-center" :class="$q.screen.lt.md ? '' : ''">
      <CategoriesSection
        :style="
          !$q.screen.lt.md
            ? 'position: absolute; left:100px; top: 80px; max-width:300px'
            : ''
        "
      />
      <div class="q-pt-sm"></div>
      <!-- <q-dialog v-model="showDialog" v-if="!$q.screen.lt.md">
        <div class="transparent-dialog primary-border ">
          <br />
          <span class="text-h4">Important Notice! </span>
          <br />
          <br />
          <span class="text-h6 text-weight-regular">
            We are moving the grand launching <br />
            on February 25, 2025 to comply with
            <br />
            payment regulatory requirements.
          </span>
          <br />
          <br />
          <span class="text-h6 text-weight-regular">
            We apologize for this inconvenience.
          </span>
          <br />

          <div class="q-gutter-md q-py-md">
            <q-btn
              round
              icon="fab fa-facebook"
              style="background-color: #3b5998; color: white;"
              @click="openLink('https://www.facebook.com/anturazmarketplace')"
            />
            <q-btn
              round
              icon="fab fa-instagram"
              style="background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); color: white;"
              @click="openLink('https://www.instagram.com/anturaz.io/')"
            />
            <q-btn
              round
              style="background-color: #010101; color: white;"
              @click="openLink('https://www.tiktok.com/@anturaz.io')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                style="width: 1em; height: 1em; fill: white;"
              >
                <path
                  d="M448,209.2a294.1,294.1,0,0,1-82.1-11.3v83.8a176.2,176.2,0,0,1-176,176.2A176.2,176.2,0,0,1,13.8,281.7,176.2,176.2,0,0,1,190,105.5v83.8a92.4,92.4,0,0,0-92.4,92.4,92.4,92.4,0,0,0,92.4,92.4,92.4,92.4,0,0,0,92.4-92.4V0h83.8a294.1,294.1,0,0,0,11.3,82.1A294.1,294.1,0,0,0,448,209.2Z"
                />
              </svg>
            </q-btn>
          </div>
          <div class="q-gutter-md q-py-md">
            <q-btn
              rounded
              color="primary"
              class="primary-border "
              @click="storeRegisterLink()"
            >
              <span class="text-black">Create Your Store</span>
            </q-btn>

            <q-btn
              rounded
              class="primary-border"
              label="Learn More"
              @click="showModal('aboutUs')"
            />
          </div>
        </div>
      </q-dialog> -->

      <!-- Card for mobile view -->
      <q-card
        v-if="$q.screen.lt.md"
        class="q-ma-md   primary-border "
        v-show="false"
      >
        <!-- <q-input
          square
          outlined
          :value="$route.query.query"
          v-model="searchquery"
          label="What are you looking for?"
          style="min-width:300px;background-color:white !important"
          dense
        /> -->

        <q-card-section v-show="false">
          <div class="row justify-center">
            <div class="col-12 flex justify-center items-center">
              <span class="text-h5">Important Notice! </span>
            </div>
            <!-- <div class="col-12 flex justify-center items-center">
              <span class="text-h5 text-weight-bold">February 2025</span>
            </div> -->
          </div>

          <div class="row justify-center q-pt-sm">
            <div class="col-12  flex justify-center items-center">
              <span class="text-body1 text-weight-regular">
                We are moving the grand launching <br />
                on February 25, 2025 to comply with <br />
                payment regulatory requirements.
              </span>
            </div>
          </div>

          <div class="row justify-center q-pt-sm q-pb-sm">
            <div class="col-12 flex justify-center items-center">
              <span class="text-body1 text-weight-regular">
                We apologize for this inconvenience.
              </span>
            </div>
          </div>
          <!-- <span class="text-h6 text-weight-regular">
            All shops registered will be visible to the <br />public during the
            grand launching.
          </span> -->

          <div class="row justify-center">
            <div class="col-12 q-pa-sm flex justify-center">
              <q-btn
                rounded
                color="primary"
                class="primary-border "
                @click="storeRegisterLink()"
              >
                <span class="text-black">Create Your Store</span>
              </q-btn>
            </div>

            <div class="col-12 flex justify-center">
              <q-btn
                rounded
                class="primary-border"
                label="Learn More"
                @click="showModal('aboutUs')"
              />
            </div>
          </div>

          <div class="row justify-center">
            <div class="col-12 flex justify-center">
              <div class="q-gutter-md q-py-md">
                <q-btn
                  round
                  size="sm"
                  icon="fab fa-facebook"
                  style="background-color: #3b5998; color: white;"
                  @click="
                    openLink('https://www.facebook.com/anturazmarketplace')
                  "
                />
                <q-btn
                  round
                  size="sm"
                  icon="fab fa-instagram"
                  style="background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); color: white;"
                  @click="openLink('https://www.instagram.com/anturaz.io/')"
                />
                <q-btn
                  round
                  size="sm"
                  style="background-color: #010101; color: white;"
                  @click="openLink('https://www.tiktok.com/@anturaz.io')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    style="width: 1em; height: 1em; fill: white;"
                  >
                    <path
                      d="M448,209.2a294.1,294.1,0,0,1-82.1-11.3v83.8a176.2,176.2,0,0,1-176,176.2A176.2,176.2,0,0,1,13.8,281.7,176.2,176.2,0,0,1,190,105.5v83.8a92.4,92.4,0,0,0-92.4,92.4,92.4,92.4,0,0,0,92.4,92.4,92.4,92.4,0,0,0,92.4-92.4V0h83.8a294.1,294.1,0,0,0,11.3,82.1A294.1,294.1,0,0,0,448,209.2Z"
                    />
                  </svg>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-layout>
    <FeaturedStoresSection />
    <!-- <RecommendedProducts /> -->

    <Recommended />

    <!-- Button to open the dialog -->

    <!-- Transparent Dialog -->

    <q-dialog v-model="modals.aboutUs" persistent>
      <q-card style="max-width: 600px; max-height: 90vh; overflow: auto;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">About Us</div>
        </q-card-section>
        <q-card-section
          style="overflow-y: auto; max-height: 70vh; padding: 1rem;"
        >
          <div>
            <p>
              <strong>Anturaz</strong> is a comprehensive event marketplace that
              connects celebrants and suppliers from A to Z. It addresses the
              prevalent social issue of online scams, providing a reliable
              platform that protects both service providers and clients from
              fraud, thereby reducing frustrations and potential legal disputes.
            </p>

            <p>
              It has an easy online payment feature using credit/debit cards or
              digital wallets like <strong>GCash</strong> and
              <strong>Maya</strong>.
            </p>

            <p>
              <strong>Anturaz</strong> also offers an online gift registry
              system where celebrants can create a list of desired gifts for
              special occasions. This system helps guests choose gifts that the
              recipient truly wants and avoids duplicates. Guests may avail of
              gift-wrapping services and ask the supplier to deliver the gift
              directly to the event venue or a designated address.
            </p>

            <h5 class="text-primary">Product and Service Categories</h5>
            <p>
              These are the categories of products and services sold at
              <strong>Anturaz</strong> through the shops created by the
              suppliers:
            </p>
            <ul>
              <li>Bridal Chair</li>
              <li>Bridal or Service Car</li>
              <li>Cakes & Pastries</li>
              <li>Catering</li>
              <li>Costume & Party Needs</li>
              <li>Event Organizer</li>
              <li>Event Venue</li>
              <li>Flowers & Bouquets</li>
              <li>Gifts</li>
              <li>Giveaways & Souvenirs</li>
              <li>Gowns & Accessories</li>
              <li>Hair & Makeup</li>
              <li>Host/EMCEE</li>
              <li>Hotel & Travel</li>
              <li>Mobile Bar</li>
              <li>Musician</li>
              <li>Photo Booth</li>
              <li>Rings</li>
              <li>Salon & Spa</li>
              <li>Sound System</li>
              <li>Suits & Accessories</li>
              <li>Video & Photography</li>
              <li>Wedding Planner</li>
            </ul>

            <h5 class="text-primary">For Assistance</h5>
            <p>For assistance and clarifications, please contact us at:</p>
            <ul>
              <li>
                Email:
                <a href="mailto:helpdesk@anturaz.io">helpdesk@anturaz.io</a>
              </li>
              <li>WhatsApp: 0962 126 0781</li>
            </ul>

            <h5 class="text-primary">Ownership</h5>
            <p>
              <strong>Anturaz.io</strong> is owned and operated by
              <strong>OneStras Technologies Corp.</strong> All rights reserved.
            </p>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { QDialog, QBtn } from "quasar";
import FeaturedPhotosSection from "pages/Shopper/Home/FeaturedPhotos.vue";
import CategoriesSection from "pages/Shopper/Home/Categories.vue";
import FeaturedStoresSection from "pages/Shopper/Home/FeaturedStores.vue";
import RecommendedServices from "pages/Shopper/Home/RecommendedServices.vue";
import RecommendedProducts from "pages/Shopper/Home/RecommendedProducts.vue";
import Recommended from "pages/Shopper/Home/Recommended.vue";

export default {
  components: {
    FeaturedPhotosSection,
    CategoriesSection,
    FeaturedStoresSection,
    RecommendedServices,
    RecommendedProducts,
    Recommended,
    QDialog,
    QBtn
  },
  data() {
    return {
      data: [],
      showDialog: true,
      modals: {
        learnMore: false
      }
    };
  },
  methods: {
    showModal(modalName) {
      this.$set(this.modals, modalName, true);
    },
    storeRegisterLink() {
      const link =
        this.$appLink == "http://localhost:8081"
          ? "http://localhost:8080"
          : this.$appLink;

      window.open(`${link}#/StoreOwner/CreateStore`, "_blank");
    },

    openLink(link) {
      window.open(link, "_blank");
    },
    downloadFile() {
      const link = `${this.$appLink}/uploads/admin/Learn-More-by-Anturaz.docx`;
      window.open(link, "_blank");
    }
  },
  mounted() {
    this.$dbCon
      .service("categories")
      .find({})
      .then(results => {
        this.data = results.data;
      });
  }
};
</script>

<style scoped>
.transparent-dialog {
  background: rgba(255, 255, 255, 0.7); /* Semi-transparent background */
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.primary-border {
  border: 2px solid rgb(216, 169, 87); /* Primary color border */
}

.q-layout {
  min-height: 100vh !important; /* Adjust height for better mobile experience */
}
@media (max-width: 600px) {
  .q-layout {
    min-height: 0vh !important; /* Adjust height for better mobile experience */
  }
}
</style>
