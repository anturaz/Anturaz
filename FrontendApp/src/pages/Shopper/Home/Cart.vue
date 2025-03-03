<template>
  <div
    class=" row"
    :class="!$q.screen.lt.md ? ' q-pa-lg' : 'q-pt-lg q-pl-sm q-pr-sm'"
  >
    <div class="col-12">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" to="/" />
        <q-breadcrumbs-el label="Shopping Cart" icon="shopping_cart" />
      </q-breadcrumbs>
      <q-separator />
    </div>
    <div class="col-1"></div>
    <q-card
      class="col-10"
      flat
      :class="!$q.screen.lt.md ? '' : 'col-12 '"
      v-if="!$q.screen.lt.md"
    >
      <q-card-section class="q-pl-none q-pr-none">
        <q-list bordered separator>
          <div v-if="cart.length == 0" class="q-pa-md" align="center">
            <div>
              <q-icon name="shopping_cart" color="grey" size="200px" />
            </div>
            <div class="text-grey">No items found</div>
            <div>
              <q-btn
                unelevated
                @click="$router.push('/')"
                color="primary"
                label="Continue Shopping"
              />
            </div>
          </div>
          <CartItem
            v-for="(item, index) in cart"
            :item="item"
            :index="index"
            :key="item"
          />
          <q-separator />
        </q-list>
      </q-card-section>
    </q-card>

    <div v-else>
      <CartItem
        v-for="(item, index) in cart"
        :item="item"
        :index="index"
        :key="item"
      />
      <q-separator />
    </div>
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import CartItem from "components/cartItem.vue";
export default {
  components: {
    CartItem
  },
  data() {
    return {
      cart: [],
      user: {}
    };
  },
  methods: {
    getData: function() {
      this.$dbCon
        .authenticate()
        .then(async () => {
          this.user = await this.$getUser();
          // console.log(this.user._id);
          await this.$dbCon
            .service("cart")
            .find({
              query: {
                shopper_id: this.user._id
              }
            })
            .then(results => {
              this.cart = results.data;
            });
        })
        .catch(e => {
          this.cart = this.$session.get("cart");
        });
    }
  },
  async mounted() {
    this.$dbCon.service("cart").onDataChange(async () => {
      await this.getData();
      this.$forceUpdate();
    });
    this.$EventBus.$on("logged-in", async () => {
      this.getData();
    });
    // this.$EventBus.$on("modify-cart", async () => {
    //   this.getData();
    // });
  }
};
</script>
