export default async({ app, router, Vue }) => {
    // STORE USER LOGIN
    Vue.prototype.$StoreUserLogin = async function(email, password) {
        if (this.$route.fullPath != '/CreateStore') {
            this.$q.loading.show();
        }

        try {
            const response = await this.$dbCon
            .authenticate({
                strategy: "local",
                email: email,
                password: password
            })  
            console.log('response', response)
            let payLoad = await this.$dbCon.passport.verifyJWT(
                response.accessToken || this.$local.getItem("jwt")
            );
            var logged_in_user = await this.$dbCon.services.users.get(
                payLoad.userId
            );
            if (logged_in_user.system_user_type == "Store Owner") {
                this.$root.user = logged_in_user;
                this.$forceUpdate();
                this.$q.loading.hide();
                var store = await this.$dbCon.service("store").find({
                    query: {
                        _id: this.$root.user.store_id
                    }
                });
                console.log('store.data[0]', store.data[0])
                this.$local.set("store_token", store.data[0]._id);
                this.$local.set("user_token", logged_in_user._id);
                this.$root.store = store.data[0];
                if (store.data[0].access == true) {
                    if (store.step != -1) {
                        this.$router.push("/StoreOwner/PublishStore");
                    } else {
                        alert("PUBLISHED NA!");
                    }
                } else {
                    this.$forceUpdate();
                    this.$q.loading.hide();
                    this.$q.dialog({
                        title: "Access Turned Off",
                        message: "Your access to the app is turned off. Kindly contact Anturaz Team for this issue."
                    });
                    this.$dbCon.logout();
                }
            } else {
                this.$dbCon.logout();
                this.$q.loading.hide();
                this.$q.notify({
                    message: "Invalid Login!",
                    position: "top-right",
                    color: "red",
                    timeout: 700,
                    icon: "warning"
                });
            }
        } catch (error) {
            console.log("ERROR", e);
            this.$dbCon.logout();
            this.$q.loading.hide();
            this.$q.notify({
                message: "Error Occurred!",
                position: "top-right",
                color: "red",
                timeout: 700,
                icon: "warning"
            });
        }
    }
}