<template>
  <div class="q-pa-lg row">
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
    <q-card class="col-10" flat>
      <q-card-section>
        <q-list bordered separator>
          <div v-if="cart.length==0" class="q-pa-md" align="center">
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
          <CartItem v-for="(item,index) in cart" :item="item" :index="index" :key="item" />
          <q-separator />
        </q-list>
      </q-card-section>
    </q-card>
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