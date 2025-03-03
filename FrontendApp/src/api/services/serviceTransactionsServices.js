import { http, httpFile, dbCon } from "../httpServices";

const connection = dbCon();
connection.authenticate();
const serviceTransactions = connection.service("service-transactions");

export const getServiceTransactions = async () => {
  try {
    const res = await serviceTransactions.find({});

    console.log("serviceTransactions", res);
    return res;
  } catch (error) {
    console.error("Error while getting service transactions:", error);
  }
};

export const findSerTranWithShopper = async itemId => {
  try {
    const { data: transactions } = await http().get("service-reviews", {
      params: { service_id: itemId }
    });

    return transactions.data;
  } catch (error) {
    console.error(
      "Error while getting service transactions with shopper:",
      error
    );
  }
};

export const removeServiceTransaction = async id => {
  try {
    const serviceTransaction = await serviceTransactions.remove(id);
    return serviceTransaction;
  } catch (error) {
    console.error("Error while removing service transaction:", error);
  }
};

export const getServiceDateNotAvailable = async store_id => {
  try {
    const response = await http().get("service-date-not-available", {
      params: { store_id }
    });
    return response.data.unavailable_dates;
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
  }
};
