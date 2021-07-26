<template>
  <div>
    <q-btn label="PAY NOW" color="primary" @click="toPay=true" />
    <q-dialog v-model="toPay" persistent>
      <q-card style="width:600px">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">Payment Information</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <form
            :action="currentLink"
            class="paymentWidgets"
            data-brands="VISA MASTER AMEX"
            ref="paymentWidget"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="cancel" @click="toPay=false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object },
    onlinePaymentResult: { type: Function }
  },
  data() {
    return {
      currentLink: window.location.href,
      toPay: false
    };
  },
  methods: {
    setLoaded: function() {
      this.$q.loading.hide();
    },
    openAltPayNet: function() {
      this.toPay = true;
    }
  },
  watch: {
    "$route.query": async function() {
      if ("id" in this.$route.query && "resourcePath" in this.$route.query) {
        this.$q.loading.show();
        const id = this.$route.query.id;
        const resourcePath = this.$route.query.resourcePath;

        this.toPay = false;
        this.$router.push(this.$route.path);

        await this.$axios
          .get(
            this.$appLink +
              "/paymentResult?id=" +
              id +
              "&resourcePath=" +
              resourcePath
          )
          .then(results => {
            var checkIfSuccess = /^(000\.000\.|000\.100\.1|000\.[36])/;
            var result = results.data.result.code.match(checkIfSuccess);
            try {
              if (result.length != 0) {
                //SUCCESS
                this.onlinePaymentResult("success", results.data);
                this.$q.loading.hide();
              } else {
                //ERROR
                this.onlinePaymentResult("error", results.data);
                this.$q.loading.hide();
              }
            } catch (e) {
              this.onlinePaymentResult("error", results.data);
              this.$q.loading.hide();
            }
          });
      }
    },
    toPay: function() {
      if (this.toPay == true) {
        this.$q.loading.show();
        const script = document.createElement("script");
        this.$axios
          .get(this.$appLink + "/createCheckOut?amount=" + this.item.price)
          .then(async res => {
            script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${res.data.id}`;
            script.addEventListener("load", this.setLoaded);
            document.body.appendChild(script);
          });
      }
    }
  }
};
</script>

<style>
</style>