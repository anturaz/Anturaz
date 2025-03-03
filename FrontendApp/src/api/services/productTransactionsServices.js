import { http, httpFile, dbCon } from "../httpServices";

const connection = dbCon();
connection.authenticate();
const productTransactions = connection.service("product-transactions");

export const getProductTransactions = async () => {
  try {
    const res = await productTransactions.find({});

    console.log("productTransactions", res);
    return res;
  } catch (error) {
    console.error("Error while getting product transactions:", error);
  }
};

export const findProdTranWithShopper = async itemId => {
  try {
    const { data: transactions } = await http().get("product-reviews", {
      params: { product_id: itemId }
    });
    console.log(transactions);
    return transactions.data;
  } catch (error) {
    console.error(
      "Error while getting product transactions with shopper:",
      error
    );
  }
};
