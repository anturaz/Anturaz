<template>
  <div>
    <!-- style="line-height: 100vh;" -->
    <q-layout class="bg-image" view="lHh Lpr lFf">
      <div
        class=" q-gutter-md row  justify-between bg-black"
        v-if="!$q.screen.lt.md"
      >
        <q-bar style="width: 100%;" class="bg-black text-white">
          <div class="non-selectable">
            <q-btn
              dense
              readonly
              flat
              label="THE FIRST ONE-STOP-SHOP EVENT MARKETPLACE"
              align="center"
              class="text-primary"
            />
          </div>
          <q-space />
          <div class="text-right">
            <q-btn
              dense
              flat
              icon="fab fa-facebook"
              @click="openLink('https://www.facebook.com/anturazmarketplace')"
            >
            </q-btn>

            <q-btn
              dense
              flat
              icon="fab fa-instagram"
              @click="openLink('https://www.instagram.com/anturaz.io/')"
            >
            </q-btn>

            <q-btn
              dense
              flat
              @click="openLink('https://www.tiktok.com/@anturaz.io')"
            >
              <q-avatar size="20px">
                <img
                  src="../assets/tiktok_logo.png"
                  style="filter: invert(1);"
                />
              </q-avatar>
            </q-btn>

            <q-btn
              class="q-pl-md cursor-pointer"
              dense
              flat
              label="FAQ"
              @click="navigateTo('FAQ')"
            />|

            <q-btn
              class="q-pl-xs cursor-pointer"
              dense
              flat
              label="TERMS OF USE"
              @click="navigateTo('TermsOfUse')"
            />|

            <q-btn
              class="cursor-pointer"
              dense
              flat
              label="PRIVACY POLICY "
              @click="navigateTo('PrivacyPolicy')"
            />|

            <q-btn
              class="cursor-pointer"
              dense
              flat
              label="RETURN POLICY "
              @click="navigateTo('ReturnPolicy')"
            />|

            <q-btn
              class="cursor-pointer"
              dense
              flat
              label="COMMISSION & FEES "
              @click="navigateTo('CommisionAndFees')"
            />

            <!-- <q-btn v-if="$local.getItem($appLink+'-jwt')!=undefined" dense flat label="LOGOUT1" /> -->
          </div>
        </q-bar>
      </div>
      <q-toolbar id="toolbar" :class="!$q.screen.lt.md ? '' : 'bg-primary '">
        <div
          class="row full-width "
          :class="$q.screen.lt.md ? '' : 'justify-center'"
        >
          <div class="row items-center" style="max-width: 1200px;">
            <q-avatar>
              <!-- https://backend-app.ap.ngrok.io/uploads/admin/logo.png -->
              <img
                v-if="!$q.screen.lt.md"
                :src="$appLink + '/uploads/admin/logo.png'"
              />

              <div v-else>
                <q-btn @click="$router.push('/')" round>
                  <q-avatar size="42px">
                    <img :src="$appLink + '/uploads/admin/logo.png'" />
                  </q-avatar>
                </q-btn>
              </div>
            </q-avatar>

            <q-toolbar-title>
              <q-btn
                flat
                dense
                size="lg"
                label="ANTURAZ"
                class="q-pa-none"
                @click="$router.push('/')"
              />
            </q-toolbar-title>

            <div
              style="width: 40px;"
              :style="$q.screen.lt.md ? 'width: 0px' : ''"
            ></div>

            <div :style="$q.screen.lt.md ? 'width: 70px' : ''"></div>
            <q-btn flat dense label="GIFT REGISTRY" @click="giftRegistry" />

            <!-- NOT VISIBLE IF IN MOBILE/TABLET MODE -->

            <div class="row item-right">
              <div v-if="!$q.screen.lt.md" class="row items-center">
                <q-btn flat label="SHOPS" @click="$router.push(`/Shops`)" />
                <!-- KEYWORD -->
                <q-input
                  square
                  outlined
                  :value="$route.query.query"
                  v-model="searchquery"
                  label="What are you looking for?"
                  style="min-width:300px;background-color:white !important"
                  dense
                />

                <!-- LOCATION -->
                <q-select
                  style="min-width:150px; background-color:white !important"
                  square
                  outlined
                  v-model="location"
                  :options="provinceOptions"
                  label="Location"
                  dense
                />

                <q-btn
                  @click="
                    $router.push({
                      path: 'search',
                      query: { query: searchquery, location: location }
                    })
                  "
                  style="height:40px;"
                  square
                  color="primary"
                  icon="search"
                  unelevated
                />&nbsp;&nbsp;
                <q-btn
                  class="bg-primary "
                  rounded
                  label="CREATE YOUR STORE"
                  @click="$router.push('/StoreOwner/CreateStore')"
                />
              </div>
              <!-- <q-btn
                  flat
                  round
                  dense
                  icon="person"
                  v-if="$local.getItem($appLink)==undefined"
                  @click="$router.push('/ShopperLogin')"
                /> -->
              <div v-if="!$q.screen.lt.md">
                <q-btn-dropdown
                  flat
                  v-if="!$local.getItem($appLink + '-jwt')"
                  square
                  icon="person"
                >
                  <q-list>
                    <q-item clickable @click="$router.push('/ShopperLogin')">
                      <q-item-section>
                        <q-item-label>Login As Shopper</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      @click="$router.push('/StoreOwner/Login')"
                    >
                      <q-item-section>
                        <q-item-label>Login As Store Owner</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                <q-btn
                  flat
                  round
                  dense
                  icon="shopping_cart"
                  color="black"
                  @click="$router.push('/cart')"
                >
                  <q-badge
                    v-if="Object.keys(user).length > 0"
                    color="red"
                    floating
                    >{{ total_cart }}</q-badge
                  >
                </q-btn>
                <q-btn
                  flat
                  round
                  dense
                  icon="account_circle"
                  size="lg"
                  v-if="$local.getItem($appLink + '-jwt')"
                >
                  <q-menu max-width="250px">
                    <q-list style="width: 250px">
                      <q-item clickable @click="$router.push('/Orders')">
                        <q-item-section>
                          <div>
                            <q-icon
                              class="col"
                              color="black"
                              size="20px"
                              name="list"
                            />
                            <q-btn
                              flat
                              class="col"
                              color="black"
                              size="md"
                              label="My Orders"
                              v-close-popup
                            />
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item clickable @click="$router.push('/Reservations')">
                        <q-item-section>
                          <div>
                            <q-icon
                              class="col"
                              color="black"
                              size="20px"
                              name="menu_book"
                            />
                            <q-btn
                              flat
                              class="col"
                              color="black"
                              size="md"
                              label="My Reservations"
                              v-close-popup
                            />
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        @click="$router.push('/Settings/Profile')"
                      >
                        <q-item-section>
                          <div>
                            <q-icon
                              class="col"
                              color="black"
                              size="20px"
                              name="person"
                            />
                            <q-btn
                              flat
                              class="col"
                              color="black"
                              size="md"
                              label="Profile Settings"
                              v-close-popup
                            />
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-separator />

                      <q-item
                        clickable
                        @click="$router.push('/Settings/Security')"
                      >
                        <q-item-section>
                          <div>
                            <q-icon color="black" size="20px" name="security" />
                            <q-btn
                              flat
                              color="black"
                              size="md"
                              label="Security Settings"
                              v-close-popup
                            />
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-separator />

                      <q-item>
                        <q-item-section>
                          <q-btn
                            outline
                            color="primary"
                            label="Sign Out"
                            @click="signOut"
                            push
                            size="md"
                            v-close-popup
                          />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>

              <q-btn
                flat
                icon="menu"
                dense
                v-if="$q.screen.lt.md"
                @click="menu = true"
              />
              <!-- MENU FOR MOBILE/TABLET ONLY -->
              <q-dialog
                v-if="$q.screen.lt.lg"
                v-model="menu"
                persistent
                full-height
                full-width
                transition-show="slide-left"
                transition-hide="slide-right"
              >
                <q-card
                  :class="
                    $q.screen.lt.md
                      ? 'bg-primary text-black'
                      : 'bg-black text-white'
                  "
                >
                  <q-bar>
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup />
                  </q-bar>

                  <q-card-section>
                    <q-list
                      style="min-width: 100px"
                      content-class="bg-black text-white"
                    >
                      <q-item>
                        <div class="q-gutter-md q-py-md">
                          <q-btn
                            round
                            icon="fab fa-facebook"
                            style="background-color: #3b5998; color: white;"
                            @click="
                              openLink(
                                'https://www.facebook.com/anturazmarketplace'
                              )
                            "
                          />
                          <q-btn
                            round
                            icon="fab fa-instagram"
                            style="background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); color: white;"
                            @click="
                              openLink('https://www.instagram.com/anturaz.io/')
                            "
                          />
                          <q-btn
                            round
                            style="background-color: #010101; color: white;"
                            @click="
                              openLink('https://www.tiktok.com/@anturaz.io')
                            "
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
                      </q-item>

                      <q-item
                        clickable
                        @click="$router.push('/')"
                        v-close-popup
                      >
                        <q-item-section>Home</q-item-section>
                      </q-item>
                      <q-separator dark />

                      <q-item
                        clickable
                        @click="$router.push('/Shops')"
                        v-close-popup
                      >
                        <q-item-section>Shops</q-item-section>
                      </q-item>

                      <q-separator dark />
                      <q-item
                        clickable
                        v-close-popup
                        @click="$router.push('/StoreOwner/CreateStore')"
                      >
                        <q-item-section>Create Your Store</q-item-section>
                      </q-item>
                      <q-separator dark />

                      <q-item
                        clickable
                        @click="$router.push('/GiftRegistry')"
                        v-close-popup
                      >
                        <q-item-section>Gift Registry</q-item-section>
                      </q-item>
                      <q-separator dark />
                      <q-item
                        clickable
                        v-close-popup
                        @click="navigateTo('FAQ')"
                      >
                        <q-item-section>FAQ</q-item-section>
                      </q-item>
                      <q-separator dark />

                      <q-item
                        clickable
                        v-close-popup
                        @click="navigateTo('TermsOfUse')"
                      >
                        <q-item-section>Term of Use</q-item-section>
                      </q-item>
                      <q-separator dark />
                      <q-item
                        clickable
                        v-close-popup
                        @click="navigateTo('PrivacyPolicy')"
                      >
                        <q-item-section>Privacy Policy</q-item-section>
                      </q-item>
                      <q-separator dark />
                      <q-item
                        clickable
                        v-close-popup
                        @click="navigateTo('ReturnPolicy')"
                      >
                        <q-item-section>Return Policy</q-item-section>
                      </q-item>
                      <q-separator dark />

                      <q-item
                        clickable
                        v-close-popup
                        @click="navigateTo('CommisionAndFees')"
                      >
                        <q-item-section>Commission & Fees</q-item-section>
                      </q-item>
                      <q-separator dark />
                      <q-item
                        clickable
                        v-close-popup
                        @click="showModal('helpDesk')"
                      >
                        <q-item-section>Help Desk</q-item-section>
                      </q-item>
                      <q-separator dark />
                      <q-item
                        clickable
                        v-close-popup
                        @click="navigateTo('AboutUs')"
                      >
                        <q-item-section>About Us</q-item-section>
                      </q-item>
                      <q-item
                        v-if="$local.getItem($appLink + '-jwt') != undefined"
                        clickable
                        v-close-popup
                      >
                        <q-item-section class="row">
                          <q-btn
                            outline
                            icon="settings"
                            label="Settings"
                            @click="signOut"
                          />
                        </q-item-section>
                      </q-item>
                      <q-item
                        v-if="$local.getItem($appLink + '-jwt') != undefined"
                        clickable
                        v-close-popup
                      >
                        <q-item-section class="text-red row">
                          <q-btn
                            outline
                            icon="logout"
                            label="SIGN OUT"
                            @click="signOut"
                          />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>

                  <!-- Footer Section with Copyright -->
                  <q-card-actions align="center">
                    <div class="non-selectable">
                      <q-btn
                        dense
                        readonly
                        flat
                        label="Copyright 2025 © OneStras Tecnologies Corp."
                        align="center"
                        class="text-black "
                        style="font-size: .9em"
                      />
                    </div>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>
        </div>
      </q-toolbar>
      <q-page-container class="justify-center row">
        <div class="row" v-if="user.user_type === 'Owner'">
          <div class="fixed-bottom-left" style="z-index: 2">
            <a :href="'/#/StoreOwner'" target="_blank">
              <!-- @click="$router.push(' + store._id) -->
              <q-btn
                class="bg-white"
                color="primary"
                outline
                unelevated
                no-caps
                :style="$q.screen.lt.md ? 'width:50vw' : 'width: 200px'"
              >
                <div class="text-center">Store Dashboard</div>
                <q-icon right name="store" />
              </q-btn>
            </a>
          </div>
        </div>

        <q-page style="width: 100%">
          <router-view />
        </q-page>
      </q-page-container>
      <div
        class="row items-center justify-center bg-black"
        v-if="!$q.screen.lt.md"
      >
        <q-bar style="width: 100%; " class="bg-black text-white">
          <div class="non-selectable">
            <q-btn
              dense
              readonly
              flat
              label="Copyright 2025 © OneStras Tecnologies Corp."
              align="center"
            />
          </div>
          <q-space />
          <div class="row inline">
            <q-item clickable class="social-icons">
              <q-item-section>
                <!-- <i class="fas fa-music-alt"></i> -->
                <q-btn dense readonly flat align="center" class="text-primary">
                  <span class="text-white">
                    HELP DESK
                  </span>
                </q-btn>
              </q-item-section>
            </q-item>
            <q-item clickable class="social-icons">
              <q-item-section>
                <q-btn
                  dense
                  readonly
                  flat
                  align="center"
                  class="text-primary"
                  @click="navigateTo('AboutUs')"
                >
                  <span class="text-white">
                    ABOUT US
                  </span>
                </q-btn>
              </q-item-section>
            </q-item>

            <!-- <q-item clickable class="social-icons">
                <q-item-section>
                  <q-icon class="text-white" name="img:/../assets/tiktok_logo.png" >
                  </q-icon>
                </q-item-section>

              </q-item> -->
            <!-- <q-btn dense flat label="HELP DESK" />|
              <q-btn dense flat label="PRIVACY POLICY" />|
              <q-btn dense flat label="BLOGS" />|
              <q-btn dense flat label="ABOUT US" /> |
              <q-btn v-if="$local.getItem($appLink+'-jwt')!=undefined" dense flat label="LOGOUT1" /> -->
          </div>
        </q-bar>
      </div>
    </q-layout>

    <!-- <div class="text-white bg-black q-pa-sm">
      <div class="row inline">
        <span> COPYRIGHT 2022 © ANTURAZ INC </span>
        <span class="float-right"> buttons </span>
      </div>
    </div> -->
    <div v-if="$q.screen.lt.md">
      <div class="row no-wrap shadow-1 sticky-toolbar">
        <q-toolbar
          class="col-6 bg-primary text-white"
          style="border-right: 1px solid white;"
        >
          <q-space />
          <q-btn-dropdown
            v-if="!$local.getItem($appLink + '-jwt')"
            icon="person"
            flat
            color="black"
            round
            dense
          >
            <q-list>
              <q-item clickable @click="$router.push('/ShopperLogin')">
                <q-item-section>
                  <q-item-label>Login As Shopper</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable @click="$router.push('/StoreOwner/Login')">
                <q-item-section>
                  <q-item-label>Login As Store Owner</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn
            flat
            round
            dense
            icon="account_circle"
            color="black"
            size="lg"
            v-if="$local.getItem($appLink + '-jwt')"
          >
            <q-menu max-width="250px">
              <q-list style="width: 250px">
                <q-item clickable @click="$router.push('/Orders')">
                  <q-item-section>
                    <div>
                      <q-icon
                        class="col"
                        color="black"
                        size="20px"
                        name="list"
                      />
                      <q-btn
                        flat
                        class="col"
                        color="black"
                        size="md"
                        label="My Orders"
                        v-close-popup
                      />
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="$router.push('/Reservations')">
                  <q-item-section>
                    <div>
                      <q-icon
                        class="col"
                        color="black"
                        size="20px"
                        name="menu_book"
                      />
                      <q-btn
                        flat
                        class="col"
                        color="black"
                        size="md"
                        label="My Reservations"
                        v-close-popup
                      />
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="$router.push('/Settings/Profile')">
                  <q-item-section>
                    <div>
                      <q-icon
                        class="col"
                        color="black"
                        size="20px"
                        name="person"
                      />
                      <q-btn
                        flat
                        class="col"
                        color="black"
                        size="md"
                        label="Profile Settings"
                        v-close-popup
                      />
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />

                <q-item clickable @click="$router.push('/Settings/Security')">
                  <q-item-section>
                    <div>
                      <q-icon color="black" size="20px" name="security" />
                      <q-btn
                        flat
                        color="black"
                        size="md"
                        label="Security Settings"
                        v-close-popup
                      />
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />

                <q-item>
                  <q-item-section>
                    <q-btn
                      outline
                      color="primary"
                      label="Sign Out"
                      @click="signOut"
                      push
                      size="md"
                      v-close-popup
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-space />
        </q-toolbar>
        <q-toolbar
          class="col-6 bg-primary text-white"
          style="border-left: 1px solid white;"
        >
          <q-space />
          <div v-if="!user.user_type">
            <q-btn
              flat
              round
              dense
              color="black"
              icon="shopping_cart"
              @click="$router.push('/cart')"
            >
              <q-badge v-if="Object.keys(user).length > 0" color="red" floating
                >{{ total_cart }}
              </q-badge>
            </q-btn>
          </div>
          <div v-else>
            <q-btn
              flat
              round
              dense
              color="black"
              label="Dashboard"
              @click="$router.push('/StoreOwner')"
            >
            </q-btn>
          </div>

          <q-space />
        </q-toolbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      logged_in: false,
      searchquery: "",

      location: "",
      user: {},
      total_cart: 0,
      modals: {
        termsOfUse: false,
        privacyPolicy: false,
        returnPolicy: false,
        commissionFees: false,
        helpDesk: false,
        aboutUs: false,
        faq: false
      },
      activeTab: "vendor",
      deferredPrompt: null
    };
  },

  async mounted() {
    this.setBgImage();
    this.$route.query.location == "" || this.$route.query.location == undefined
      ? (this.location = this.$provinceList[0])
      : (this.location = this.$route.query.location);
    if (this.$local.getItem(this.$appLink + "-jwt") != undefined) {
      this.user = await this.$getUser();
    }
    await this.$dbCon.service("cart").onDataChange(() => {
      this.getUserCart();
    });
    const { host, protocol } = process.env.CLIENT
      ? window.location
      : { host: "localhost", protocol: "http" };

    this.$EventBus.$on("logged-in", async () => {
      this.user = await this.$getUser();
      if (this.$session.has("cart")) {
        var _this = this;
        try {
          this.$session.get("cart").forEach(async function(x) {
            x.shopper_id = _this.user._id;
            await _this.$dbCon.service("cart").create(x);
          });
          this.$EventBus.$emit("cart-added", null);
        } catch (e) {
          alert(e);
        }
        this.$session.clear();
      }

      this.$forceUpdate();
    });
  },
  watch: {
    location(newVal) {}
  },
  computed: {
    provinceOptions() {
      return this.$provinceList;
    }
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push(`/${routeName}`);
    },
    showModal(modalName) {
      this.$set(this.modals, modalName, true);
    },
    openLink(link) {
      window.open(link, "_blank");
    },
    setBgImage() {
      let url = this.$route.path;
      url != "/"
        ? document
            .querySelector(".q-layout.q-layout--standard")
            .classList.remove("bg-image")
        : document
            .querySelector(".q-layout.q-layout--standard")
            .classList.add("bg-image");
    },
    getUserCart: async function() {
      try {
        const { total } = await this.$dbCon.service("cart").find({
          query: {
            shopper_id: this.user._id
          }
        });
        this.total_cart = total;
      } catch (e) {
        console.log(e);
      }
    },

    giftRegistry: function() {
      this.$dbCon
        .authenticate()
        .then(() => {
          this.$router.push("/GiftRegistry");
        })
        .catch(() => {
          this.$router.push("/ShopperLogin");
        });
    },
    signOut: async function() {
      try {
        await this.$dbCon.logout();
        this.$local.clear();
        this.menu = false;

        // Immediate route push to ensure the page navigates away
        this.$router.replace("/");

        // Optional hard page reload
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    },
    verifyPath: function() {
      if (this.$router.currentRoute.fullPath != "/CreateStore") {
        if (!this.$local.getItem(this.$appLink + "-jwt") == undefined) {
          this.$router.push("/ShopperLogin");
        }
      }
    }
  }
};
// scroll
// window.onscroll = scrollShowNav;
// function scrollShowNav() {
//    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 100) {
//       document.getElementById("toolbar").style.top = "-50px";
//    } else {

