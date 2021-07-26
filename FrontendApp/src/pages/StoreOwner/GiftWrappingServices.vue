<template>
  <div class="row">
    <q-breadcrumbs class="col-12 text-grey">
      <q-breadcrumbs-el label="Maintenance" icon="widgets" />
      <q-breadcrumbs-el label="Gift Wrapping Services" icon="card_giftcard" />
    </q-breadcrumbs>
    <br />
    <br />
    <div class="col-12">
      <div class="text-h5">Charges</div>
      <br />
      <q-list bordered>
        <q-item clickable v-ripple @click="editCharge('small',data.giftwrapping.charges.small)">
          <q-item-section>Small</q-item-section>
          <q-item-section
            avatar
          >{{data.giftwrapping.charges.small=="" || data.giftwrapping.charges.small=="0"?"Free":$prettyMoney(data.giftwrapping.charges.small)}}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple @click="editCharge('medium',data.giftwrapping.charges.medium)">
          <q-item-section>Medium</q-item-section>
          <q-item-section
            avatar
          >{{data.giftwrapping.charges.medium=="" ||data.giftwrapping.charges.medium=="0"?"Free":$prettyMoney(data.giftwrapping.charges.medium)}}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple @click="editCharge('large',data.giftwrapping.charges.large)">
          <q-item-section>Large</q-item-section>
          <q-item-section
            avatar
          >{{data.giftwrapping.charges.large=="" ||data.giftwrapping.charges.large=="0"?"Free":$prettyMoney(data.giftwrapping.charges.large)}}</q-item-section>
        </q-item>
        <q-separator />
        <q-item
          clickable
          v-ripple
          @click="editCharge('extra_large',data.giftwrapping.charges.extra_large)"
        >
          <q-item-section>Extra Large</q-item-section>
          <q-item-section
            avatar
          >{{data.giftwrapping.charges.extra_large=="" ||data.giftwrapping.charges.extra_large=="0"?"Free":$prettyMoney(data.giftwrapping.charges.extra_large)}}</q-item-section>
        </q-item>
        <q-separator />
      </q-list>
      <br />
      <div class="text-h5">Colors</div>
      <q-list bordered>
        <q-item v-ripple clickable @click="editColor(0)">
          <q-item-section>
            <span
              v-bind:style="{'background-color': data.giftwrapping.colors[0]}"
              style="height: 25px;width: 25px; border-radius: 50%;display: inline-block;"
            />
          </q-item-section>
          <q-item-section>{{data.giftwrapping.colors[0]}}</q-item-section>
          <q-item-section avatar>
            <q-btn icon="colorize" flat />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item v-ripple clickable @click="editColor(1)">
          <q-item-section>
            <span
              v-bind:style="{'background-color': data.giftwrapping.colors[1]}"
              style="height: 25px;width: 25px; border-radius: 50%;display: inline-block;"
            />
          </q-item-section>
          <q-item-section>{{data.giftwrapping.colors[1]}}</q-item-section>
          <q-item-section avatar>
            <q-btn icon="colorize" flat />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item v-ripple clickable @click="editColor(2)">
          <q-item-section>
            <span
              v-bind:style="{'background-color': data.giftwrapping.colors[2]}"
              style="height: 25px;width: 25px; border-radius: 50%;display: inline-block;"
            />
          </q-item-section>
          <q-item-section>{{data.giftwrapping.colors[2]}}</q-item-section>
          <q-item-section avatar>
            <q-btn icon="colorize" flat />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item v-ripple clickable @click="editColor(3)">
          <q-item-section>
            <span
              v-bind:style="{'background-color': data.giftwrapping.colors[3]}"
              style="height: 25px;width: 25px; border-radius: 50%;display: inline-block;"
            />
          </q-item-section>
          <q-item-section>{{data.giftwrapping.colors[3]}}</q-item-section>
          <q-item-section avatar>
            <q-btn icon="colorize" flat />
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </div>
    <q-dialog v-model="color_picker">
      <q-card>
        <q-card-section>
          <q-color v-model="current_val" inline no-header default-view="palette" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      color_picker: false,
      current_val: "",
      current_color: 0,
    };
  },
  methods: {
    editCharge: function (key, currentVal) {
      this.$q
        .dialog({
          title: "Edit Gift Wrapping Charge",
          prompt: {
            model: currentVal,
            type: "text", // optional
          },
          cancel: true,
        })
        .onOk((data) => {
          this.$q
            .dialog({
              title: "Do you want to continue?",
              message: "Charges apply to all products.",
              cancel: true,
            })
            .onOk(() => {
              this.data.giftwrapping.charges[key] = data.trim();
              this.$dbCon
                .service("store")
                .update(this.data._id, this.data)
                .then(() => {
                  this.$q.notify({
                    message: "Successfully Updated!",
                    position: "top-right",
                    color: "primary",
                    timeout: 700,
                    icon: "check",
                  });
                });
            });
        });
    },
    editColor: function (x) {
      this.color_picker = true;
      this.current_color = x;
    },
  },
  mounted() {
    this.$dbCon
      .service("store")
      .find({
        query: {
          _id: this.$local.getItem("store_token"),
        },
      })
      .then((result) => {
        this.data = result.data[0];
      });
  },
  watch: {
    current_val: function () {
      this.data.giftwrapping.colors[this.current_color] = this.current_val;
      this.$dbCon
        .service("store")
        .update(this.data._id, this.data)
        .then(() => {
          this.color_picker = false;
        })
        .then(() => {
          this.$q.notify({
            message: "Successfully Updated!",
            position: "top-right",
            color: "primary",
            timeout: 700,
            icon: "check",
          });
        });
    },
  },
};
</script>

<style>
</style>
