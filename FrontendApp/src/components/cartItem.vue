<template>
  <div>
    <!-- <q-item v-if="!$q.screen.lt.md"> -->

    <q-item :class="!$q.screen.lt.md ? '' : 'q-pa-none q-pb-md'">
      <q-item-section avatar>
        <q-avatar
          :size="!$q.screen.lt.md ? '100px' : '80px'"
          :style="!$q.screen.lt.md ? '' : 'height:120px; width:100px; ;'"
          square
        >
          <img :ratio="1" :src="data.photos[0]" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-title" lines="2">
          {{ item.type == "products" ? data.product_name : data.service_name }}
        </q-item-label>
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
          <q-item-label caption lines="3">
            <span class="text-weight-bold" v-if="item.material != undefined"
              >Material:</span
            >
            {{ item.material }}
          </q-item-label>
        </div>
      </q-item-section>

      <q-item-section side top class="q-pl-none" style="padding-left: 0px;">
        <div v-if="!$q.screen.lt.md">
          <span class="text-primary text-title text-bold"
            >{{
              $prettyMoney(
                data.sale_price == 0 ? data.regular_price : data.sale_price
              )
            }}&nbsp;</span
          >
          <strike>{{
            $prettyMoney(data.sale_price != 0 ? data.regular_price : "")
          }}</strike>
        </div>
        <div v-else>
          <span class="text-primary text-title text-bold"
            >{{
              $prettyMoney(
                data.sale_price == 0 ? data.regular_price : data.sale_price
              )
            }}&nbsp;</span
          >
          <br />
          <strike>{{
            $prettyMoney(data.sale_price != 0 ? data.regular_price : "")
          }}</strike>
        </div>
        <div>Qty {{ item.quantity }}</div>
        <q-space />
        <div v-if="!$q.screen.lt.md">
          <q-btn label="Remove" color="red-2" flat @click="removeItem()" />
          <!-- <q-btn label="Modify" color="grey" flat /> -->
          <q-btn
            unelevated
            class="col-md-7"
            color="primary"
            size="md"
            label="Checkout"
            @click="checkLogin"
          />
        </div>
        <div v-else>
          <q-btn icon="delete" color="red-2" flat @click="removeItem()" />
          <q-btn
            unelevated
            class="col-md-7"
            color="primary"
            size="sm"
            label="Checkout"
            @click="checkLogin"
          />
          <!-- icon="shopping_cart" -->
        </div>
      </q-item-section>
    </q-item>

    <!-- <div v-else class="row col-12">
      <div class=" row q-pb-md q-pt-md">
        <q-card class="my-card q-pb-xs col-12" flat bordered>
          <q-card-section class="q-pa-none">
            <q-img :ratio="1" :src="data.photos[0]" class="small-img" />

            <q-card-section class="col-12 q-pt-xs">
              <div class="text-h6 ">
                {{
                  item.type == "products"
                    ? data.product_name
                    : data.service_name
                }}
              </div>
              <div class="text-subtitle2 text-grey">
                Type: {{ item.type == "products" ? "Product" : "Service" }}
              </div>
              <q-separator spaced />
              <div class=""></div>

              <q-card-actions class="q-mt-md" align="right">
                <q-btn
                  color="red-2"
                  outline
                  label="Remove"
                  @click="removeItem()"
                />
                <q-btn
                  color="primary"
                  label="Proceed to checkout"
                  @click="checkLogin"
                />
              </q-card-actions>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div> -->
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

<style>
.small-img {
  width: 100%;
  height: 150px;
  object-fit: cover; /* Keeps it cropped properly */
}
</style>
