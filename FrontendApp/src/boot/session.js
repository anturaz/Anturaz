import VueSession from "vue-session";
// "async" is optional
export default async ({ Vue }) => {
  if (!process.env.CLIENT) return;
  Vue.use(VueSession);
};
