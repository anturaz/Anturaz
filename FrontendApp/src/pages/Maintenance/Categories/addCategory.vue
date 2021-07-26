<template>
  <div>
    <q-btn icon="add" round size="lg" @click="opened=true" color="primary"/>
    <q-dialog v-model="opened" persistent>
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">Add Category</div>
        </q-card-section>

        <q-separator/>

        <q-card-section>
          <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
            <template v-slot:avatar>
              <q-icon name="error" color="white"/>
            </template>
            <ul>
              <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
            </ul>
          </q-banner>

          <div class="q-pa-md">
            <q-input v-model="category_name" label="Category Name*"/>
            <br>
            <q-field outlined label="Classification*" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  <q-radio v-model="classification" val="Product" label="Product"/>
                  <q-radio v-model="classification" val="Service" label="Service"/>
                </div>
              </template>
            </q-field>
            <br>
            <q-select
              class="full-width"
              filled
              v-model="payment_options"
              multiple
              :options="options"
              label="Payment Option"
              style="width: 250px"
              use-chips
            />
            <br>
            <div class="text-black">
              <q-input bottom-slots v-model="subcategory" stack-label label="Subcategory name*">
                <template v-slot:after>
                  <q-btn round dense flat icon="send" @click="addSubcategory"/>
                </template>
              </q-input>

              <q-list bordered separator v-if="subcategories.length!=0">
                <q-item v-for="(sub,index) in subcategories" v-bind:key="index">
                  <q-item-section>{{sub}}</q-item-section>
                  <q-item-section avatar>
                    <q-btn icon="close" size="xs" flat @click="removeSubcategory(index)"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" @click="close"/>
          <q-btn flat label="Submit" @click="validate" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      step: 1,
      category_name: "",
      classification: "Product",
      subcategory: "",
      subcategories: [],
      payment_options: ["Full-payment", "Layaway"],
      options: ["Full-payment", "Layaway", "20% Reservation"],
      error: []
    };
  },
  methods: {
    addSubcategory: function() {
      if (this.subcategories.includes(this.subcategory)) {
        this.$q.notify({
          message: "Subcategory Name must be unique.",
          color: "red"
        });
        return;
      }
      if (this.subcategory == "") {
        this.$q.notify({
          message: "Subcategory Name is required.",
          color: "red"
        });
        return;
      }
      this.subcategories.push(this.subcategory);
      this.subcategory = "";
    },
    removeSubcategory: function(x) {
      this.subcategories.splice(x, 1);
    },
    submit: function() {
      this.$dbCon.services.categories
        .create({
          category_name: this.category_name,
          classification: this.classification,
          subcategories: this.subcategories,
          payment_options: this.payment_options,
          status: "Active",
          createdAt: new Date()
        })
        .then(result => {
          this.close();
        });
    },
    close: function() {
      this.opened = false;
      this.step = 1;
      this.category_name = "";
      this.classification = "Product";
      this.subcategory = "";
      this.subcategories = [];
      this.payment_options = ["Full-payment", "Layaway"];
      this.error = [];
    },
    validate: async function() {
      this.error = [];
      if (this.category_name.trim() == "") {
        this.error.push("Category Name field is required.");
      } else {
        await this.$dbCon
          .service("categories")
          .find({
            query: {
              category_name: this.category_name
            }
          })
          .then(result => {
            if (result.total != 0) {
              this.error.push("Category Name exists.");
            } else {
              this.$q
                .dialog({
                  title: "Confirm",
                  message: "Would you like to add this Category?",
                  cancel: {
                    push: true,
                    color: "grey",
                    flat: true
                  },
                  persistent: true
                })
                .onOk(() => {
                  this.submit();
                });
            }
          });
      }
    }
  },
  watch: {
    classification: function() {
      if (this.classification == "Product") {
        this.payment_options = ["Full-payment", "Layaway"];
      } else {
        this.payment_options = ["Full-payment", "Layaway", "20% Reservation"];
      }
    }
  }
};
</script>