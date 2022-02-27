<template>
  <div>
    <q-layout view="hHh lpR fFf">
        
        <div class="q-gutter-md row items-center justify-center bg-black" v-if="!$q.screen.lt.md">
          <q-bar style="width: 100%; max-width: 1200px;" class="bg-black text-white">
            <div class="non-selectable">
              <q-btn
                dense
                readonly
                flat
                label="THE COUNTRY'S FIRST ONE STOP EVENTS PLACE"
                align="center"
                class="text-primary"
              />
            </div>
            <q-space />
            <div>
              <q-btn dense flat label="HELP DESK" />|
              <q-btn dense flat label="PRIVACY POLICY" />|
              <q-btn dense flat label="BLOGS" />|
              <q-btn dense flat label="ABOUT US" /> |
              <!-- <q-btn v-if="$local.getItem($appLink+'-jwt')!=undefined" dense flat label="LOGOUT1" /> -->
            </div>
          </q-bar>
        </div>

        <q-toolbar >
          <div class="toolbarShopper row full-width justify-center">
            <div class="row items-center" style="max-width: 1200px;">
              <q-avatar>
                <img :src="$appLink+'/uploads/admin/sample_logo.png'" width="40px" />
              </q-avatar>
              <q-toolbar-title>
                <q-btn flat dense size="lg" label="ANTURAZ" @click="$router.push('/')" />
              </q-toolbar-title>
              <div style="width: 90px;"></div>
              <q-btn
                flat
                dense
                label="GIFT REGISTRY"
                @click="giftRegistry"
              />

              <!-- NOT VISIBLE IF IN MOBILE/TABLET MODE -->
              <div class="row items-center">
                <div v-if="!$q.screen.lt.md" class="row items-center">
                  <q-btn flat  label="SHOP" />
                  <!-- KEYWORD -->
                  <q-input
                    square
                    outlined
                    :value="$route.query.query"
                    v-model="searchquery"
                    label="What are you looking for?"
                    style="min-width:300px"
                    dense
                  />
                  <!-- LOCATION -->
                  <q-select
                    style="min-width:150px;border-radius: 15px"
                    square
                    outlined
                    v-model="location"
                    :options="$provinceList"
                    label="Location"
                    dense
                  />

                  <q-btn
                    @click="$router.push('/search?query='+searchquery+'&location='+location)"
                    style="height:40px"
                    square
                    color="grey"
                    icon="search"
                    unelevated
                  />&nbsp;&nbsp;
                  <q-btn class="bg-primary text-white" outline rounded label="CREATE YOUR SHOP" @click="$router.push('/StoreOwner/CreateStore')" />
                </div>
                <!-- <q-btn
                  flat
                  round
                  dense
                  icon="person"
                  v-if="$local.getItem($appLink)==undefined"
                  @click="$router.push('/ShopperLogin')"
                /> -->
                <q-btn-dropdown flat
                  v-if="!($local.getItem($appLink+'-jwt'))"
                  square
                  icon="person">
                  <q-list>
                    <q-item clickable  @click="$router.push('/ShopperLogin')">
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
                <q-btn flat round dense icon="shopping_cart" @click="$router.push('/cart')" />
                <q-btn
                  flat
                  round
                  dense
                  icon="account_circle"
                  size="lg"
                  v-if="$local.getItem($appLink+'-jwt')">

                  <q-menu max-width="250px">
                    <q-list style="width: 250px">
                      <q-item clickable @click="$router.push('/Orders')">
                        <q-item-section>
                          <div>
                            <q-icon class="col" color="black" size="20px" name="list" />
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
                            <q-icon class="col" color="black" size="20px" name="menu_book" />
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
                            <q-icon class="col" color="black" size="20px" name="person" />
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
                <q-btn flat icon="menu" dense v-if="$q.screen.lt.md" @click="menu=true" />
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
                  <q-card class="bg-black text-white">
                    <q-bar>
                      <q-space />

                      <q-btn dense flat icon="close" v-close-popup />
                    </q-bar>

                    <q-card-section>
                      <q-list style="min-width: 100px" content-class="bg-black text-white">
                        <q-item clickable @click="$router.push('/');" v-close-popup>
                          <q-item-section>Home</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item clickable v-close-popup>
                          <q-item-section>Store</q-item-section>
                        </q-item>
                        <q-separator dark />

                        <q-item clickable @click="$router.push('/GiftRegistry')" v-close-popup>
                          <q-item-section>Gift Registry</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item clickable v-close-popup @click="$router.push('/CreateStore')">
                          <q-item-section>Create Your Store</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item clickable v-close-popup>
                          <q-item-section>Payment Option</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item clickable v-close-popup>
                          <q-item-section>Help Desk</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item clickable v-close-popup>
                          <q-item-section>Term of Use</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item clickable v-close-popup>
                          <q-item-section>Data Privacy</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item clickable v-close-popup>
                          <q-item-section>Blogs</q-item-section>
                        </q-item>
                        <q-separator dark />
                        <q-item clickable v-close-popup>
                          <q-item-section>About Us</q-item-section>
                        </q-item>
                        <q-item v-if="$local.getItem($appLink+'-jwt')!=undefined" clickable v-close-popup>
                          <q-item-section class="row">
                            <q-btn outline icon="settings" label="Settings" @click="signOut" />
                          </q-item-section>
                        </q-item>
                        <q-item v-if="$local.getItem($appLink+'-jwt')!=undefined" clickable v-close-popup>
                          <q-item-section class="text-red row">
                            <q-btn outline icon="logout" label="SIGN OUT" @click="signOut" />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </div>
            </div>
          </div>
        </q-toolbar>
      <q-page-container class="justify-center row">
        <q-page class="col">
          <router-view />
        </q-page>
      </q-page-container>
          <div class="row items-center justify-center bg-black" v-if="!$q.screen.lt.md">
          <q-bar style="width: 100%" class="bg-black text-white">
            <div class="non-selectable">
              <q-btn
                dense
                readonly
                flat
                label="COPYRIGHT 2022 © ANTURAZ INC"
                align="center"
              />
            </div>
            <q-space />
            <div class="row inline">
              <q-item clickable class="social-icons">
                <q-item-section>
                  <!-- <i class="fas fa-music-alt"></i> -->
                  <q-icon class="text-white" name="music_note">
                  </q-icon>
                </q-item-section>

              </q-item>
              <q-item clickable class="social-icons">
                <q-item-section>
                  <q-icon class="text-white" name="fab fa-youtube" >
                  </q-icon>
                </q-item-section>

              </q-item>
              <q-item clickable class="social-icons">
                <q-item-section>
                  <q-icon class="text-white" name="fab fa-twitter" >
                  </q-icon>
                </q-item-section>

              </q-item>
              <q-item clickable class="social-icons">
                <q-item-section>
                  <q-icon class="text-white" name="fab fa-instagram" >
                  </q-icon>
                </q-item-section>

              </q-item>
              <q-item clickable class="social-icons">
                <q-item-section>
                  <!-- <i class="fa-brands fa-facebook-square"></i> -->
                  <q-icon class="text-white" name="fab fa-facebook" >
                  </q-icon>
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
    };
  },
  async mounted() {
    this.$route.query.location == "" || this.$route.query.location == undefined
      ? (this.location = this.$provinceList[0])
      : (this.location = this.$route.query.location);
    this.$EventBus.$on("logged-in", async () => {
      this.user = await this.$getUser();
      if (this.$session.has("cart")) {
        var _this = this;
        try {
          this.$session.get("cart").forEach(async function (x) {
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
  methods: {
    giftRegistry: function () {
      this.$dbCon
        .authenticate()
        .then(() => {
          this.$router.push("/GiftRegistry");
        })
        .catch(() => {
          this.$router.push("/ShopperLogin");
        });
    },
    signOut: async function () {
      await this.$dbCon.logout();
      this.$local.clear();
      this.$router.push("/ShopperLogin");
      this.menu = false;
    },
    verifyPath: function () {
      if (this.$router.currentRoute.fullPath != "/CreateStore") {
        if (!this.$local.getItem(this.$appLink+"-jwt") == undefined) {
          this.$router.push("/ShopperLogin");
        }
      }
    },
  },
};
</script>

<style scoped>
.bg-image {
	background-image: url(../assets/anturaz_home.jpg);
	background-repeat: no-repeat;
	background-size: contain;
}

.social-icons {
  padding: 0px;
  min-height: 0px;
  padding-right: 10px;
}

</style>
