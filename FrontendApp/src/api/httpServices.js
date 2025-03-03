import axios from "axios";
import { appLink, wings } from "boot/dbCon";

export function http() {
  return axios.create({
    baseURL: appLink
  });
}

export function httpFile() {
  return axios.create({
    baseURL: appLink,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export function dbCon() {
  const connection = wings(appLink, {
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

  return connection;
}
