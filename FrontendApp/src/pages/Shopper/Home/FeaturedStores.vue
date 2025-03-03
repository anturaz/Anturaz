<template>
  <div class="q-pa-lg bg-white" v-if="data.length">
    <br />
    <h5><span>Featured Shops</span></h5>
    <div class="row text-black">
      <div
        class="scroll-container"
        ref="scrollContainer"
        @mouseenter="stopScroll"
        @mouseleave="autoScroll"
      >
        <div class="scroll-item" v-for="store in data" :key="store._id">
          <q-card flat class="card-content">
            <q-card-section class="column items-center">
              <q-avatar size="100px">
                <q-icon v-if="store.logo == ''" name="store" color="grey" />
                <q-img v-if="store.logo != ''" :src="store.logo" :ratio="1" />
              </q-avatar>
            </q-card-section>
            <q-card-section class="column items-center">
              <div
                class="text-h6"
                v-if="'store_name' in store"
                style="width: 180px; text-align: center;"
                @click="$router.push('/StoreDetails?store=' + store._id)"
              >
                <p
                  style="margin:0px; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                >
                  {{ store.store_name }}
                </p>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoScrollInterval: null,
      scrollSpeed: 3,
      data: []
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$dbCon.service("store").find({
          query: {
            logo: {
              $nin: [null, ""]
            }
          }
        });
        this.data = response.data;
        this.$nextTick(() => {
          this.autoScroll();
        });
      } catch (err) {
        console.log(err);
      }
    },
    autoScroll() {
      if (this.data.length === 0) return; // Prevent autoScroll if there's no data

      const container = this.$refs.scrollContainer;
      const totalWidth = container.scrollWidth;
      const containerWidth = container.offsetWidth;

      // Stop any existing interval
      if (this.autoScrollInterval) {
        clearInterval(this.autoScrollInterval);
      }

      // Start the scrolling interval
      this.autoScrollInterval = setInterval(() => {
        container.scrollLeft += this.scrollSpeed;

        // Reset to the start if the scroll reaches the end
        if (container.scrollLeft + containerWidth >= totalWidth) {
          container.scrollLeft = 0;
        }
      }, 70); // Adjust for smoother scrolling
    },
    stopScroll() {
      // Clear the scrolling interval when hovered
      if (this.autoScrollInterval) {
        clearInterval(this.autoScrollInterval);
        this.autoScrollInterval = null;
      }
    }
  },
  mounted() {
    this.getData();
  },
  beforeDestroy() {
    // Clear interval on component destroy
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }
};
</script>

<style scoped>
.scroll-container {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
  gap: 16px;
  padding: 16px;
  position: relative;
}
.scroll-item {
  flex: 0 0 auto;
  width: 200px;
  cursor: pointer;
  transition: transform 0.5s ease;
}
.scroll-item:hover {
  transform: scale(1.05);
}
.card-content {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h5 {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #d8a957;
  line-height: 0.1em;
  margin: 10px 0 20px;
}
h5 span {
  background: #fff;
  padding: 0 10px;
}
</style>
