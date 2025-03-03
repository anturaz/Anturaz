import wings from "./wings-feathers";
import { LocalStorage, SessionStorage, Cookies } from "quasar";
import { colors } from "quasar";
import Vue from "vue";

const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const localLink = "http://localhost:8081";
const onlineLink = process.env.VUE_APP_API_URL;

// const appLink = isLocal ? localLink : onlineLink;
const appLink = "https://anturaz.io";
// const appLink = "https://staging.anturaz.io";

const dbCon = wings(appLink, {
  users: {},
  categories: {},
  "payment-management": {},
  "payment-utilities": {},
  users: {},
  "social-media-management": {},
  announcements: {},
  "admin-uploads": {},
  "featured-photos": {},
  shop: {},
  store: {},
  "store-advertisment": {},
  "store-fuel-delivery": {},
  "store-schedule": {},
  "store-users": {},
  "store-payments": {},
  products: {},
  services: {},
  "product-advertisment": {},
  "service-advertisment": {},
  "item-subscriptions": {},
  "product-subscriptions": {},
  "service-subscriptions": {},
  "gallery-subscription": {},
  "store-followers": {},
  shopper: {},
  "gift-registry": {},
  cart: {},
  "product-transactions": {}
});

export { appLink, wings, dbCon };

export default ({ app, router, Vue }) => {
  // var localLink = "http://45.77.250.64:8081"
  // var localLink = "http://localhost:8081";
  var localLink = "https://anturaz.io";
  // var localLink = "https://staging.anturaz.io";

  // var localLink = "http://148.66.154.27:80";
  // var localLink = "https://anturaz.io";
  // var localLink = "http://167.179.97.201:8081";
  Vue.prototype.$appLink = localLink;
  Vue.prototype.$local = {
    getItem() {},
    setItem() {}
  };

  if (!process.env.CLIENT) return;
  Vue.prototype.$dbCon = wings(localLink, {
    users: {},
    //MAINTENANCE
    categories: {},
    "payment-management": {},
    "payment-utilities": {},
    users: {},
    "social-media-management": {},
    announcements: {},
    "admin-uploads": {},
    "featured-photos": {},
    //SHOP
    shop: {},
    store: {},
    "store-advertisment": {},
    "store-fuel-delivery": {},
    "store-schedule": {},
    "store-users": {},
    "store-payments": {},
    products: {},
    services: {},
    "product-advertisment": {},
    "service-advertisment": {},
    "item-subscriptions": {},
    "product-subscriptions": {},
    "service-subscriptions": {},
    "gallery-subscription": {},
    "store-followers": {},
    //SHOPPER
    shopper: {},
    "gift-registry": {},
    cart: {},
    "product-transactions": {},
    "service-transactions": {},
    "shopper-payments": {},
    //REPORT
    "report-sales": {},
    "store-following": {},
    "gift-registry-contacts": {},
    "global-payments": {}
  });

  Vue.prototype.$session = SessionStorage;
  Vue.prototype.$local = LocalStorage;
  Vue.prototype.$cookies = Cookies;
  Vue.prototype.$getUser = async function() {
    var user = {};
    var accessToken = await this.$dbCon.authenticate();
    let payLoad = await this.$dbCon.passport.verifyJWT(accessToken.accessToken);
    user = await this.$dbCon.services.users.get(payLoad.userId);
    return user;
  };
  Vue.prototype.$uploadFile = async function(fileSelected) {
    const formData = new FormData();
    formData.append(this.$appLink, fileSelected, fileSelected.name);
    var result = await this.$axios.post(this.$appLink + "/upload", formData);
    // console.log("UPLOAD", result);
    return result.data;
  };
  Vue.prototype.$StartTemporaryAuthentication = async function() {
    try {
      await this.$dbCon.authenticate({
        email: "authenticate",
        password: "authenticate",
        strategy: "local"
      });
    } catch (error) {
      console.error("Temporary authentication failed:", error);
    }
  };
  Vue.prototype.$EndTemporaryAuthentication = async function() {
    this.$dbCon.logout();
  };
  Vue.prototype.$EventBus = new Vue();
  Vue.prototype.$getDeliveryTranspoFee = async function(
    storeId,
    location,
    type
  ) {
    var fee = 0;
    await this.$dbCon
      .service("store-fuel-delivery")
      .find({
        query: {
          store_id: storeId
        }
      })
      .then(async results => {
        await results.data[0].fuel_delivery.map(fd => {
          if (fd.location == location) {
            fee = fd[type];
          }
        });
      });

    return fee;
  };
  Vue.prototype.$primaryColor = colors.getBrand("primary");
};
