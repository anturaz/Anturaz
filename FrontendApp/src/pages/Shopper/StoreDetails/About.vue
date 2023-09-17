<template>
  <div class="q-pt-md">
    <div class="flex flex-center column q-mt-lg">
      <div class="text-h4">About</div>
      <div class="row 2" style="min-height: 400px; width: 80%;">
        <div
          id="parent"
          class="fit row wrap justify-center items-start content-start"
          style="overflow: hidden;"
        >
          <div
            class="col-12 col-md-12 col-sm-12 col-xs-12 col-lg-10 q-mt-md"
            style="overflow: auto;"
          >
            <q-card class="no-border-radius">
              <q-card-section>
                <span iv v-html="data.store_details"></span>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: "about",
      data: []
    };
  },
  methods: {
    getStoreData: async function() {
      try {
        const res = await this.$dbCon.service("store").find({
          query: {
            _id: this.$route.query.store
          }
        });
        // res.data[0].store_details = res.data[0].store_details.replaceAll(
        //   /<\/?[^>]+(>|$)/gi,
        //   ""
        // );
        this.data = res.data[0];
        console.log("store data in about: ", results.data[0]);
      } catch (e) {}
    }
  },
  mounted() {
    this.$dbCon.service("store").onDataChange(() => {
      this.getStoreData();
    });
  }
};
</script>
