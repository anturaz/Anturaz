<template>
  <div>
    <q-btn label="Add new category" no-caps @click="opened=true" size="md" flat color="primary" />
    <q-dialog v-model="opened">
      <q-card>
        <q-card-section>
          <q-select
            label="Categories"
            v-model="store.categories"
            :rules="[ () =>  store.categories.length!=0 || 'This Field is required' ]"
            class="col-xs-12"
            lazy-rules
            use-chips
            use-input
            multiple
            fill-input
            input-debounce="0"
            :options="categories_option"
            @filter="filterCategories"
            outlined
            square
            dense
            @add="()=>{$refs.categories.blur()}"
            @focus="()=>{categories_done=true}"
            @blur="()=>{categories_done=false}"
            ref="categories"
            :placeholder="!categories_done?'': 'search..'"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="opened=false" color="grey" />
          <q-btn flat label="Save" @click="save" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories_option: [],
      categories_list: [],
      store: {},
      opened: false,
      categories_done: false,
    };
  },
  methods: {
    filterCategories: function (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.categories_option = this.categories_list.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    save: async function () {
      await this.$dbCon.service("store").patch(this.store._id, this.store);

      this.$EventBus.$emit(
        "update-category",
        this.store.categories[this.store.categories.length - 1]
      );
      this.opened = false;
    },
  },
  async mounted() {
    await this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.$local.getItem("store_token"),
        },
      })
      .then((results) => {
        this.store = results.data[0];
      });
    this.$dbCon
      .service("categories")
      .find({
        query: {
          $select: ["category_name"],
        },
      })
      .then((results) => {
        results.data.map((category) => {
          this.categories_option.push(category.category_name);
          this.categories_list.push(category.category_name);
        });
      });
  },
};
</script>

<style>
</style>