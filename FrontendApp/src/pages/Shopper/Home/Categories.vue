<template>
  <div :class="$q.screen.lt.md ? 'q-mt-sm' : 'q-pa-sm'">
    <div v-if="$q.screen.lt.md" class="q-gutter-sm  q-pb-sm">
      <!-- <q-input outlined dense placeholder="What are you looking for?" />
      <q-input outlined dense placeholder="Location" />
      <div align="right">
        <q-btn unelevated color="primary" label="Search" icon="search" />
      </div> -->
    </div>
    <br />

    <div class="row justify-center" align="center" v-if="!isIos">
      <div class="col-6">
        <q-btn
          v-if="!isInstalled && $q.screen.lt.md"
          @click="install"
          color="primary "
          style="min-width:91%; border-radius: 20px;"
          rounded
          class="q-card"
        >
          <img
            src="https://anturaz.io/icons/download_mobile.svg"
            alt="Install App"
            class="text-black"
            style="width: 24px; height: 24px; margin-right: 8px; filter: brightness(0) saturate(100%); "
          />
          <span class="text-black text-weight-regular">
            Install App
          </span>
        </q-btn>
      </div>
    </div>
    <div bordered flat align="center">
      <q-input
        square
        outlined
        :value="$route.query.query"
        v-model="searchquery"
        label="What are you looking for?"
        style="min-width:300px;background-color:white !important"
        dense
        class="q-card q-ma-md  primary-border"
        v-if="!$q.screen.gt.md"
      />

      <q-select
        square
        outlined
        v-model="location"
        :options="$provinceList"
        label="Location"
        dense
        style="min-width:300px;background-color:white !important"
        class="q-card q-ma-md  primary-border"
        v-if="!$q.screen.gt.md"
      />

      <q-btn
        @click="
          $router.push('/search?query=' + searchquery + '&location=' + location)
        "
        square
        color="primary"
        icon="search"
        unelevated
        style="min-width:91%;"
        class="q-card   primary-border"
        v-if="!$q.screen.gt.md"
      >
        <label>Search</label>
      </q-btn>
    </div>

    <q-card
      bordered
      flat
      align="center"
      style="border-radius: 20px; background-color: transparent;border-color: #d8a957;"
      v-if="$q.screen.gt.md"
    >
      <q-card-section
        style="position: relative; padding-top: 8px; padding-bottom: 8px; padding-left: 0px;padding-right: 0px;"
      >
        <p class="text-subtitle1">CATEGORIES</p>
        <q-separator color="primary" />
      </q-card-section>
      <q-card-section class="row">
        <!-- <q-btn :label unelevated :color="index%2==0?'primary': 'grey'"></q-btn> -->
        <div class="row justify-center">
          <q-list
            class="q-ma-sm rounded-borders items-center "
            :class="
              index == 1 || index == 4 || index == 7
                ? 'bg-white text-primary'
                : 'bg-primary text-white'
            "
            bordered
            separator
            :style="
              !$q.screen.lt.md
                ? 'min-width:100px;max-width:10px;min-height:40px;border-radius: 15px'
                : ''
            "
            v-for="(category, index) in filteredCategories"
            v-if="index < 8"
            :key="category._id"
          >
            <q-item clickable v-if="index != 7">
              <q-item-section
                @click="
                  $router.push(
                    `/search?query=&location=All&category=${encodeURIComponent(
                      category.category_name
                    )}`
                  )
                "
              >
                <!-- just use this if need to use categories  -->
                <q-item-label>
                  <q-icon
                    v-if="index == 0"
                    color="black"
                    name="fas fa-female"
                    size="25px"
                    style="padding-top: 20%; position: relative; top: -3px;"
                  />
                  <q-icon
                    v-if="index == 1"
                    name="fas fa-ring"
                    color="black"
                    size="30px"
                    style="padding-top: 20%; position: relative; top: -3px;"
                  />
                  <q-icon
                    v-if="index == 2"
                    name="fas fa-user-tie"
                    color="black"
                    size="25px"
                    style="padding-top: 20%; position: relative; top: -3px;"
                  />
                  <q-icon
                    v-if="index == 3"
                    name="fas fa-paint-brush"
                    color="black"
                    size="25px"
                    style="padding-top: 20%; position: relative; top: -5px;"
                  />
                  <q-icon
                    v-if="index == 4"
                    color="black"
                    name="fas fa-bullhorn"
                    size="25px"
                    style="padding-top: 20%; position: relative; top: -3px;"
                  />
                  <q-icon
                    v-if="index == 5"
                    color="black"
                    name="fas fa-gift"
                    size="25px"
                    style="padding-top: 20%; position: relative; top: -3px;"
                  />
                  <q-icon
                    v-if="index == 6"
                    name="fas fa-concierge-bell"
                    color="black"
                    size="25px"
                    style="padding-top: 20%; position: relative; top: -3px;"
                  />
                </q-item-label>
                <q-item-label
                  :class="[
                    getClass(index),
                    isSingleWord(category.category_name)
                      ? 'q-pt-sm text-weight-medium'
                      : 'q-pt-sm text-weight-medium'
                  ]"
                  caption
                  align="center"
                  style="margin-top: -2px; "
                >
                  <span class="text-black text-weight-light">
                    {{ abbreviateName(category.category_name) }}
                  </span>
                </q-item-label>
              </q-item-section>
              <!-- <q-item-section avatar>
              <q-item-label>
                <q-icon name="format_size" />
              </q-item-label>
              
            </q-item-section>
            <q-item-section>
              <q-item-label
                class="text-white"
                caption
                lines="2"
                align="center"
              >{{category.category_name}}</q-item-label>
            </q-item-section> -->
            </q-item>

            <!-- http://localhost:8080/#/search?query=&location=All -->
            <q-item clickable v-else>
              <q-item-section
                @click="$router.push(`/search?query=&location=All`)"
              >
                <q-item-label class="q-pt-md text-black text-weight-light">
                  {{ $q.screen.lt.md ? "ALL" : "SEE ALL" }}
                </q-item-label>
              </q-item-section>
              <!-- <q-item-section avatar>
              <q-item-label>
                <q-icon name="format_size" />
              </q-item-label>
              
            </q-item-section>
            <q-item-section>
              <q-item-label
                class="text-white"
                caption
                lines="2"
                align="center"
              >{{category.category_name}}</q-item-label>
            </q-item-section> -->
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>

    <q-card v-else class="q-card q-ma-md primary-border">
      <q-card-section class="flex justify-center">
        <span class="text-subtitle1 text-weight-bold">CATEGORIES</span>
      </q-card-section>
      <q-card-section class="row">
        <!-- <q-btn :label unelevated :color="index%2==0?'primary': 'grey'"></q-btn> -->
        <div class="row justify-center">
          <!-- :class="
              index == 1 || index == 4 || index == 7
                ? 'bg-white text-primary'
                : 'bg-primary text-white'
            " -->
          <q-list
            class="q-ma-sm rounded-borders items-center "
            :class="
              index == 1 || index == 4 || index == 7
                ? 'bg-white  text-grey-10'
                : 'bg-primary text-grey-10'
            "
            bordered
            separator
            style="width: calc(25% - 20px); margin: 10px; display: flex; flex-direction: column; align-items: center; cursor: pointer;"
            v-for="(category, index) in filteredCategories"
            v-if="index < 8"
            :key="category._id || category.category_name"
          >
            <q-item clickable v-if="index != 7">
              <q-item-section
                @click="
                  $router.push(
                    `/search?query=&location=All&category=${encodeURIComponent(
                      category.category_name
                    )}`
                  )
                "
              >
                <!--  just use this if need to use categories -->
                <!--  <q-item-section>-->
                <q-item-label>
                  <q-item-section
                    style="display: flex; justify-content: center; align-items: center;"
                  >
                    <q-icon
                      v-if="index == 0"
                      name="fas fa-female"
                      size="16px"
                    />
                    <q-icon
                      v-if="index == 1"
                      name="fas fa-ring"
                      class="q-pt-sm"
                      size="16px"
                    />
                    <q-icon
                      v-if="index == 2"
                      class="q-pt-sm"
                      name="fas fa-user-tie"
                      size="16px"
                    />
                    <q-icon
                      v-if="index == 3"
                      name="fas fa-paint-brush"
                      size="16px"
                    />
                    <q-icon
                      v-if="index == 4"
                      name="fas fa-bullhorn"
                      size="16px"
                    />
                    <q-icon v-if="index == 5" name="fas fa-gift" size="16px" />
                    <q-icon
                      v-if="index == 6"
                      name="fas fa-concierge-bell"
                      size="16px"
                    />
                  </q-item-section>
                </q-item-label>
                <q-item-label
                  :class="[
                    getClass(index),
                    isSingleWord(category.category_name)
                      ? 'q-pt-sm text-weight-medium'
                      : 'q-pt-sm text-weight-medium'
                  ]"
                  caption
                  align="center"
                  style="margin-top: -2px; "
                >
                  <span class="text-black text-weight-light">
                    {{
                      $q.screen.lt.md
                        ? abbreviateName(category.category_name)
                        : category.category_name
                    }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-else>
              <q-item-section>
                <q-item-label
                  @click="$router.push(`/search?query=&location=All`)"
                  class="q-pt-md text-weight-medium"
                >
                  {{ $q.screen.lt.md ? "ALL" : "SEE ALL" }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchquery: "",
      location: "",
      data: [],
      logos: {
        "Sound System": "s"
      },
      specifiedCategories: [
        "Gowns",
        "Suits",
        "Hair & Makeup",
        "Rings",
        "Gifts",
        "Wedding Planner",
        "Catering",
        "ALL"
      ],
      deferredPrompt: null,
      showInstallButton: false,
      isInstalled: false,
      isIos: false
    };
  },
  created() {
    this.isIos =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    this.isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      console.log(e);
      this.deferredPrompt = e;
      this.isInstalled = false;
    });
    window
      .matchMedia("(display-mode: standalone)")
      .addEventListener("change", e => {
        this.isInstalled = e.matches;
      });
  },
  computed: {
    filteredCategories() {
      const categories = this.data.filter(category =>
        this.specifiedCategories.includes(category.category_name)
      );
      categories.push({ category_name: "ALL" }); // Add the "ALL" option
      return categories;
    }
  },
  methods: {
    async install() {
      this.deferredPrompt.prompt();
    },
    onHidden: function() {
      return false;
    },
    isSingleWord(categoryName) {
      return categoryName.trim().split(/\s+/).length === 1;
    },
    getClass(index) {
      return index == 1 || index == 4 || index == 7
        ? "bg-white text-primary"
        : "bg-primary text-white";
    },
    abbreviateName(name) {
      if (name === "Gowns") {
        return "Gowns";
      }
      if (name === "Rings") {
        return "Rings";
      }
      if (name === "Suits") {
        return "Suits";
      }
      if (name === "Gifts") {
        return "Gifts";
      }
      if (name === "Hair & Makeup") {
        return "HMUA";
      }
      if (name === "Wedding Planner") {
        return "Planner";
      }
      if (name === "Catering") {
        return "Catering";
      }
      if (name === "ALL") {
        return "ALL";
      }
    }
  },
  mounted() {
    this.$dbCon
      .service("categories")
      .find({})
      .then(results => {
        console.log(results.data);
        this.data = results.data;

        // console.log("this", this.data);
      });
  }
};
</script>
<style scoped>
.primary-border {
  border: 2px solid rgb(216, 169, 87); /* Primary color border */
}
</style>
