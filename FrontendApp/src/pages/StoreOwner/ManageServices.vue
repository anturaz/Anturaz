<template>
  <div class="q-pa-md">
    <q-breadcrumbs class="text-grey" v-if="$route.path!='/StoreOwner/PublishStore'">
      <q-breadcrumbs-el label="Store" icon="store" />
      <q-breadcrumbs-el label="Inventory" icon="inventory" />
      <q-breadcrumbs-el label="Services" />
    </q-breadcrumbs>
    <br />
    <div class="bg-grey-3">
      <q-toolbar>
        <AddService v-if="maximum_services>data.length" />
        <AddMoreItem v-else itemtype="Services" />&nbsp;
        <q-space />
        <q-input
          v-if="$route.path!='/StoreOwner/PublishStore'"
          square
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
      <q-separator />
      <q-toolbar>
        <p class="text-bold">
          <br />
          Maximum Items: {{maximum_services}}
          <br />
          Current Items: {{data.length}}
        </p>
      </q-toolbar>
    </div>
    <q-table :data="data" :columns="columns" row-key="name" :filter="filter" grid hide-header>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-md-4 col-lg-3">
          <q-card>
            <q-img :src="props.row.photos[0]" style="width:100%;height:150px" />
            <AdvertiseButton
              v-if="$compareToCurrentDate(props.row.expiry)!='past'"
              :related_id="props.row._id"
              item_type="service"
            />
            <q-btn
              label="Expired"
              v-else
              icon="info"
              color="red"
              @click="unavailableMessage"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(300%);"
            />

            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-actions align="around">
              <q-btn
                class="full-width"
                color="primary"
                flat
                label="Manage"
                @click="$router.push('Services/ManageService?service='+props.row._id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import AddService from "./Inventory/addService.vue";
import AdvertiseButton from "./Inventory/advertiseButton.vue";
import AddMoreItem from "./Inventory/addMoreItem.vue";
export default {
  components: {
    AddService,
    AdvertiseButton,
    AddMoreItem
  },
  data() {
    return {
      data: [],
      filter: "",
      columns: [
        {
          name: "SKU",
          required: true,
          label: "SKU",
          align: "left",
          field: "SKU"
        },
        {
          name: "service_name",
          required: true,
          label: "Service Name",
          align: "left",
          field: "service_name"
        },
        {
          name: "category",
          align: "center",
          label: "Category",
          field: "category"
        },
        {
          name: "regular_price",
          label: "Regular Price",
          field: "regular_price"
        },
        { name: "sale_price", label: "Sale Price", field: "sale_price" }
      ],
      maximum_services: 0
    };
  },
  methods: {
    max_service: function() {
      this.$q.dialog({
        title: "Maximum number of Services reached!",
        message:
          "To add more service, you may avail it via Bank Deposit or Layaway"
      });
    },
    getData: function() {
      this.$dbCon
        .service("services")
        .find({
          query: {
            store_id: this.$local.getItem("store_token"),
            deleted: false
          }
        })
        .then(results => {
          this.data = results.data;
        });
    },
    advertise: function() {
      this.$q.dialog({
        title: "Alert",
        message: "Not yet working"
      });
    },
    unavailableMessage: function() {
      this.$q.dialog({
        title: "Unavailable Item",
        message:
          "This item is no longer available due to expired item subscription. You may reactivate this item again by purchasing a subscription."
      });
    }
  },
  mounted() {
    this.$dbCon.service("services").onDataChange(() => {
      this.getData();
    });
    this.$dbCon.service("service-subscriptions").onDataChange(() => {
      this.getData();
    });

    this.$dbCon
      .service("service-subscriptions")
      .find({
        query: {
          store_id: this.$local.getItem("store_token"),

          $or: [
            {
              date_end: {
                $gte: new Date()
              },
              status: "Paid"
            },
            {
              status: "Free"
            }
          ]
        }
      })
      .then(results => {
        var maximum_services = 0;
        results.data.map(sub => {
          maximum_services += sub.items;
        });
        this.maximum_services = maximum_services;
      });
  }
};
</script>

<style>
</style>
