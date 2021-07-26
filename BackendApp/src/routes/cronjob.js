module.exports = function (app) {
    const appLink = "http://localhost:8081"
    var cron = require('node-cron');
    var axios = require('axios');
    var moment = require('moment')
    cron.schedule('5 0 * * *', () => {
        console.log(new Date())
          recurringPayment()
    });

    async function recurringPayment() {
        // 1. GET ALL RECORDS OF PENDING PAYMENTS
        var pendingPayments = await app.service("shopper-payments").find({
            query: {
                status: "Pending"
            }
        })
        pendingPayments = pendingPayments.data

        // 2. LOOK FOR DUE PENDING PAYMENTS
        pendingPayments.forEach(function (x) {
            x.recurring_payments.forEach(async function (y, index) {
                if (y.status == "Pending" && moment(new Date(y.schedule)).isBefore(new Date())) {
                    console.log(y.schedule, x.registration_id, y.amount, x._id)
                    // 3. CONDUCT REPEATED PAYMENT
                    axios.get(appLink + `/repeatedPayment?amount=${y.amount}&registration_id=${x.registration_id}`).then(async results => {
                     
                        x.recurring_payments[index].status = "Done"
                        x.recurring_payments[index].payment_details = results.data
                        if (x.recurring_payments.length == index + 1) {
                            // 4. IF THIS IS THE LAST TERM OF THE PAYMENT, UPDATE STATUS OF THE PRODUCT TRANSACTION TO FOR REVIEW
                            x.status = "Done"
                            await app.service("product-transactions").get(x.related_id).then(result => {
                                result.status = "For Review"
                                app.service("product-transactions").patch(x.related_id, result)
                            })
                        }
                        await app.service("shopper-payments").patch(x._id, x)
                    })
                }
            })
        })
    }
   
}