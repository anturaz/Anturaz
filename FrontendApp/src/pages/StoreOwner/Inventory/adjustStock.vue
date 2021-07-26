<template>
  <div class="row">
    <q-btn
      class="col-11"
      outline
      color="primary"
      size="sm"
      dense
      label="Adjust Stock"
      @click="opened=true"
    />
    <div class="col-1" />
    <q-dialog v-model="opened" persistent>
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">Adjust Stock</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-sm">
          <q-input
            square
            outlined
            dense
            stack-label
            label="Stock on Hand"
            v-model="number_of_stock"
            min="1"
            type="number"
          />
          <q-input square outlined dense stack-label label="Reason for Adjustment" v-model="description" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn color="grey" @click="close" label="cancel" flat />
          <q-btn color="primary" @click="save" label="submit" flat />
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
      number_of_stock: this.$parent.data.stock,
      description: ""
    };
  },
  methods: {
    openModal: function(){
      this.opened=true
    },
    save: async function() {
      var add = this.number_of_stock >= this.$parent.data.stock;
      var amount = add
        ? this.number_of_stock - this.$parent.data.stock
        : this.$parent.data.stock - this.number_of_stock;
      this.$parent.data.stock = this.number_of_stock;
      await this.$parent.data.logs.push({
        event: this.description,
        date: new Date(),
        amount: amount,
        status: add ? "+" : "-"
      });
      this.$dbCon
        .service("products")
        .patch(this.$parent.data._id, this.$parent.data)
        .then(() => {
          this.$q
            .dialog({
              title: "Success!",
              message: "You successfully updated the inventory."
            })
            .onOk(() => {
              this.close();
            });
            this.$dbCon
                    .service("store")
                    .find({
                      query: {
                        _id: this.$local.getItem("store_token")
                      }
                    })
                    .then(result => {
                  //     this.$axios.post(this.$appLink + "/customizableEmail", {
                  //       receiver: result.data[0].email,
                  //       subject: "Stock Adjustment",
                  //       message: `<h3>Stock Adjustment</h3>
                  // <p>Your stock has been adjusted!</p>
                  // `
                  //     });
                    });
        });
    },
    close: function() {
      this.opened = false;
    }
  }
};
</script>

<style>
</style>
