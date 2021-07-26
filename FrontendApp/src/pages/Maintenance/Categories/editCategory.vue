<template>
  <div>
    <q-btn icon="edit" color="primary" size="sm" @click="open" round flat/>
    <q-dialog v-model="opened" persistent transition-show="scale" transition-hide="scale">
      <q-card flat class="bg-primary text-white" style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="row">
            <div class="text-h6 col-11">Edit Category</div>
            <div class="col-1">
              <q-btn flat icon="close" @click="opened = false" size="xs"/>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="bg-white text-black">
          <div class="q-pa-md">
            <q-banner v-if="error.length != 0" rounded class="bg-red text-white">
              <template v-slot:avatar>
                <q-icon name="error" color="white"/>
              </template>
              <ul>
                <li v-for="(err,index) in error" v-bind:key="index">{{err}}</li>
              </ul>
            </q-banner>
            <br v-if="error.length != 0">
            <q-input v-model="updated_category.category_name" label="Category Name*"/>
            <br>
            <q-field outlined label="Classification*" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  <q-radio v-model="updated_category.classification" val="Product" label="Product"/>
                  <q-radio v-model="updated_category.classification" val="Service" label="Service"/>
                </div>
              </template>
            </q-field>
            <br>
            <q-select
              class="full-width"
              filled
              v-model="updated_category.payment_options"
              multiple
              :options="options"
              label="Payment Option"
              style="width: 250px"
              use-chips
            />
            <br>
            <q-field outlined label="Subcategories" stack-label>
              <div class="text-black q-pa-md full-width">
                <q-input bottom-slots v-model="subcategory" label="Subcategory name*" stack-label>
                  <template v-slot:after>
                    <q-btn round dense flat icon="send" @click="addSubcategory"/>
                  </template>
                </q-input>
                <q-list bordered separator v-if="updated_category.subcategories.length!=0">
                  <q-item v-for="(sub,index) in updated_category.subcategories" v-bind:key="index">
                    <q-item-section>{{sub}}</q-item-section>
                    <q-item-section avatar>
                      <q-btn icon="close" size="xs" flat @click="removeSubcategory(index)"/>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-field>
          </div>

          <div class="q-gutter-sm" align="right">
            <q-btn label="close" outline color="grey" @click="close"/>
            <q-btn label="save" color="primary" @click="validate"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm_status">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white"/>
          <span class="q-ml-sm">Edit this category?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="YES" @click="save" color="primary" v-close-popup/>
          <q-btn flat label="NO" color="grey" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="success">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check" color="green" text-color="white"/>
          <span class="q-ml-sm">Category Updated!</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OKAY" color="green" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["category"],
  data() {
    return {
      opened: false,
      options: ["Full-payment", "Layaway", "20% Reservation"],
      subcategory: "",
      updated_category: {},
      confirm_status: false,
      success: false,
      error: []
    };
  },
  methods: {
    validate: async function() {
      this.error = [];
      if (this.updated_category.category_name.trim() == "") {
        this.error.push("Category Name field is required");
      } else {
        await this.$dbCon
          .service("categories")
          .find({
            query: {
              category_name: this.updated_category.category_name,
              _id: {
                $ne: this.updated_category._id
              }
            }
          })
          .then(result => {
            if (result.total != 0) {
              this.error.push("Category Name exists.");
            } 
          });
      }
      if (this.error.length == 0) {
        this.confirm_status = true;
      }
    },
    addSubcategory: function() {
      if (this.updated_category.subcategories.includes(this.subcategory)) {
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
      this.updated_category.subcategories.push(this.subcategory);
      this.subcategory = "";
    },
    removeSubcategory: function(x) {
      this.updated_category.subcategories.splice(x, 1);
    },
    open: function() {
      this.updated_category = _.cloneDeep(this.category);
      this.opened = true;
    },
    close: function() {
      this.updated_category = _.cloneDeep(this.category);
      this.opened = false;
    },
    save: function() {
      this.$dbCon.services.categories.update(
        this.updated_category["_id"],
        this.updated_category
      );
      this.opened = false;
      this.success = true;
    }
  },
  beforeMount() {
    this.updated_category = _.cloneDeep(this.category);
  }
};
</script>
