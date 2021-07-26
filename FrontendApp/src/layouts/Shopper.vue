<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header elevated>
        <div class="q-gutter-md row items-center justify-center bg-black" v-if="!$q.screen.lt.md">
          <q-bar style="width: 100%; max-width: 1200px;" class="bg-black text-white">
            <div class="cursor-pointer non-selectable">
              <q-btn
                dense
                readonly
                flat
                label="Your source of event suppliers from A to Z"
                align="center"
              />
            </div>
            <q-space />
            <div>
              <q-btn dense flat label="HELP DESK" />|
              <q-btn dense flat label="PRIVACY POLICY" />|
              <q-btn dense flat label="BLOGS" />|
              <q-btn dense flat label="ABOUT US" />
            </div>
          </q-bar>
        </div>

        <q-toolbar :class="$q.screen.lt.md? 'bg-primary text-white': 'bg-white text-black'">
          <div class="row  full-width justify-center">
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
                :size="$q.screen.lt.md? 'md':'lg'"
                dense
                label="GIFT REGISTRY"
                @click="giftRegistry"
              />

              <!-- NOT VISIBLE IF IN MOBILE/TABLET MODE -->
              <div class="row items-center">
                <div v-if="!$q.screen.lt.md" class="row items-center">
                  <q-btn flat size="lg" label="SHOP" />
                  <!-- KEYWORD -->
                  <q-input
                    square
                    outlined
                    :value="$route.query.query"
                    v-model="searchquery"
                    label="What are you looking for?"
                    dense
                  />
                  <!-- LOCATION -->
                  <q-select
                    style="min-width:200px"
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
                  <q-btn  outline label="CREATE YOUR STORE" @click="$router.push('/StoreOwner/CreateStore')" />
                </div>
                <q-btn
                  flat
                  round
                  dense
                  icon="person"
                  v-if="$local.getItem('jwt')==undefined"
                  @click="$router.push('/ShopperLogin')"
                />
                <q-btn flat round dense icon="shopping_cart" @click="$router.push('/cart')" />
                <q-btn
                  flat
                  round
                  dense
                  icon="account_circle"
                  size="lg"
                  v-if="$local.getItem('jwt')!=undefined"
                >
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
                        <q-item v-if="$local.getItem('jwt')!=undefined" clickable v-close-popup>
                          <q-item-section class="row">
                            <q-btn outline icon="settings" label="Settings" @click="signOut" />
                          </q-item-section>
                        </q-item>
                        <q-item v-if="$local.getItem('jwt')!=undefined" clickable v-close-popup>
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
      </q-header>
      <q-page-container class="justify-center row">
        <q-page class="col" style="max-width: 1200px;">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
    <div
      class="text-white text-h6 text-bold bg-primary q-pa-xl"
      align="center"
      style="height:120px"
    >All Rights Reserved, Anturaz 2021</div>
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
        if (!this.$local.getItem("jwt") == undefined) {
          this.$router.push("/ShopperLogin");
        }
      }
    },
  },
};
</script>
