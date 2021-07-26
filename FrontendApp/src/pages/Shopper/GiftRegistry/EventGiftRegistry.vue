<template>
  <div class="q-pa-lg row">
    <div class="col-12 q-pb-xl">
      <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" />
        <q-breadcrumbs-el label="Gift Registry" icon="card_giftcard" />
        <q-breadcrumbs-el :label="data.event_name" />
      </q-breadcrumbs>
      <q-separator />
    </div>
    <div class="col-md-2 col-sm-12 column self-center" align="center">
      <q-icon name="card_giftcard" size="100px" color="grey" />
      <div class="text-grey text-bold">GIFT REGISTRY</div>
    </div>
    <div class="col-md-5 col-sm-12">
      <div class="text-bold text-h4">{{data.event_name}}</div>
      <div class="text-grey">
        <b>Groom:</b>
        {{data.grooms_name}}
      </div>
      <div class="text-grey">
        <b>Bride:</b>
        {{data.brides_name}}
      </div>
      <div class="text-grey">
        <b>Wedding Date:</b>
        {{data.wedding_date}}
      </div>
      <div class="text-grey">
        <b>Shipping Address:</b>
        {{data.house_bldg_st+" "+data.barangay_district+", "+data.city_municipality+", "+data.state_province+", "+data.country+` (${data.zip_code})`}}
      </div>
    </div>
    <div class="col-md-5 col-sm-12 q-pr-xl column justify-between" align="right">
      <div class="text-grey col-1">
        <b>REFERENCE NUMBER:</b>
        {{data.reference_number}}
      </div>
      <div class="text-grey col-2" v-if="$route.path.split('/')[3] == 'Manage'">
        <q-btn
          :label="this.data.published?'Unpublish': 'Publish'"
          flat
          color="grey"
          @click="unpublish"
        />
        <q-btn label="delete" flat color="primary" @click="deleteGiftRegistry" />
      </div>
    </div>
    <div class="q-pt-lg col-12">
      <q-separator />
    </div>
    <div class="col-12">
      <div class="row">
        <q-card flat bordered class="q-ma-sm" v-for="item in selectedProducts" :key="item._id">
          <q-card-section style="height:180px;width:200px">
            <q-img :ratio="1" :src="item.photos[0]" />
          </q-card-section>
          <q-card-section style="height:75px;width:200px">
            <div class="text-title text-bold" v-if="'product_name' in item">{{item.product_name}}</div>
            <div>
              <font
                class="text-bold text-primary"
              >{{(item.sale_price !=''? $prettyMoney(item.sale_price): $prettyMoney(item.regular_price))}}</font>
              <font class="text-grey q-pl-sm" v-if="item.sale_price !=''">
                <strike>{{$prettyMoney(item.regular_price)}}</strike>
              </font>
            </div>
            <div class="row">
              <div>Store: &nbsp;</div>
              <div class="text-primary" style="cursor:pointer">Gilbert Shop</div>
            </div>
          </q-card-section>
          <q-card-section style="height:55px;width:200px" align="right">
            <q-btn
              v-if="$route.path.split('/')[3] == 'Manage'"
              @click="RemoveProduct(item._id)"
              color="grey"
              label="Remove"
              unelevated
            />
            <a
              v-if="$route.path.split('/')[3] == 'Manage'"
              :href="$appLink+'/ProductDetails/'+item._id"
              target="_blank"
            >
              <q-btn color="primary" label="View >" unelevated />
            </a>
            <q-btn
              v-if="$route.path.split('/')[3] != 'Manage'"
              @click="$router.push('/ProductDetails/'+item._id)"
              color="primary"
              label="View >"
              unelevated
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-list v-if="$route.path.split('/')[3] == 'Manage'" padding bordered class="q-pt-md col-12">
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="add"
        label="Add Products"
        default-opened
      >
        <q-card>
          <q-card-section class="row">
            <q-input
              class="q-pt-md col-sm-12 col-md-2 offset-md-10"
              rounded
              outlined
              dense
              placeholder="Search products"
              v-model="search"
              input-class="text-right"
              debounce="500"
            >
              <template v-slot:append>
                <q-icon v-if="search === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
              </template>
            </q-input>
            <div class="q-pt-md col-12">
              <div class="row">
                <q-card flat bordered class="q-ma-sm" v-for="item in products" :key="item._id">
                  <q-card-section style="height:180px;width:200px">
                    <q-img :ratio="1" :src="item.photos[0]" />
                  </q-card-section>
                  <q-card-section style="height:75px;width:200px">
                    <div
                      class="text-title text-bold"
                      v-if="'product_name' in item"
                    >{{item.product_name}}</div>
                    <div>
                      <font
                        class="text-bold text-primary"
                      >{{(item.sale_price !=''? $prettyMoney(item.sale_price): $prettyMoney(item.regular_price))}}</font>
                      <font class="text-grey q-pl-sm" v-if="item.sale_price !=''">
                        <strike>{{$prettyMoney(item.regular_price)}}</strike>
                      </font>
                    </div>
                    <div class="row">
                      <div>Store: &nbsp;</div>
                      <div class="text-primary" style="cursor:pointer">Gilbert Shop</div>
                    </div>
                  </q-card-section>
                  <q-card-section style="height:55px;width:200px" align="right">
                    <q-btn @click="AddProduct(item._id)" color="primary" label="Add" unelevated />
                    <a :href="$appLink+'/ProductDetails/'+item._id" target="_blank">
                      <q-btn color="grey" label="View >" unelevated />
                    </a>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      search: "",
      products: [],
      selectedProducts: []
    };
  },
  methods: {
    AddProduct: function(product) {
      if (!this.data.items.includes(product)) {
        this.data.items.push(product);
        this.$dbCon.service("gift-registry").patch(this.data._id, this.data);
      }
    },
    RemoveProduct: function(product) {
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Are you sure you want to remove this product to the gift registry?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.data.items.splice(this.data.items.indexOf(product), 1);
          this.$dbCon.service("gift-registry").patch(this.data._id, this.data);
        });
    },
    unpublish: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Are you sure you want to " +
            (this.data.published ? "Unpublish" : "Publish") +
            " this Gift Registry?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.data.published = !this.data.published;
          this.$dbCon.service("gift-registry").patch(this.data._id, this.data);
        });
    },
    deleteGiftRegistry: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Are you sure you want to delete this Gift Registry?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.data.deleted = true;
          this.$dbCon
            .service("gift-registry")
            .patch(this.data._id, this.data)
            .then(() => {
              this.$router.push("/GiftRegistry");
            });
        });
    },
    getData: async function() {
      await this.$dbCon.authenticate();
      // GET GIFT REGISTRY DETAILS
      await this.$dbCon
        .service("gift-registry")
        .find({
          query: {
            reference_number: this.$route.params.reference_no
          }
        })
        .then(results => {
          if (results.total == 0) {
            this.$router.push("/GiftRegistry");
          } else {
            this.data = results.data[0];
            if (this.$route.path.split("/")[3] != "Manage" && this.$route.path.split("/")[3] !=undefined) {
              if (this.data.published == false || this.data.deleted == true) {
                this.$router.push("/");
              }
            }
          }
        })
        .catch(e => {
          console.log(e);
          this.$router.push("/GiftRegistry");
        });
      //Get all selected products
      await this.$dbCon
        .service("products")
        .find({
          query: {
            _id: { $in: this.data.items }
          }
        })
        .then(results => {
          this.selectedProducts = results.data;
        });
    }
  },
  async mounted() {
    this.$dbCon.service("gift-registry").onDataChange(() => {
      this.getData();
    });
    //Get all products
    var query = {};
    if (this.search.trim() != "") {
      query["$search"] = this.search;
    }
    await this.$dbCon
      .service("products")
      .find(query)
      .then(results => {
        this.products = results.data;
      });
  },
  watch: {
    search: async function() {
      var query = {};
      if (this.search.trim() != "") {
        query["$search"] = this.search;
      }
      await this.$dbCon
        .service("products")
        .find({ query: query })
        .then(results => {
          this.products = results.data;
        });
    }
  }
};
</script>

<style>
</style>