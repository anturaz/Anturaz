import { http, httpFile, dbCon } from "../httpServices";
// import { dbCon } from "../../boot/dbCon";
const connection = dbCon();
connection.authenticate();
const shopperPayments = connection.service("shopper-payments");

export const getShopperPayments = async () => {
  try {
    const res = await shopperPayments.find({});

    console.log("shopperPayments", res);
    return res;
  } catch (error) {
    console.error("Error while getting shopper payments:", error);
  }
};

export const removeShopperPayment = async id => {
  try {
    const shopperPayment = await shopperPayments.remove(id);
    return shopperPayment;
  } catch (error) {
    console.error("Error while removing shopper payment:", error);
  }
};
