import VueSanitize from "vue-sanitize";

export default async({ app, router, Vue }) => {
    Vue.use(VueSanitize);
}