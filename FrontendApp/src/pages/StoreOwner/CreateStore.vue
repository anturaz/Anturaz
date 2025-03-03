<template>
  <div
    class="bg-primary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-btn
            icon="arrow_left"
            label="home"
            color="primary"
            flat
            @click="$router.push('/')"
          />
          <q-card-section class="column items-center">
            <img
              :src="$appLink + '/uploads/admin/logo.png'"
              style="width: 80px"
            />

            <div class="text-h5 text-black col-12">Anturaz Store Owner</div>
            <div class="text-subtitle2 text-black col-12">
              Create your store
            </div>
          </q-card-section>
          <q-card-section v-if="error.length != 0">
            <q-banner rounded class="bg-red text-white">
              <template v-slot:avatar>
                <q-icon name="error" color="white" />
              </template>
              <ul>
                <li v-for="(err, index) in error" v-bind:key="index">
                  {{ err }}
                </li>
              </ul>
            </q-banner>
          </q-card-section>
          <q-card-section class="text-black">
            <q-input label="Email Address" v-model="email" />
            <q-input label="Password" type="password" v-model="password" />
            <q-input label="Store Name" v-model="store_name" />
            <q-select
              v-model="categories"
              use-chips
              use-input
              multiple
              fill-input
              input-debounce="0"
              @filter="filterCategories"
              :options="categories_option"
              label="Categories"
              @focus="
                () => {
                  categories_done = true;
                }
              "
              @blur="
                () => {
                  categories_done = false;
                }
              "
              ref="categories"
              hint="You may select one or multiple"
              :placeholder="!categories_done ? '' : 'search..'"
            >
              <template v-slot:append>
                <q-item>
                  <q-item-section class="text-grey">
                    <q-btn
                      label="done"
                      unelevated
                      color="primary"
                      v-show="$q.screen.lt.md && categories_done"
                      @click="$refs.categories.blur"
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
              v-model="market_areas"
              use-chips
              use-input
              multiple
              fill-input
              input-debounce="0"
              :options="market_areas_option"
              @filter="filterMarketPlace"
              label="Market Areas"
              @focus="
                () => {
                  market_areas_done = true;
                }
              "
              @blur="
                () => {
                  market_areas_done = false;
                }
              "
              :placeholder="!market_areas_done ? '' : 'search..'"
              hint="You may select one or multiple"
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
          </q-card-section>

          <q-card-section class="text-grey text-italic q-mt-md">
            <q-checkbox dense v-model="agree" />&nbsp;&nbsp;I agree to the

            <a
              class="text-primary cursor-pointer"
              @click="$router.push('/TermsOfUse')"
              style="text-decoration: underline;"
            >
              terms of use
            </a>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Create Store" @click="validate" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="creatingStoreDialog" :persistent="true">
      <q-card>
        <q-card-section align="center">
          <div>
            <q-spinner-facebook color="primary" size="6em" />
          </div>
        </q-card-section>
        <q-card-section align="center">
          <div class="text-h6">Please wait..</div>
        </q-card-section>

        <q-card-section class="q-pt-none"
          >We are creating your store.</q-card-section
        >
      </q-card>
    </q-dialog>

    <q-dialog v-model="modals.termsOfUse" persistent>
      <q-card style="max-width: 600px; max-height: 90vh; overflow: auto;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Terms of Use</div>
        </q-card-section>
        <q-card-section
          style="overflow-y: auto; max-height: 70vh; padding: 1rem;"
        >
          <div>
            <h5 class="text-primary">General Notice</h5>
            <p>
              The website www.anturaz.io is a copyrighted work belonging to
              OneStras Technologies Corp. Certain features of the Site may be
              subject to additional guidelines, terms, or rules, which will be
              posted on the Site in connection with such features. All such
              additional terms, guidelines, and rules are incorporated by
              reference into these Terms.
            </p>

            <h5 class="text-primary">1. Acceptance of Terms</h5>
            <p>
              Welcome to Anturaz Event Marketplace ("Anturaz," "we," "us," or
              "our"). By accessing or using our platform ("Site"), you agree to
              comply with and be bound by these Terms of Use ("Terms"). Please
              read these Terms carefully before using our services.
            </p>

            <h5 class="text-primary">2. Description of Services</h5>
            <p>
              Anturaz is a one-stop-shop event marketplace that connects event
              suppliers, celebrants, and guests. Our platform enables users to
              discover, purchase, and list event supply items. Our Services
              include (a) the Site, (b) services provided through the Site and
              Anturaz client software, and (c) all related information, pages,
              features, data, text, images, photographs, graphics, music,
              sounds, video, messages, tags, content, programming, software, and
              application services ("Content").
            </p>

            <h5 class="text-primary">3. User Accounts</h5>
            <p>
              To access certain features of our Services, you may need to create
              an account. You are responsible for maintaining the
              confidentiality of your account information and for all activities
              that occur under your account.
            </p>

            <h5 class="text-primary">4. User Conduct</h5>
            <p>
              You agree to use our Services only for lawful purposes. You will
              not engage in any activity that is harmful, offensive, or
              interferes with the operation of our Services or the enjoyment of
              other users.
            </p>

            <h5 class="text-primary">5. Event Supply Items</h5>
            <p>
              Users may create store on our platform. By creating a store, you
              agree to provide accurate and complete information about the event
              supply items and to comply with all applicable laws and
              regulations.
            </p>

            <h5 class="text-primary">6. Payments and Refunds</h5>
            <p>
              All payments for event supply items or services are processed
              through our secure payment system. Refunds, if applicable, will be
              handled in accordance with our refund policy.
            </p>

            <h5 class="text-primary">7. Intellectual Property</h5>
            <p>
              All Content available on our Site is the property of Anturaz or
              its licensors and is protected by intellectual property laws. You
              may not use, reproduce, or distribute any Content without our
              prior written permission.
            </p>

            <h5 class="text-primary">8. Privacy Policy</h5>
            <p>
              Your use of our Services is also governed by our Privacy Policy,
              which describes how we collect, use, and protect your personal
              information.
            </p>

            <h5 class="text-primary">8.1. Information Collection</h5>
            <p>
              We collect personal information that you provide when creating an
              account, listing event supply items, or interacting with our
              Services. This may include your name, contact details, payment
              information, and other relevant data.
            </p>

            <h5 class="text-primary">8.2. Use of Information</h5>
            <p>
              We use the information collected to provide and improve our
              Services, process transactions, communicate with users, and for
              other administrative purposes. We may also use your information
              for marketing and promotional purposes, with your consent where
              required by law.
            </p>

            <h5 class="text-primary">8.3. Information Sharing</h5>
            <p>
              We do not share your personal information with third parties
              except as necessary to provide our Services, comply with legal
              obligations, or protect our rights. This may include sharing
              information with payment processors, service providers, and law
              enforcement agencies.
            </p>

            <h5 class="text-primary">8.4. Data Security</h5>
            <p>
              We implement reasonable security measures to protect your personal
              information from unauthorized access, use, or disclosure. However,
              no method of transmission over the internet or electronic storage
              is completely secure, so we cannot guarantee absolute security.
            </p>

            <h5 class="text-primary">8.5. Your Rights</h5>
            <p>
              You have the right to access, correct, or delete your personal
              information. You may also object to or restrict certain types of
              data processing and request data portability. To exercise these
              rights, please contact us at helpdesk@anturaz.io.
            </p>

            <h5 class="text-primary">9. Limitation of Liability</h5>
            <p>
              Anturaz is not responsible for any damages or losses arising from
              your use of our Services. We do not guarantee the accuracy,
              completeness, or availability of any event supply items listed on
              our platform.
            </p>

            <h5 class="text-primary">10. Changes to Terms</h5>
            <p>
              We may update these Terms from time to time. We will notify you of
              any changes by posting the new Terms on our Site. Your continued
              use of our Services after such changes will constitute your
              acceptance of the new Terms.
            </p>

            <h5 class="text-primary">11. Contact Us</h5>
            <p>
              If you have any questions or concerns about these Terms, please
              contact us at helpdesk@anturaz.io.
            </p>

            <h5 class="text-primary">12. Store Creation Policy</h5>
            <p>
              <strong>12.1. Eligibility</strong> To create a store on the
              Anturaz platform, you must have an account in good standing. You
              must provide accurate and complete information about yourself and
              your store as part of the registration process.
            </p>
            <p>
              <strong>12.2. Store Setup</strong> When setting up your store, you
              must comply with all applicable laws and regulations. This
              includes providing truthful and complete information regarding
              your business, the event supply items you list, and any associated
              policies such as cancellation or refund policies.
            </p>
            <p>
              <strong>12.3. Content Standards</strong> All content you upload to
              your store, including event supply item descriptions, images, and
              videos, must be lawful, accurate, and not misleading. Content must
              not infringe on the rights of third parties, including
              intellectual property rights.
            </p>
            <p>
              <strong>12.4. Prohibited Items</strong> You may not list items
              that are illegal, hazardous, or otherwise prohibited by our
              policies. This includes but is not limited to items that promote
              violence, discrimination, or any form of illegal activity.
            </p>
            <p>
              <strong>12.5. Store Maintenance</strong> You are responsible for
              maintaining the accuracy of your store's content and updating
              information as needed. This includes keeping event supply item
              details, pricing, and availability up to date.
            </p>
            <p>
              <strong>12.6. Fees and Payments</strong> By creating a store, you
              agree to the fees associated with listing and selling on the
              Anturaz platform. Fees are detailed in our Commission and Service
              Fee table, and you are responsible for understanding and complying
              with these fees.
            </p>

            <h5 class="text-primary">
              13. Relationship Between Store Owners and Shoppers
            </h5>
            <p>
              <strong>13.1. Independent Agreement</strong> The agreement for the
              sale or purchase of event supply items or services is solely
              between the store owner and the shopper. Anturaz is not a party to
              this agreement and does not have any responsibilities or
              liabilities in relation to the transaction.
            </p>
            <p>
              <strong>13.2. Limited Role of Anturaz</strong> Anturaz acts solely
              as an intermediary by providing the platform that facilitates
              transactions between store owners and shoppers. We do not
              guarantee the quality, safety, or legality of the event supply
              items listed, nor do we ensure that store owners and shoppers will
              actually complete a transaction.
            </p>
            <p>
              <strong>13.3. Dispute Resolution</strong> Any disputes arising
              between store owners and shoppers must be resolved between the
              parties involved. While Anturaz may offer a platform for feedback
              and ratings, it does not mediate disputes directly. However, we
              encourage users to communicate openly and resolve issues amicably.
            </p>
            <p>
              <strong>13.4. Return/Refund Policy</strong> Store owners and
              shoppers are governed by Anturaz Return/Refund Policy and Anturaz
              will serve only as processor.
            </p>
            <p>
              <strong>13.5. Liability Disclaimer</strong> Anturaz is not liable
              for any direct, indirect, incidental, or consequential damages
              arising out of or in connection with the transactions conducted
              through the platform. This includes, but is not limited to, issues
              related to cancellations, misrepresentations, or any other matters
              arising from the agreements between store owners and shoppers.
            </p>

            <h5 class="text-primary">14. Termination of Accounts</h5>
            <p>
              <strong>14.1. Termination Rights</strong> Anturaz reserves the
              right to terminate your account at any time, without prior notice,
              if we believe you have violated these Terms of Use, engaged in
              fraudulent or illegal activities, or otherwise acted in a manner
              that could harm the reputation or operations of Anturaz.
            </p>
            <p>
              <strong>14.2. Consequences of Termination</strong> If your account
              is terminated, you will lose access to your account and any data
              or content associated with it. Anturaz will not be liable to you
              or any third party for any termination of your account or access
              to the Services.
            </p>
            <p>
              <strong>14.3. Reinstatement</strong> Reinstatement of terminated
              accounts is at the sole discretion of Anturaz. If you believe your
              account was terminated in error, you may contact us to request a
              review of your account status.
            </p>

            <h5 class="text-primary">15. Entire Terms</h5>
            <p>
              These Terms constitute the entire agreement between you and us
              regarding the use of the Site. Our failure to exercise or enforce
              any right or provision of these Terms shall not operate as a
              waiver of such right or provision. The section titles in these
              Terms are for convenience only and have no legal or contractual
              effect. The word "including" means "including without limitation".
              If any provision of these Terms is held to be invalid or
              unenforceable, the other provisions of these Terms will be
              unimpaired, and the invalid or unenforceable provision will be
              deemed modified so that it is valid and enforceable to the maximum
              extent permitted by law. Your relationship to Anturaz is that of
              an independent contractor, and neither party is an agent or
              partner of the other. These Terms, and your rights and obligations
              herein, may not be assigned, subcontracted, delegated, or
              otherwise transferred by you without Anturaz’ prior written
              consent, and any attempted assignment, subcontract, delegation, or
              transfer in violation of the foregoing will be null and void.
              Anturaz may freely assign these Terms. The terms and conditions
              set forth in these Terms shall be binding upon assignee.
            </p>

            <h5 class="text-primary">16. Copyright/Trademark Information</h5>
            <p>
              Copyright © OneStras Technologies Corp. All rights reserved. All
              trademarks, logos, and service marks displayed on the Site are our
              property or the property of other third-parties. You are not
              permitted to use these Marks without our prior written consent or
              the consent of such third party which may own the Marks.
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
import { provinceList } from "../../data-set/province.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      store_name: "",
      categories: [],
      categories_option: [],
      categories_list: [],
      market_areas: [],
      market_areas_option: [],
      agree: false,
      error: [],
      creatingStoreDialog: false,
      market_areas_done: false,
      categories_done: false,
      selected_municipalities: [],
      modals: {
        termsOfUse: false
      }
    };
  },

  watch: {
    market_areas: {
      handler: function(newVal, oldVal) {
        // console.log(this.$municipalities);
        // console.log(newVal);

        const municipalitiesArr = [];
        const selectedMun = this.$municipalities.map(municipality => {
          if (newVal.includes(municipality.province)) {
            municipalitiesArr.push(municipality);
          }
        });
        this.selected_municipalities = municipalitiesArr;
      },
      deep: true
    }
  },
  methods: {
    showModal(modalName) {
      this.$set(this.modals, modalName, true);
    },
    filterMarketPlace: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.market_areas_option = provinceList.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterCategories: function(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.categories_option = this.categories_list.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    normalizeEmail(email) {
      const [localPart, domain] = email.split("@");

      const normalizedLocalPart = localPart.toLowerCase();
      const normalizedDomain = domain.toLowerCase();

      return `${normalizedLocalPart}@${normalizedDomain}`;
    },

    normalizeStoreName(storeName) {
      return storeName
        .toLowerCase()
        .split(" ")
        .join("-");
    },

    validate: async function() {
      this.error = [];
      if (this.email.trim() == "") {
        this.error.push("Email field is required.");
      } else {
        this.$q.loading.show();
        await this.$StartTemporaryAuthentication();
        await this.$dbCon
          .service("users")
          .find({
            query: {
              email: this.email
            }
          })
          .then(result => {
            if (result.data.length != 0) {
              this.error.push("Email Address has already taken.");
            }
          });
        await this.$EndTemporaryAuthentication();
      }
      if (this.password.trim() == "") {
        this.error.push("Password field is required.");
      }
      if (this.store_name.trim() == "") {
        this.error.push("Store Name field is required.");
      } else {
        const normalizeStoreName = this.normalizeStoreName(this.store_name);
        await this.$dbCon
          .service("store")
          .find({
            query: {
              normalize_store_name: normalizeStoreName
            }
          })
          .then(result => {
            if (result.data.length != 0) {
              this.error.push("Store Name has already taken.");
            }
          });
      }
      if (this.categories.length == 0) {
        this.error.push("Categories field is required");
      }
      if (this.market_areas.length == 0) {
        this.error.push("Market Areas field is required");
      }
      if (this.agree == false) {
        if (this.error.length == 0) {
          this.error.push(
            "To proceed, you must agree to the terms and conditions."
          );
        }
      }
      this.$q.loading.hide();
      if (this.error.length == 0) {
        this.submit();
      }
    },

    submit: async function() {
      this.creatingStoreDialog = true;
      await this.$StartTemporaryAuthentication();
      // Creating Store Record
      const newName = this.normalizeStoreName(this.store_name);
      var store = await this.$dbCon.service("store").create({
        store_name: this.store_name,
        original_email: this.email,
        createdAt: new Date(),
        normalize_store_name: newName,
        store_details: "",
        logo: "",
        categories: this.categories,
        market_areas: this.market_areas,
        maximum_products: 5,
        maximum_services: 5,
        published: false,
        current_step: 1,
        business_type: "Self-Employed",
        mobile_number: "",
        landline_number: "",
        house_bldg_st: "",
        barangay_district: "",
        city_municipality: "",
        state_province: "",
        zip_code: "",
        country: "Philippines",
        bank_name: "",
        account_name: "",
        account_number: "",
        government_id: "",
        dti_sec_registration_number: "",
        dti_sec_registration_certificate: "",
        show_owners_details: true,
        giftwrapping: {
          colors: ["#3333ff", "#ff33ff", "#cdcdcd", "#ff0000"],
          charges: {
            small: 0,
            medium: 0,
            large: 0,
            extra_large: 0
          }
        },
        links: {
          facebook: "",
          instagram: "",
          pinterest: "",
          youtube: "",
          vimeo: ""
        },
        gallery: [],
        access: true,
        unique_link: this.store_name
          .toLowerCase()
          .split(" ")
          .join("-")
      });
      //Creating Fuel Delivery Record
      const fuel_delivery = this.selected_municipalities.map(municipality => {
        return {
          location: municipality.name,
          province: municipality.province,
          fuel_transpo: 0,
          delivery: 0
        };
      }); // new function - elli
      // var fuel_delivery = [];
      // await provinceList.map(province => {
      //   if (province == "Nationwide") {
      //     return;
      //   }
      //   fuel_delivery.push({
      //     location: province,
      //     fuel_transpo: 0,
      //     delivery: 0
      //   });
      // });
      // old function
      await this.$dbCon.service("store-fuel-delivery").create({
        store_id: store._id,
        fuel_delivery: fuel_delivery
      });
      //Creating Store Inventory 5 Free Items
      await this.$dbCon.service("item-subscriptions").create({
        store_id: store._id,
        items: 5,
        status: "Free"
      });
      await this.$dbCon.service("gallery-subscription").create({
        store_id: store._id,
        mb: 5,
        status: "Free"
      });
      //Creating Store Owner System user account
      const normalizedEmail = this.normalizeEmail(this.email);
      await this.$dbCon.service("users").create({
        store_id: store._id,
        email: normalizedEmail,
        original_email: this.email,
        password: this.password,
        fname: "",
        lname: "",
        position_in_the_company: "",
        store_account_type: "Owner",
        permission: [
          "Store Owner Management",
          "Giftwrapping Services Management",
          "Delivery Management",
          "Fuel/Transpo Management",
          "Booking Services Management",
          "Portfolio Management",
          "Add products/services",
          "Delete products/services",
          "Add/Subract Inventory",
          "Advertise products/services",
          "Store Management",
          "User Management",
          "Reports",
          "Ratings and Reviews",
          "Security and Privacy Setting"
        ],
        system_user_type: "Store Owner",
        user_type: "Owner",
        position: "Owner",
        access: true
      });
      //Creating Store Advertisment Record
      await this.$dbCon.service("store-advertisment").create({
        store_id: store._id,
        subscriptions: []
      });
      //Creating Store Schedule Record
      await this.$dbCon.service("store-schedule").create({
        store_id: store._id,
        schedules: []
      });
      await this.$EndTemporaryAuthentication();
      this.$StoreUserLogin(normalizedEmail, this.password);
      // Sending Confirmation Email (MAY PROBLEM)
      // await this.$axios({
      //   method: "GET",
      //   url: this.$appLink + "/CreateStoreConfirmation?id=" + result._id
      // });
    }
  },
  mounted() {
    this.market_areas_option = provinceList;
    this.$dbCon
      .service("categories")
      .find({
        query: {
          $select: ["category_name", "classification"],
          $sort: {
            category_name: 1
          }
        }
      })
      .then(results => {
        results.data.map(category => {
          this.categories_option.push(category.category_name);
          this.categories_list.push(category.category_name);
        });
      });
  }
};
</script>

<style scoped>
.q-card {
  width: 360px;
}
</style>
