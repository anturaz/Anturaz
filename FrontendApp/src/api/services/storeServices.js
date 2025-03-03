import { http, httpFile, dbCon } from "../httpServices";

const connection = dbCon();
const store = connection.service("store");

export const getStores = async () => {
  try {
    const { data } = await store.find({});

    return data;
  } catch (error) {
    console.error("Error while getting stores:", error);
  }
};

export const findStore = async query => {
  try {
    const { data } = await store.find(query);

    return data;
  } catch (error) {
    console.error("Error while getting stores:", error);
  }
};

export const getStore = async id => {
  try {
    const { data } = await store.find({
      query: {
        _id: id
      }
    });

    return data;
  } catch (error) {
    console.error("Error while getting store:", error);
  }
};
