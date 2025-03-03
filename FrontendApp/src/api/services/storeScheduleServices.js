import { http, httpFile, dbCon } from "../httpServices";

const connection = dbCon();
connection.authenticate();
const storeSchedule = connection.service("store-schedule");

export const getStoreSchedule = async () => {
  try {
    const res = await storeSchedule.find({});

    console.log("store-schedule:", res);
    return res;
  } catch (error) {
    console.error("Error while getting service transactions:", error);
  }
};

export const getStoreScheduleDateNotAvailable = async item_id => {
  const d = new Date();
  const formattedDate = `${d.getFullYear()}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  try {
    const { data: resProduct } = await connection.service("services").find({
      query: {
        _id: item_id
      }
    });
    const storeId = resProduct[0].store_id;

    const storeSchedules = await storeSchedule.find({
      query: {
        $select: ["schedules"],
        store_id: storeId
      }
    });

    // Extract, normalize, filter, and sort the dates
    const filteredDates = storeSchedules.data
      .flatMap(store => store.schedules.map(sch => sch.date)) // Extract all dates
      .map(date => new Date(date.replace(/\//g, "-"))) // Normalize date format
      .filter(date => date >= new Date(formattedDate)) // Remove past dates
      .sort((a, b) => a - b) // Sort dates in ascending order
      .map(
        date =>
          `${date.getFullYear()}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date
            .getDate()
            .toString()
            .padStart(2, "0")}`
      ); // Convert back to 'YYYY/MM/DD' format

    console.log(filteredDates);

    return filteredDates;
  } catch (error) {
    console.error("Error while getting services date not available:", error);
  }
};
