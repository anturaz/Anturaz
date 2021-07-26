<template>
  <div class="q-pa-lg">
    <p class="text-h5 text-center text-bold">Recommended Services</p>

    <div style="height: 330px">
      <q-scroll-area
        horizontal
        style="height: 100%; width: 100%"
       
      >
        <div class="row no-wrap">
          <q-card
            
            bordered
            :style="
              'border-color:' + (currentItem == index ? $primaryColor : 'white')
            "
            style="cursor: pointer"
            square
            class="q-ma-sm"
            v-for="(item,index) in data"
            :key="item._id"
            @mouseover="currentItem = index"
            @mouseleave="currentItem = 'none'"
            @click="$router.replace({ path: `/ServiceDetails/${item._id}` })"
          >
            <q-card
              class="bg-primary text-white text-bold text-center absolute"
              style="
                width: 70px;
                height: 40px;
                top: 0;
                left: -4px;
                transform: translateY(60%);
                z-index: 1;
              "
              v-if="item.sale_price != ''"
              square
              flat
            >
              <p class="q-pa-xs q-mt-xs">
                {{
                  (
                    ((item.regular_price - item.sale_price) /
                      item.regular_price) *
                    100
                  ).toFixed(0)
                }}% OFF
              </p></q-card
            >
            <q-card-section style="height: 180px; width: 200px">
              <q-img :ratio="1" :src="item.photos[0]" />
            </q-card-section>
            <q-card-section style="height: 75px; width: 200px" align="center">
              <br />
        
              <div class="text-subtitle1" v-if="'service_name' in item">
                {{ item.service_name }}
              </div>
              <div>
          
                <font class="text-grey q-pr-sm" v-if="item.sale_price != ''">
                  <strike>{{ $prettyMoney(item.regular_price) }}</strike>
                </font>
                      <font class="text-bold text-primary">{{
                  item.sale_price != ""
                    ? $prettyMoney(item.sale_price)
                    : $prettyMoney(item.regular_price)
                }}</font>
              </div>
              <!-- <div class="row">
                <div>Store: &nbsp;</div>
                <div class="text-primary" style="cursor: pointer">
                  Gilbert Shop
                </div>
              </div> -->
            </q-card-section>
            <q-card-section style="height: 55px; width: 200px">
              <transition
                appear
                enter-active-class="animated slideInUp"
                leave-active-class="animated fadeOut"
              >
                <q-btn
                  class="full-width"
                  v-if="'service_name' in item && currentItem == index"
                  color="primary"
                  label="View >"
                  @click="
                    $router.replace({ path: `/ServiceDetails/${item._id}` })
                  "
                  unelevated
                />
              </transition>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      currentItem: "none",
    };
  },
  async mounted() {
    var services = await this.$dbCon
      .service("service-advertisment")
      .find({
        query: {
          $select: ["related_id"],
          date_end: {
            $gte: new Date(),
          },
        },
      })
      .then((servicesID) => {
        var arrFeaturedServicesId = [];
        servicesID.data.forEach(function (featureService) {
          arrFeaturedServicesId.push(featureService.related_id);
        });
        return arrFeaturedServicesId;
      });

    await this.$dbCon
      .service("services")
      .find({
        query: {
          // _id: {
          //   $in: services
          // }
        },
      })
      .then((results) => {
        this.data = results.data;
      });
  },
};
</script>