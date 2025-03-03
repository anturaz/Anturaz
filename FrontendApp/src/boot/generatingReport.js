export default async ({ Vue }) => {
  Vue.prototype.$createSalesRecord = async function(transaction, type) {
    // var payment_details = await this.$dbCon.service("shopper-payments").find({
    //   query: {
    //     related_id: transaction._id
    //   }
    // });
    // var item_details = await this.$dbCon
    //   .service(type.toLowerCase() + "s")
    //   .find({
    //     query: {
    //       _id: transaction.item_id
    //     }
    //   });

    // payment_details = payment_details.data[0];
    // item_details = item_details.data[0];
    // // elli computation
    // const computedServiceFee = parseFloat(payment_details.total * 0.07).toFixed(
    //   2
    // );
    // const computedConvienceFee =
    //   type == "Product" ? 0 : payment_details.payment_utilities.web_service_fee;
    // const computedWithHoldiing = 0;
    // console.log("service fee", +computedServiceFee);

    // const netSale = parseFloat(
    //   payment_details.total -
    //     +computedServiceFee -
    //     computedConvienceFee -
    //     computedWithHoldiing
    // ).toFixed(2);
    // console.log("net sale", netSale);
    // this.$dbCon.service("report-sales").create({
    //   store_id: transaction.store_id,
    //   store_name: transaction.store_data.name,
    //   transaction_date: transaction.logs[0].date,
    //   SKU: item_details.SKU,
    //   description: item_details[type.toLowerCase() + "_name"],
    //   regular_price: payment_details.regular_price,
    //   sale_price: payment_details.sale_price,
    //   type: type,
    //   quantity: transaction.quantity,
    //   gross_sales: payment_details.total,
    //   mdr:
    //     payment_details.total * (payment_details.payment_utilities.MDR / 100),
    //   with_holding_tax: +computedWithHoldiing,
    //   net_sale: +netSale,
    //   service_fee: +computedServiceFee,
    //   // payment_details.total *
    //   // (payment_details.payment_utilities.transaction_fee / 100) old for service fee,
    //   net_sales:
    //     payment_details.total -
    //     payment_details.total * (payment_details.payment_utilities.MDR / 100) -
    //     payment_details.payment_utilities.web_service_fee,
    //   convenience_fee:
    //     type == "Product"
    //       ? 0
    //       : payment_details.payment_utilities.web_service_fee
    //   // revenue: (type == "Product" ? 0 : payment_details.payment_utilities.web_service_fee) + (payment_details.total * (payment_details.payment_utilities.transaction_fee / 100))
    // });
    // const data = {
    //   transaction_date: transaction.payment_date,
    //   recieved_date: transaction.recieved_date,
    //   store_name: transaction.store_data.name,
    //   store_id: transaction.store_id,
    //   sku: transaction.product_data.sku,
    //   description: transaction.product_data.name,
    //   regular_price: transaction.regular_price,
    //   sale_price: transaction.sale_price,
    //   type: type,
    //   quantity: transaction.quantity,
    //   gross_sales: transaction.total,
    //   with_holding_tax: 0, // If there's an actual withholding tax, replace 0 with the correct calculation
    //   sales_commission:
    //     (transaction.total *
    //       parseFloat(transaction.payment_utilities.sales_commission)) /
    //     100,
    //   net_sales:
    //     transaction.total -
    //     (transaction.total *
    //       parseFloat(transaction.payment_utilities.sales_commission)) /
    //       100
    // };
    // console.log(data);

    //    "service_data": {
    //   "name": "Event 101",
    //   "sku": "000022"
    // },
    const product_detail = {
      sku:
        type === "Product"
          ? transaction.product_data.sku
          : transaction.service_data.sku,
      name:
        type === "Product"
          ? transaction.product_data.name
          : transaction.service_data.name
    };
    console.log(transaction);
    const res = await this.$dbCon.service("report-sales").create({
      transaction_date: transaction.payment_date || new Date().toISOString(),
      recieved_date: transaction.recieved_date,
      store_name: transaction.store_data.name,
      store_id: transaction.store_id,
      sku: product_detail.sku,
      description: product_detail.name,
      regular_price: transaction.regular_price,
      sale_price: transaction.sale_price,
      type: type,
      quantity: transaction.quantity,
      gross_sales: transaction.total,
      with_holding_tax: 0, // If there's an actual withholding tax, replace 0 with the correct calculation
      sales_commission:
        (transaction.total *
          parseFloat(transaction.payment_utilities.sales_commission)) /
        100,
      net_sales:
        transaction.total -
        (transaction.total *
          parseFloat(transaction.payment_utilities.sales_commission)) /
          100
    });

    console.log(res);
  };
};
