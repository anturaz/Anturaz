export default async({ Vue }) => {
    Vue.prototype.$createSalesRecord = async function(transaction, type) {
        var payment_details = await this.$dbCon.service("shopper-payments").find({
            query: {
                related_id: transaction._id
            }
        })
        var item_details = await this.$dbCon.service(type.toLowerCase() + "s").find({
            query: {
                _id: transaction.item_id
            }
        })
        payment_details = payment_details.data[0]
        item_details = item_details.data[0]
        this.$dbCon.service("report-sales").create({
            store_id: transaction.store_id,
            transaction_date: transaction.logs[0].date,
            SKU: item_details.SKU,
            description: item_details[type.toLowerCase() + "_name"],
            regular_price: payment_details.regular_price,
            sale_price: payment_details.sale_price,
            type: type,
            quantity: transaction.quantity,
            gross_sales: payment_details.total,
            mdr: payment_details.total * (payment_details.payment_utilities.MDR / 100),
            service_fee: (payment_details.total * (payment_details.payment_utilities.transaction_fee / 100)),
            net_sales: (payment_details.total) - (payment_details.total * (payment_details.payment_utilities.MDR / 100)) - (payment_details.payment_utilities.web_service_fee),
            convenience_fee: (type == "Product" ? 0 : payment_details.payment_utilities.web_service_fee),
            revenue: (type == "Product" ? 0 : payment_details.payment_utilities.web_service_fee) + (payment_details.total * (payment_details.payment_utilities.transaction_fee / 100))
        })

    }
}