//    }
// }
// vanilla
let lastScrollTop = 0;
if (process.env.CLIENT) {
  // document.addEventListener(
  //   "scroll",
  //   function() {
  //     // or window.addEventListener("scroll"....
  //     var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  //     if (st > lastScrollTop) {
  //       // downscroll code
  //       document.getElementById("toolbar").style.visibility = "hidden";
  //       document.getElementById("toolbar").style.opacity = "0";
  //       document.getElementById("toolbar").style.transition =
  //         "visibility 0s, opacity 0.5s linear";
  //       // visibility: hidden;
  //       // opacity: 0;
  //       // transition: visibility 0s, opacity 0.5s linear;
  //     } else {
  //       document.getElementById("toolbar").style.visibility = "visible";
  //       document.getElementById("toolbar").style.opacity = "1";
  //       // upscroll code
  //       // document.getElementById("toolbar").style.top = "-50px";
  //     }
  //     lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  //   },
  //   false
  // );
}
</script>

<style scoped>
.sticky-toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
#toolbar {
  /* position: fixed;
  width: 100%;
  overflow: auto;
  transition: 0.5s;
  top: 40px;
  z-index: 1; */
}
.bg-image {
  background-image: url(../assets/Anturaz-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 1020px;
}
.my-logo {
  background-image: url(../assets/anturaz_logo.png);
  background-size: contain;
}

.social-icons {
  padding: 0px;
  min-height: 0px;
  padding-right: 10px;
}
</style>
