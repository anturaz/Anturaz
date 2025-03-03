<template>
  <div class="row justify-center items-center q-mb-xl">
    <div class="column" style="max-width: 900px; overflow: auto;">
      <div flat>
        <div class="q-pt-xl q-pl-md  q-pb-md">
          <div class="text-h5">Frequently Asked Questions</div>
        </div>

        <div class="q-pt-none q-pl-md q-pr-md">
          <q-tabs
            v-model="activeTab"
            class="bg-grey-3 text-primary"
            align="justify"
            :style="{ 'max-width': $q.screen.lt.md ? '100%' : '50%' }"
          >
            <q-tab
              name="vendor"
              label="I am a Vendor"
              :class="{ 'bg-primary text-white': activeTab === 'vendor' }"
            />
            <q-tab
              name="shopper"
              label="I am a Shopper"
              :class="{ 'bg-primary text-white': activeTab === 'shopper' }"
            />
          </q-tabs>

          <q-tab-panels v-model="activeTab" animated class="q-pa-none">
            <!-- Vendor Tab Content -->
            <q-tab-panel name="vendor" class="q-pa-none">
              <h5 class="text-primary q-mb-none">
                How to set up a store on Anturaz?
              </h5>
              <p>
                Any established business, whether registered with the DTI or
                SEC, can sign up as a vendor, provided you have a valid
                certificate of registration. Freelancers can also sign up, but
                subject to approval. Simply click the CREATE STORE button or
                link and follow the steps to complete.
              </p>

              <h5 class="text-primary q-pa-none q-mb-none">
                How to add a product to my store?
              </h5>
              <p class="q-pt-none ">
                Follow the steps below to add a product to your store.
              </p>
              <ol>
                <li>
                  Log in with your vendor account to go to the vendor dashboard.
                </li>
                <li>
                  At the dashboard, select the Inventory tab and click the Add
                  an item icon.
                </li>
                <li>
                  Choose the category or click Add category if it's not yet
                  available in your list.
                </li>
                <li>
                  Enter the SKU. Make sure that this is unique as your
                  reference.
                </li>
                <li>
                  Enter the product name. Bundle your item if it’s giveaways or
                  invitations and avoid posting products with a price less than
                  ₱150.00. Gifts are the ideal products to sell at Anturaz since
                  the platform is an event marketplace.
                </li>
                <li>
                  Enter the product description. Make sure that the description
                  is clear, complete, and truthful to avoid complaints or
                  negative feedback from the customer.
                </li>
                <li>
                  Enter the regular price of the service and the sale price if
                  applicable; otherwise, leave the sale price blank.
                </li>
                <li>
                  Enter the inventory. Make sure that you allocate the quantity
                  to Anturaz to avoid non-delivery of the product and complaints
                  from the customer.
                </li>
                <li>Enter the variations that the customer can choose from.</li>
                <li>Add photos of the product.</li>
                <li>
                  Under product settings, enable or disable Cash on Delivery,
                  Giftwrapping Services, Pick Up In Store, and Delivery
                  Services. If you enabled Giftwrapping Services, make sure that
                  the Gift Wrapping color is set under the Settings tab, Gift
                  Wrapping. If Delivery Services were enabled, make sure that
                  the delivery charges are set under the Settings tab, Delivery.
                </li>
                <li>Post your product.</li>
              </ol>

              <h5 class="text-primary q-pa-none q-mb-none">
                How to add a service to my store?
              </h5>
              <p class="q-pt-none ">
                Follow the steps below to add a service to your store.
              </p>
              <ol>
                <li>
                  Log in with your vendor account to go to the vendor dashboard.
                </li>
                <li>
                  At the dashboard, select the Inventory tab and click Add an
                  item icon.
                </li>
                <li>
                  Choose the category or click add category if not yet available
                  in your list.
                </li>
                <li>
                  Enter the SKU. Make sure that this is unique as your
                  reference.
                </li>
                <li>
                  Enter service name.
                </li>
                <li>
                  Enter service description. Make sure that the description is
                  clear, complete, and truthful to avoid complaints or negative
                  feedback from the customer.
                </li>
                <li>
                  Enter the regular price of the service and sale price if
                  applicable, other wise leave the sale price blank.
                </li>
                <li>
                  Add photos of the service.
                </li>
                <li>
                  Under product settings, enable or disable Cash on Fulfillment,
                  In-Store Service and Service at Preferred Location.
                </li>
                <li>
                  Post your service.
                </li>
              </ol>

              <h5 class="text-primary q-pa-none q-mb-none">
                How to manage my items?
              </h5>
              <p class="q-pt-none ">
                You can easily manage your items by going to the vendor
                dashboard under the Inventory tab. Simply click the Manage icon
                on the upper right side of the item, which will allow you to
                perform the following:
              </p>
              <ul>
                <li>
                  Edit or delete the item
                </li>
                <li>
                  Edit the inventory
                </li>
              </ul>

              <h5 class="text-primary q-pa-none q-mb-none">
                How to apply transportation or fuel fee to my services?
              </h5>
              <p class="q-pt-none ">
                You can set transportation or fuel fee by using the Vendor
                Dashboard Settings. Go to Settings tab, click on the FUEL AND
                TRANSPO icon and set the amount for each municipality. Once
                configured, the fee will automatically be added in the total
                amount during the checkout process.
              </p>

              <h5 class="text-primary q-pa-none q-mb-none">
                How to apply delivery fee to my products?
              </h5>
              <p class="q-pt-none ">
                To set a delivery fee, navigate to the Vendor Dashboard
                Settings. Access the Settings tab, click on the DELIVERY icon,
                and specify the fee for each municipality. Once you have
                configured this, the fee will automatically be included in the
                total amount during the checkout process.
              </p>

              <h5 class="text-primary q-pa-none q-mb-none">
                How to manage my booking calendar?
              </h5>
              <p class="q-pt-none ">
                Managing your booking calendar effectively is essential to avoid
                overbooking. To set your availability, navigate to the settings
                in the Vendor Dashboard. Open your vendor dashboard, click on
                the Settings tab, and choose BOOKING CALENDAR. Select the dates
                you wish to mark as NOT AVAILABLE to ensure that clients cannot
                book on those days.
              </p>

              <h5 class="text-primary q-pa-none q-mb-none">
                How will I know if someone purchased my item?
              </h5>
              <p class="q-pt-none ">
                You will receive a notification at the registered email address
                registered with your store. Additionally, you can access the
                vendor dashboard and click on the Sales tab. Within the Sales
                tab, you will find Products and Services along with their
                respective purchase statuses. Just click the view icon to access
                the Order Tracking System and manage the item until it's
                delivered.
              </p>

              <h5 class="text-primary q-pa-none q-mb-none">
                How to deliver the purchased product to the customer?
              </h5>
              <p class="q-pt-none ">
                Follow the steps below on how to deliver the purchased product.
              </p>

              <ol>
                <li>
                  Log in to your vendor account to open the Order Tracker in
                  your dashboard.
                </li>
                <li>
                  In your dashboard, go to the Sales tab, and under Products,
                  click the view icon for For Acknowledgement.
                </li>
                <li>
                  Click on the ACKNOWLEDGE button; once acknowledged, the item
                  will go to the For Packaging tab.
                </li>
                <li>
                  Click on the PACKAGE button under For Packaging tab and pack
                  the product.
                </li>

                <li>
                  Go to your preferred courier, e.g., LBC Express, DHL Express,
                  and ship to the customer. The shipping address can be found in
                  the Order Tracker.
                </li>
                <li>
                  Go to the Order Tracker, select the For Shipping tab, and
                  click the SHIP OUT button. Enter the necessary information
                  needed and click SUBMIT. Once the shipping details are
                  submitted, the system will notify the customer that the item
                  has been shipped out.
                </li>
                <li>
                  You may call the customer and remind him/her to open the
                  Customer Order Tracker and receive the product by clicking the
                  RECEIVE button.
                </li>
              </ol>

              <h5 class="text-primary q-pa-none q-mb-none">
                How to process a product that is for pick-up in the store?
              </h5>
              <p class="q-pt-none ">
                Follow the steps below to process the For Pick Up products.
              </p>
              <ol>
                <li>
                  Log in to your vendor account to open the Order Tracker in
                  your dashboard.
                </li>
                <li>
                  In your dashboard, go to the Sales tab, and under Products,
                  click the view icon for For Acknowledgement.
                </li>
                <li>
                  Click on the ACKNOWLEDGE button; once acknowledged, the item
                  will go to the For Packaging tab.
                </li>
                <li>
                  Click on the PACKAGE button under the For Packaging tab and
                  pack the product.
                </li>

                <li>
                  Call the customer to inform him/her that the item is ready for
                  pick-up.
                </li>
                <li>
                  Once picked up by the customer, go to the For Pick Up tab and
                  click PICK UP button to complete the transaction.
                </li>
              </ol>

              <h5 class="text-primary q-pa-none q-mb-none">
                How to fulfill a service purchased by the customer?
              </h5>
              <p class="q-pt-none ">
                Follow the steps below to process the service purchased by the
                customer.
              </p>
              <ol>
                <li>
                  Log in to your vendor account to open the Order Tracker in
                  your dashboard.
                </li>
                <li>
                  In your dashboard, go to the Sales tab, and under Services,
                  click the view icon for For Acknowledgement.
                </li>
                <li>
                  Click on the ACKNOWLEDGE button; once acknowledged, the item
                  will go to the On Going tab.
                </li>
                <li>
                  Call the customer to coordinate the requirements of the
                  service. Note that the customer may select to avail the
                  service at your store or to a designated address.
                </li>

                <li>
                  Once the service was rendered, ask the customer to receive it
                  by going to the Customer Reservation Tracker and click the
                  RECEIVED button under Service Confirmation tab.
                </li>
              </ol>

              <h5 class="text-primary  q-pa-none q-mb-none">
                How to install Anturaz mobile app on your phone?
              </h5>

              <ol>
                <li>
                  Open <a href="https://anturaz.io/#/">www.anturaz.io</a> on
                  your mobile phone using google chrome browser.
                </li>
                <li>
                  Click on INSTALL APP button.
                </li>
                <li>
                  Click on Install and wait for the installation to complete.
                </li>
              </ol>

              <p class="">
                For additional information about vendor transactions at Anturaz,
                please visit our Terms of Use, Privacy Policy, Return Policy,
                and Commission & Fees. You can reach us via email at
                <a href="mailto:helpdesk@anturaz.io">helpdesk@anturaz.io</a> or
                contact us at +63 962 1260781 for any other inquiries.
              </p>
            </q-tab-panel>

            <!-- Shopper Tab Content -->
            <q-tab-panel name="shopper">
              <h5 class="text-primary q-pa-none q-mb-none">
                How to buy a product at Anturaz?
              </h5>
              <p class="q-pt-none ">
                Follow the steps below to buy a product via the Anturaz
                platform.
              </p>
              <ol>
                <li>
                  Log in with your shopper account; otherwise, register if you
                  haven't yet.
                </li>
                <li>
                  Search for the product you are looking for or browse the store
                  by going to the SHOPS.
                </li>
                <li>
                  Select the product that you want to purchase.
                </li>
                <li>
                  You may avail yourself of the optional Giftwrapping Services
                  and select the color of the wrapper.
                </li>
                <li>
                  Input the Date Needed to inform the store when you want the
                  product delivered to you.
                </li>
                <li>
                  Go to Check Out and complete the payment.
                </li>
                <li>
                  Once payment is completed, you will be directed to the Order
                  Tracking System, or you can go to your profile and click MY
                  ORDERS to open the tracker.
                </li>
                <li>
                  You will also receive the Transaction Confirmation of your
                  purchase via the registered email with the contact details of
                  the store.
                </li>
                <li>
                  Contact the store if necessary regarding your purchase.
                  However, we strongly discourage any transactions outside the
                  Anturaz platform to enjoy our robust protection features and
                  avoid scams.
                </li>
                <li>
                  Please rate your experience with the store through the ORDER
                  TRACKING SYSTEM for other shoppers’ information.
                </li>
              </ol>

              <h5 class="text-primary  q-pa-none q-mb-none">
                How to buy a service at Anturaz?
              </h5>
              <p class="q-pt-none ">
                Follow the steps below to buy a service via the Anturaz
                platform.
              </p>
              <ol>
                <li>
                  Log in with your shopper account; otherwise, register if you
                  haven't yet.
                </li>
                <li>
                  Search for the service you are looking for or browse the store
                  by going to the SHOPS.
                </li>
                <li>
                  Select the service that you want to purchase.
                </li>
                <li>
                  Input the Date and Time of Fulfillment when you want the
                  service rendered to you.
                </li>
                <li>
                  Go to Check Out and complete the payment.
                </li>
                <li>
                  Once payment is completed, you will be directed to the Order
                  Tracking System, or you can go to your profile and click MY
                  RESERVATIONS to open the tracker.
                </li>
                <li>
                  You will also receive the Transaction Confirmation of your
                  purchase via the registered email with the contact details of
                  the store.
                </li>
                <li>
                  Contact the store if necessary regarding your purchase.
                  However, we strongly discourage any transactions outside the
                  Anturaz platform to enjoy our robust protection features and
                  avoid scams.
                </li>
                <li>
                  Please rate your experience with the store through the ORDER
                  TRACKING SYSTEM for other shoppers’ information.
                </li>
              </ol>

              <h5 class="text-primary  q-pa-none q-mb-none">
                How to create a Gift Registry at Anturaz?
              </h5>
              <p class="q-pt-none ">
                Anturaz also offers an online gift registry system where
                celebrants can create a list of desired gifts for special
                occasions. This system helps guests choose gifts that the
                celebrant truly wants and avoids duplicates. Follow the steps
                below to create a Gift Registry via the Anturaz platform.
              </p>
              <ol>
                <li>
                  Log in with your shopper account; otherwise, register if you
                  haven't yet.
                </li>
                <li>
                  Click on Gift Registry and select CREATE GIFT REGISTRY.
                </li>
                <li>
                  Input the necessary details.
                </li>
                <li>
                  Add your desired gifts.
                </li>
                <li>
                  Click the GUEST LIST button and input the details of all the
                  guests the you want to invite in your Gift Registry.
                </li>
                <li>
                  Notify your guests by clicking the NOTIFY button. Your guest
                  will receive an email invitation to participate in your Gift
                  Registry.
                </li>
              </ol>

              <h5 class="text-primary  q-pa-none q-mb-none">
                How to buy a gift from the Gift Registry?
              </h5>
              <p class="q-pt-none ">
                Follow the steps below to buy a gift from the Gift Registry via
                the Anturaz platform.
              </p>
              <ol>
                <li>
                  Open the email for the invitation to participate.
                </li>
                <li>
                  Click on the link provided in the email. Alternatively, you
                  may copy the Gift Registry Reference Number, click on Gift
                  Registry, and search for the Gift Registry using the reference
                  number.
                </li>
                <li>
                  Log in with your shopper account; otherwise, register if you
                  haven't yet.
                </li>
                <li>
                  Select a gift to purchase from the wish list and proceed to
                  check out. Please refer to "How to Buy a Product" to learn
                  more about the process.
                </li>
              </ol>

              <h5 class="text-primary  q-pa-none q-mb-none">
                How to install Anturaz mobile app on your phone?
              </h5>

              <ol>
                <li>
                  Open <a href="https://anturaz.io/#/">www.anturaz.io</a> on
                  your mobile phone using google chrome browser.
                </li>
                <li>
                  Click on INSTALL APP button.
                </li>
                <li>
                  Click on Install and wait for the installation to complete.
                </li>
              </ol>

              <p class="">
                For additional information about shopper transactions at
                Anturaz, please visit our Terms of Use, Privacy Policy and
                Return Policy. You can reach us via email at
                <a href="mailto:helpdesk@anturaz.io">helpdesk@anturaz.io</a> or
                contact us at +63 962 1260781 for any other inquiries.
              </p>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "vendor" // Default active tab
    };
  }
};
</script>

<style scoped>
p {
  text-align: text-justify;
}

h5 {
  margin-bottom: 8px;
}
</style>
