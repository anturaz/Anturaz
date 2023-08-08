<template>
  <div>
    <q-item>
      <q-item-section avatar>
        <q-avatar size="100px" square>
          <img :ratio="1" :src="data.photos[0]" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-title" lines="1">{{
          item.type == "products" ? data.product_name : data.service_name
        }}</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">Category:</span>
          {{ data.category }}
        </q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold">Type:</span>
          {{ item.type == "products" ? "Product" : "Service" }}
        </q-item-label>
        <div v-if="item.type == 'products'">
          <q-item-label caption lines="2">
            <span class="text-weight-bold" v-if="item.size != undefined"
              >Size:</span
            >
            {{ item.size }}
          </q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold" v-if="item.color != undefined"
              >Color:</span
            >
            {{ item.color }}
          </q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold" v-if="item.material != undefined"
              >Material:</span
            >
            {{ item.material }}
          </q-item-label>
        </div>
      </q-item-section>

      <q-item-section side top>
        <div>
          <span class="text-primary text-title text-bold"
            >{{ $prettyMoney(data.sale_price) }}&nbsp;</span
          >
          <strike>{{ $prettyMoney(data.regular_price) }}</strike>
        </div>
        <div>Qty {{ item.quantity }}</div>
        <q-space />
        <div>
          <q-btn label="Remove" color="red-2" flat @click="removeItem()" />
          <!-- <q-btn label="Modify" color="grey" flat /> -->
          <q-btn
            unelevated
            class="col-md-7"
            color="primary"
            size="lg"
            label="Proceed to checkout"
            @click="checkLogin"
          />
        </div>
      </q-item-section>
    </q-item>
    <!-- LOGIN FORM -->
    <q-dialog v-model="loginForm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-space />
          <q-btn icon="close" flat round dense size="xs" v-close-popup />
        </q-card-section>
        <q-card-section>
          <ShopperLoginForm :afterLogin="afterLogin" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ShopperLoginForm from "components/shopperLoginForm.vue";
export default {
  props: ["item", "index"],
  components: {
    ShopperLoginForm
  },
  data() {
    return {
      loginForm: false,
      data: {}
    };
  },
  methods: {
    removeItem: function() {
      this.$q
        .dialog({
          title: "Remove Item From Cart?",
          message: "Are you sure you want to remove this item for cart?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          if (this.item._id == undefined) {
            //IF TRUE MEANING NAKALOGOUT ANG USER
            var cart = this.$session.get("cart");
            cart.splice(this.index, 1);
            this.$session.set("cart", cart);
            this.$EventBus.$emit("modify-cart", null);
          } else {
            //NAKALOGIN ANG USER
            this.$dbCon.service("cart").remove(this.item._id);
          }
        });
    },
    checkLogin: async function() {
      this.$dbCon
        .authenticate()
        .then(() => {
          if (this.item.type == "products") {
            this.$router.push("/checkoutProduct/" + this.item._id);
          } else {
            this.$router.push("/checkoutService/" + this.item._id);
          }
        })
        .catch(() => {
          this.loginForm = true;
        });
    },
    afterLogin: function() {
      this.loginForm = false;
      this.checkLogin();
    }
  },
  mounted() {
    this.$dbCon
      .service(this.item.type == "products" ? "products" : "services")
      .find({
        query: {
          _id: this.item.item_id
        }
      })
      .then(results => {
        this.data = results.data[0];
      });
  }
};
</script>

<style></style>
