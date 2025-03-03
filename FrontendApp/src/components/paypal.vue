<template>
  <div>
    {{ $parent.current }}
    <div ref="paypal"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object },
    onlinePaymentResult: { type: Function }
  },
  data: function() {
    return {
      loaded: false,
      paidFor: false
    };
  },
  mounted: function() {
    if (!process.env.CLIENT) return;
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AbMl1FMdNBwQNcfJueIR0ZgMt0FhbrgJZsINCGcD-KuMGOBcajJxciK6NwbOk9UFe-5LZZJuWzqgCkGO";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      if (!process.env.CLIENT) return;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.item.description,
                  amount: {
                    currency_code: "USD",
                    value: this.item.price
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();

            this.onlinePaymentResult("success", order);
          },
          onError: err => {
            this.onlinePaymentResult("error", err);
          }
        })
        .render(this.$refs.paypal);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
