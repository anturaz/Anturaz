import { http, httpFile, dbCon } from "../httpServices";

const connection = dbCon();

export const getPaymentOptions = async () => {
  try {
    const paymentOptions = await http().get("paymentOptions");
    return paymentOptions;
  } catch (error) {
    console.error("Error while getting payment options:", error);
  }
};

export const checkOutPayment = async data => {
  try {
    const payment = await http().post("checkout", data);
    console.log("Payment:", payment);
    return payment;
  } catch (error) {
    console.error("Error while checking out payment:", error);
  }
};

export const checkoutOldOrder = async data => {
  try {
    const response = await http().post("checkout-old", data);

    return response;
  } catch (error) {
    console.error("Error while checking out old order:", error);
  }
};

export const syncShopperPayments = async data => {
  try {
    const response = await http().post("sync", {
      transaction_id: data
    });

    return response;
  } catch (error) {
    console.error("Error while checking the transaction (sync):", error);
  }
};
