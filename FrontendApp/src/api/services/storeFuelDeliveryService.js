import { http, httpFile, dbCon } from "../httpServices";
// import { dbCon } from "../../boot/dbCon";
const connection = dbCon();
// connection.authenticate();
const storeFuelDelivery = connection.service("store-fuel-delivery");

export const getStoreFuelDelivery = async () => {
  try {
    const res = await storeFuelDelivery.find({});

    console.log("store fuel", res);
    return res;
  } catch (error) {
    console.error("Error while getting shopper payments:", error);
  }
};

export const storeFuelDeliveryLoc = async query => {
  try {
    const { data } = await storeFuelDelivery.find({
      query
    });
    return data;
  } catch (error) {
    console.error("Error while getting store fuel delivery:", error);
  }
};

// export const removeShopperPayment = async id => {
//   try {
//     const shopperPayment = await shopperPayments.remove(id);
//     return shopperPayment;
//   } catch (error) {
//     console.error("Error while removing shopper payment:", error);
//   }
// };
