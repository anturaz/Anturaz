import { http, httpFile, dbCon } from "../httpServices";

const connection = dbCon();
const services = connection.service("services");

export const getServices = async () => {
  try {
    const res = await services.find({});

    return products;
  } catch (error) {
    console.error("Error while getting services:", error);
  }
};

export const findServices = async query => {
  try {
    const { data } = await services.find(query);

    return data;
  } catch (error) {
    console.error("Error while getting services:", error);
  }
};
