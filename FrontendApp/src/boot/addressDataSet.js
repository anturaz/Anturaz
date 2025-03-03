// import something here

// "async" is optional
import { regions, provinces, municipalities, barangays } from "psgc";
export default async ({ Vue }) => {
  Vue.prototype.$regions = regions.all();
  Vue.prototype.$provinces = provinces.all();
  Vue.prototype.$municipalities = municipalities.all();
};
