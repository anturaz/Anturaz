import { http, httpFile, dbCon } from "../httpServices";

const connection = dbCon();
const productsService = connection.service("products");

export const getProducts = async () => {
  try {
    const products = await productsService.find({});

    return products;
  } catch (error) {
    console.error("Error while getting products:", error);
  }
};

export const queryProducts = async query => {
  try {
    const { data } = await productsService.find(query);
    return data;
  } catch (error) {
    console.error("Error while getting products:", error);
  }
};
