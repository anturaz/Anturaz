<template >
  <div class="q-pa-md row">
    <div class="col-12">
      <q-breadcrumbs class="text-grey">
        <q-breadcrumbs-el label="Store" icon="store" />

        <q-breadcrumbs-el label="Inventory" icon="inventory" />
        <q-breadcrumbs-el label="Service" />
        <q-breadcrumbs-el :label="data.service_name" />
      </q-breadcrumbs>
      <br />
    </div>
    <div class="col-12">
      <q-btn
        icon="arrow_back_ios"
        color="primary"
        flat
        label="back"
        dense
        @click="$router.push('/StoreOwner/Inventory/Services')"
      />
    </div>
    <div :class="$q.screen.lt.sm? 'col-12': 'col-6'">
      <input class="hidden" type="file" ref="fileInput" @change="onFileSelected" />
      <div style="overflow: hidden;height:300px">
        <q-img :src="currentPicture">
          <q-btn
            fab
            color="primary"
            icon="edit"
            class="absolute"
            @click="changeCurrentPicture()"
            style="top: 1; right: 12px; transform: translateY(20%);"
          />
        </q-img>
      </div>
      <div class="row">
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden;height:100px"
          @click="currentPicture=data.photos[0],currentIndexPicture=0"
        >
          <q-img :src="data.photos[0]" />
        </q-btn>
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden;height:100px"
          @click="currentPicture=data.photos[1],currentIndexPicture=1"
        >
          <q-img :src="data.photos[1]" />
        </q-btn>
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden;height:100px"
          @click="currentPicture=data.photos[2],currentIndexPicture=2"
        >
          <q-img :src="data.photos[2]" />
        </q-btn>
        <q-btn
          class="col-3"
          outline
          color="grey"
          style="overflow: hidden;height:100px"
          @click="currentPicture=data.photos[3],currentIndexPicture=3"
        >
          <q-img :src="data.photos[3]" />
        </q-btn>
      </div>
      <br />

      <q-markup-table flat bordered dense>
        <thead>
          <tr>
            <td class="bg-primary text-white" colspan="3">Logs</td>
          </tr>
          <tr>
            <td class="text-bold text-left">Date</td>
            <td class="text-bold text-right">Description</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in data.logs.slice().reverse()" :key="log.date">
            <td class="text-left">{{$formatDate(log.date)}}</td>
            <td class="text-right">{{log.event}}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div :class="$q.screen.lt.sm? 'col-12':'col-6 q-pl-md'">
      <div class="col-12 row">
        <EditService class="col-6" />
        <q-btn
          class="col-6"
          outline
          color="primary"
          size="sm"
          dense
          label="Delete Service"
          @click="deleteService()"
        />
      </div>
      <br />
      <q-markup-table flat bordered dense>
        <tbody>
          <tr>
            <td class="text-bold">SKU:</td>
            <td class="text-right">{{data.SKU}}</td>
          </tr>
          <tr>
            <td class="text-bold">Service Name:</td>
            <td class="text-right">{{data.service_name}}</td>
          </tr>
          <tr>
            <td class="text-bold">Category:</td>
            <td class="text-right">{{data.category}}</td>
          </tr>
          <tr>
            <td class="text-bold">Regular Price:</td>
            <td class="text-right">{{data.regular_price}}</td>
          </tr>
          <tr>
            <td class="text-bold">Sale Price:</td>
            <td class="text-right">{{data.sale_price}}</td>
          </tr>
          
        </tbody>
      </q-markup-table>
      <br />
      <q-card flat bordered>
        <q-card-section>
          <p class="text-bold">Description:</p>
          <div v-html="data.description" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import EditService from "./editService.vue";
export default {
  components: {
    EditService
  },
  data() {
    return {
      data: {},
      currentPicture: "",
      currentIndexPicture:0,
      fileSelected: {}
    };
  },
  methods: {
    deleteService: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you really want to delete this service?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          }
        })
        .onOk(() => {
          this.$q
            .dialog({
              title: "Confirmation",
              message: "Enter your password",
              prompt: {
                model: "",
                type: "password" // optional
              },
              cancel: true,
              persistent: true
            })
            .onOk(data => {
              this.$dbCon
                .service("shop")
                .find({
                  query: {
                    _id: this.$local.getItem("store_token")
                  }
                })
                .then(result => {
                  if (result.data[0].password == data) {
                    this.data.deleted = true;
                    this.$dbCon
                      .service("services")
                      .patch(this.data._id, this.data)
                      .then(() => {
                        this.$q.dialog({
                          title: "Success!",
                          message: "You have successfully deleted a service."
                        });
                        this.$router.push("/StoreOwner/Inventory/Services");
                      });
                    this.$dbCon
                      .service("shop")
                      .find({
                        query: {
                          _id: this.$local.getItem("store_token")
                        }
                      })
                      .then(result => {
                        this.$axios.post(this.$appLink + "/customizableEmail", {
                          receiver: result.data[0].email,
                          subject: "Deleted Service",
                          message: `<h3>Deleted Service</h3>
                  <p>Your service has been deleted!</p>
                  `
                        });
                      });
                  } else {
                    this.$q.dialog({
                      title: "Error!",
                      message:
                        "Unable to delete service. You have entered wrong password"
                    });
                  }
                });
            });
        });
    },
    changeCurrentPicture: function() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: "Do you want to replace the current photo?",
          cancel: {
            push: true,
            color: "grey",
            flat: true
          },
          persistent: true
        })
        .onOk(() => {
          this.$refs["fileInput"].click();
        });
    },
    onFileSelected: async function() {
      this.$q.loading.show()
      this.fileSelected = event.target.files[0];
      var result = await this.uploadImage(this.fileSelected);
      this.data.photos[this.currentIndexPicture] = result;
      this.currentPicture = this.data.photos[this.currentIndexPicture];
      await this.$forceUpdate();
      this.$dbCon
        .service("services")
        .patch(this.data._id, this.data)
        .then(() => {
           this.$q.loading.hide()
          this.$q.notify({
            message: "Successfully Updated!",
            position: "top-right",
            color: "primary",
            timeout: 700,
            icon: "check"
          });
        });
    },
    uploadImage: async function(fileSelected) {
      const formData = new FormData();
      formData.append(this.$appLink, fileSelected, fileSelected.name);
      var result = await this.$axios.post(
        this.$appLink + "/uploadServices",
        formData
      );
      return result.data;
    }
  },
  mounted() {
    this.$dbCon
      .service("services")
      .find({
        query: {
          _id: this.$route.query.service,
          store_id: this.$local.getItem("store_token")
        }
      })
      .then(result => {
        if (result.data.length == 0) {
          this.$router.push("/StoreOwner/Inventory");
        } else {
          this.data = result.data[0];
          this.currentPicture = this.data.photos[0];
        }
      });
  }
};
</script>

<style>
</style>
