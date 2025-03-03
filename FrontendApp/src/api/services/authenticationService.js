import { http, httpFile, dbCon } from "../httpServices";
import { appLink } from "../../boot/dbCon";

const connection = dbCon();

const userService = connection.service("users");

export const emailSender = async (data, message, subject) => {
  try {
    const response = await http().post(`${appLink}/customizableEmail`, {
      receiver: data.email,
      subject: subject,
      message: message
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error while sending email:", error);
  }
};

export const patchUser = async data => {
  try {
    const response = await userService.patch(data._id, data);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error while finding user:", error);
  }
};

const password_generator = () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const formatDate = dateStr => {
  const [year, month, day] = dateStr.split("/");
  const date = new Date(year, month - 1, day); // Month is 0-based in JS

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const formatTime = timeStr => {
  let [hours, minutes] = timeStr.split(":").map(Number);
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const forgotPasswordEmailBody = data => {
  const generatedPassword = password_generator();
  data.system_generated_password = generatedPassword;

  const updateUser = patchUser(data);
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `<div class="content">
            <p>Dear Mr./Ms. &lt;
               ${data.lname} 
            &gt;,</p>
            <p>We have received your reset password request. Please click the reset button below to continue.</p>

            <p><strong>Use the credentials below to fill up the account verification form:</strong></p>
            <p>Email Address: ${data.email}<br>
                System Generated Password: ${generatedPassword} <br>
              

            <!-- Button -->
            <div class="button-container">
                <a  href="${link}/#/ChangePassword?email=${
    data.email
  }" class="button" style="color:#000;">RESET</a>
            </div>

          

            <p>Celebrate Life!</p>

                <p style="padding-top:10px;"><strong>ANTURAZ</strong><br>
                OneStras Technologies Corp.<br>
                Unit 102, SMJ Residences Mawaque Rd,<br>
                Mabiga, Mabalacat City
            </p>
        </div>`;
};

export const findUser = async email => {
  try {
    await connection.authenticate();
    const response = await userService.find({
      query: {
        email: email
      }
    });
    if (response.total === 0) {
      return { message: "User not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error while finding user:", error);
  }
};

export const shopperSignUp = lname => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `  <div class="content">
            <p style=" padding-bottom: 10px;">Dear Mr./Ms. ${lname},</p>

            <p style=" padding-bottom: 15px;"><strong style="color: black;">
                    Congratulations! You have successfully created your shopper’s profile!</strong></p>


            <p>Our team will continue to assess your profile to see if it complies with our terms of use.
                If no issues are identified, you can continue enjoying our platform.
            </p>

            <p>Helpful References:</p>

            <p>
              <a href="${link}/#/TermsOfUse">Terms of Use</a>
              <br>
              <a href="${link}/#/PrivacyPolicy">Privacy Policy</a>
              <br>
              <a href="${link}/#/ReturnPolicy">Return Policy</a>
              <br>
              <a href="${link}/#/FAQ">FAQ</a>
              <br>
            </p>

            <!-- Button -->
            <div class="button-container">
                <a href="${link}" class="button" style="color:#000;">SHOP NOW</a>
            </div>


            <p>Celebrate Life!</p>

               <p style="padding-top:10px;"><strong>ANTURAZ</strong><br>
                OneStras Technologies Corp.<br>
                Unit 102, SMJ Residences Mawaque Rd,<br>
                Mabiga, Mabalacat City
            </p>
        </div>`;
};

export const passwordResetEmail = data => {
  console.log(data.system_user_type);
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `  <div class="content">
            <p style=" padding-bottom: 10px;">Dear Mr./Ms. &lt; ${
              data.lname
            } &gt;,</p>

            <p>You have successfully reset your password. </p>

            <!-- Button -->
            <div class="button-container">
                <a href="${link}/#/${
    data.system_user_type == "Shopper" ? "ShopperLogin" : "StoreOwner/Login"
  }" class="button" style="color:#000;">LOG-IN</a>
            </div>

            <p>Celebrate Life!</p>

               <p style="padding-top:10px;"><strong>ANTURAZ</strong><br>
                OneStras Technologies Corp.<br>
                Unit 102, SMJ Residences Mawaque Rd,<br>
                Mabiga, Mabalacat City
            </p>
        </div>`;
};

export const storeOwnerSignupEmail = data => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `<div class="content">
            <p>Dear Mr./Ms. ${data.lname},</p>

            <p style=" padding-bottom: 15px;"><strong style="color: black;">
                    Congratulations! You have successfully published your store!</strong></p>

            <p>Below are the details of your store:</p>
            <p>Store Name: ${data.store_name}<br>
                Business address: ${data.bussiness_address}<br>
                Contact No: 0${data.mobile_num}<br>
                Email Address: ${data.email}<br>
            </p>

            <p>Our team will continue to assess your profile to see if it complies with our terms of use.
                If no issues are identified, you can continue enjoying our platform.
            </p>

            <p>Helpful References:</p>

            <p>
                <span>Terms of Use</span>
                <br>
                <span>Privacy Policy</span>
                <br>
                <span>Return Policy</span>
                <br>
                <span>FAQ</span>
                <br>
            </p>

            <!-- Button -->
            <div class="button-container">
                <a href="${link}/#/StoreOwner" class="button" style="color:#000;">VENDOR DASHBOARD</a>
            </div>


            <p>Celebrate Life!</p>

            <p style="padding-top:10px;"><strong>ANTURAZ</strong><br>
                OneStras Technologies Corp.<br>
                Unit 102, SMJ Residences Mawaque Rd,<br>
                Mabiga, Mabalacat City
            </p>
        </div>`;
};

export const productPurchaseEmail = order => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `
  <div class="content">
      <p>Dear Mr./Ms. ${order.checkout_data.data.customer.last_name},</p>

      <p style="padding-bottom: 15px;">
          Thank you for purchasing via our platform! Below are the details of the transaction.
      </p>

      <p style="padding-bottom: 15px;">
          Order No: ${order.order_number || "N/A"}<br>
          Product Name: ${order.product_data.name} <br>
          SKU No: ${order.product_data.sku} <br>
          Ordered Quantity: ${order.quantity} <br>
          Amount: ${order.checkout_data.data.payment.amount}<br>
          Payment Method: ${order.payment_option}<br>
          Delivery Method: ${order.mode_of_delivery}<br>
          Contact Person: ${order.primary_person_name}<br>
          Contact No: ${order.primary_contact_number}<br>
          Date Needed: ${formatDate(order.date_needed)}<br>
          Delivery/Pickup Address: ${
            order.checkout_data.data.customer.shipping_address.line1
          }, 
          ${order.checkout_data.data.customer.shipping_address.line2}, 
          ${
            order.checkout_data.data.customer.shipping_address.city_municipality
          }, 
          ${order.checkout_data.data.customer.shipping_address.zip}, 
          ${
            order.checkout_data.data.customer.shipping_address
              .state_province_region
          }, 
          ${order.checkout_data.data.customer.shipping_address.country_code}<br>

          Store Name: ${order.store_data.name}<br>
          Store Contact No: 0${order.store_data.mobile_num}<br>
          Store Email Address: ${order.store_data.email}<br>

      </p>

      <p style="padding-bottom: 15px;">IMPORTANT NOTICE:</p>

      <p>Please confirm receipt of the product within 48 hours after arrival,
          otherwise, our system will automatically acknowledge it as received,
          48 hours from the date needed.
      </p>

      <!-- Button -->
      <div class="button-container">
          <a href="${link}/#/Orders" class="button" style="color:#000;">OPEN ORDER TRACKER</a>
      </div>

      <p style="padding-bottom: 15px;">
          This transaction is between you and the store, with Anturaz serving solely as the platform.
          Rest assured, your payment made online is secure with us and will only be credited to the store 
          once the product has been confirmed as received by you or by our system's auto-receive feature.
          <br><br>
          For any concern or clarification about this transaction, please contact the store or escalate to us if
          not settled between you and the store.
      </p>

      <p>Celebrate Life!</p>

       <div stype="padding-top:15px;">
          <p>
            <strong>ANTURAZ</strong><br>
            OneStras Technologies Corp.<br>
            Unit 102, SMJ Residences Mawaque Rd,<br>
            Mabiga, Mabalacat City
          </p>
        </div>
  </div>
  `;
};

export const productPurchaseEmailToVendor = order => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `
  <div class="content">

      <p style="padding-bottom: 15px;">
          Congratulations ${
            order.store_data.name
          }! You have a new product purchase! Below are the details of the transaction.
      </p>

      <p style="padding-bottom: 15px;">
          Order No: ${order.order_number || "N/A"}<br>
          Product Name: ${order.product_data.name} <br>
          SKU No: ${order.product_data.sku} <br>
          Ordered Quantity: ${order.quantity} <br>
          Amount: ${order.checkout_data.data.payment.amount}<br>
          Payment Method: ${order.payment_option}<br>
          Delivery Method: ${order.mode_of_delivery}<br>
          Contact Person: ${order.primary_person_name}<br>
          Contact No: ${order.primary_contact_number}<br>
          Date Needed: ${formatDate(order.date_needed)}<br>
          Delivery/Pickup Address: ${
            order.checkout_data.data.customer.shipping_address.line1
          }, 
          ${order.checkout_data.data.customer.shipping_address.line2}, 
          ${
            order.checkout_data.data.customer.shipping_address.city_municipality
          }, 
          ${order.checkout_data.data.customer.shipping_address.zip}, 
          ${
            order.checkout_data.data.customer.shipping_address
              .state_province_region
          }, 
          ${order.checkout_data.data.customer.shipping_address.country_code}<br>

      
      </p>

      <p style="padding-bottom: 15px;">IMPORTANT NOTICE:</p>

      <p style="padding-bottom: 15px;">
        This transaction is between you and the shopper, with Anturaz serving solely as the platform. Payment will be credited to you based on our terms of use.
      </p>
      
      <p style="padding-bottom: 15px;">
        Please complete the delivery of this transaction on or before the date needed to avoid suspension of your account and/or bad reviews.
      </p>
      

      <!-- Button -->
      <div class="button-container">
          <a href="${link}/#/StoreOwner" class="button" style="color:#000;">VIEW ON DASHBOARD</a>
      </div>


      <p>Celebrate Life!</p>

       <div stype="padding-top:15px;">
          <p>
            <strong>ANTURAZ</strong><br>
            OneStras Technologies Corp.<br>
            Unit 102, SMJ Residences Mawaque Rd,<br>
            Mabiga, Mabalacat City
          </p>
        </div>
  </div>
  `;
};

export const producTShipOutEmail = (order, delivery) => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `
  <div class="content">
      <p>Dear Mr./Ms. ${order.checkout_data.data.customer.last_name},</p>

      <p style="padding-bottom: 15px;">
          Your product purchase with the following details has been shipped out.
      </p>

      <p style="padding-bottom: 15px;">
          Order No: ${order.order_number || "N/A"}<br>
          Product Name: ${order.product_data.name} <br>
          SKU No: ${order.product_data.sku} <br>
          Ordered Quantity: ${order.quantity} <br>
          Amount: ${order.checkout_data.data.payment.amount}<br>
          Payment Method: ${order.payment_option}<br>
          Delivery Method: ${order.mode_of_delivery}<br>
          Contact Person: ${order.primary_person_name}<br>
          Contact No: ${order.primary_contact_number}<br>
          Date Needed: ${formatDate(order.date_needed)}<br>
          Delivery/Pickup Address: ${
            order.checkout_data.data.customer.shipping_address.line1
          }, 
          ${order.checkout_data.data.customer.shipping_address.line2}, 
          ${
            order.checkout_data.data.customer.shipping_address.city_municipality
          }, 
          ${order.checkout_data.data.customer.shipping_address.zip}, 
          ${
            order.checkout_data.data.customer.shipping_address
              .state_province_region
          }, 
          ${order.checkout_data.data.customer.shipping_address.country_code}<br>

          Store Name: ${order.store_data.name}<br>
          Store Contact No: 0${order.store_data.mobile_num}<br>
          Store Email Address: ${order.store_data.email}<br>
      </p>
  
      <p style="padding-bottom: 15px;"><strong>Shipping Info</strong></p>
      <p style="padding-bottom: 15px;">
          Name of Courier: ${delivery.courier} <br>
          Tracking No: ${delivery.track_num} <br>
          Estimated Date of Delivery: ${formatDate(delivery.date)} <br>
      </p>

      <p style="padding-bottom: 15px;">IMPORTANT NOTICE:</p>

      <p>Please confirm receipt of the product within 48 hours after arrival,
          otherwise, our system will automatically acknowledge it as received,
          48 hours from the date needed.
      </p>

      <!-- Button -->
      <div class="button-container">
          <a href="${link}/#/Orders" class="button" style="color:#000;">OPEN ORDER TRACKER</a>
      </div>

      <p>Celebrate Life!</p>

       <div stype="padding-top:15px;">
          <p>
            <strong>ANTURAZ</strong><br>
            OneStras Technologies Corp.<br>
            Unit 102, SMJ Residences Mawaque Rd,<br>
            Mabiga, Mabalacat City
          </p>
        </div>
  </div>
  `;
};

// service emails
export const servicePurchaseEmail = order => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `
  <div class="content">
      <p>Dear Mr./Ms. ${order.checkout_data.data.customer.last_name},</p>

      <p style="padding-bottom: 15px;">
          Thank you for purchasing via our platform! Below are the details of the transaction.
      </p>

      <p style="padding-bottom: 15px;">
          Order No: ${order.order_number || "N/A"}<br>
          Service Name: ${order.service_data.name} <br>
          SKU No: ${order.service_data.sku} <br>
          Amount: ${order.checkout_data.data.payment.amount}<br>
          Payment Method: ${order.payment_option}<br>
          Delivery Method: ${order.mode_of_service}<br>
          Contact Person: ${order.primary_person_name}<br>
          Contact No: ${order.primary_contact_number}<br>
          Date of Fulfillment: ${formatDate(order.date_needed)}<br>
          Time of Fulfillment: ${formatTime(order.time_needed)}<br>
          Place of Fulfillment: ${
            order.checkout_data.data.customer.shipping_address.line1
          }, 
          ${order.checkout_data.data.customer.shipping_address.line2}, 
          ${
            order.checkout_data.data.customer.shipping_address.city_municipality
          }, 
          ${order.checkout_data.data.customer.shipping_address.zip}, 
          ${
            order.checkout_data.data.customer.shipping_address
              .state_province_region
          }, 
          ${order.checkout_data.data.customer.shipping_address.country_code}<br>

          Store Name: ${order.store_data.name}<br>
          Store Contact No: 0${order.store_data.mobile_num}<br>
          Store Email Address: ${order.store_data.email}<br>

      </p>

      <p style="padding-bottom: 15px;">IMPORTANT NOTICE:</p>

      <p>
        Please confirm receipt of the service within 48 hours after the date of fulfillment, otherwise, our system will 
        automatically acknowledge it as received, 48 hours from the date of fulfillment.
      </p>

      <!-- Button -->
      <div class="button-container">
          <a href="${link}/#/Reservations" class="button" style="color:#000;">OPEN RESERVATION TRACKER</a>
      </div>

      <p style="padding-bottom: 15px;">
         This transaction is between you and the store, with Anturaz serving solely as the platform. Rest assured, your payment made online is secure with us and will only be credited to the store once the service has been confirmed as received by you or by our system's auto-receive feature.
          <br><br>
          For any concern or clarification about this transaction, please contact the store or escalate to us if not settled between you and the store.
      </p>

      <p>Celebrate Life!</p>

       <div stype="padding-top:15px;">
          <p>
            <strong>ANTURAZ</strong><br>
            OneStras Technologies Corp.<br>
            Unit 102, SMJ Residences Mawaque Rd,<br>
            Mabiga, Mabalacat City
          </p>
        </div>
  </div>
  `;
};

export const servicePurchaseEmailToVendor = order => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `
  <div class="content">
      <p style="padding-bottom: 15px;">
          Congratulations ${
            order.store_data.name
          }! You have a new product purchase! Below are the details of the transaction.
      </p>

      <p style="padding-bottom: 15px;">
            Order No: ${order.order_number || "N/A"}<br>
          Service Name: ${order.service_data.name} <br>
          SKU No: ${order.service_data.sku} <br>
          Amount: ${order.checkout_data.data.payment.amount}<br>
          Payment Method: ${order.payment_option}<br>
          Delivery Method: ${order.mode_of_service}<br>
          Contact Person: ${order.primary_person_name}<br>
          Contact No: ${order.primary_contact_number}<br>
          Date of Fulfillment: ${formatDate(order.date_needed)}<br>
          Time of Fulfillment: ${formatTime(order.time_needed)}<br>
          Place of Fulfillment: ${
            order.checkout_data.data.customer.shipping_address.line1
          }, 
          ${order.checkout_data.data.customer.shipping_address.line2}, 
          ${
            order.checkout_data.data.customer.shipping_address.city_municipality
          }, 
          ${order.checkout_data.data.customer.shipping_address.zip}, 
          ${
            order.checkout_data.data.customer.shipping_address
              .state_province_region
          }, 
          ${order.checkout_data.data.customer.shipping_address.country_code}<br>

      
      </p>

      <p style="padding-bottom: 15px;">IMPORTANT NOTICE:</p>

      <p style="padding-bottom: 15px;">
        This transaction is between you and the shopper, with Anturaz serving solely as the platform. Payment will be credited to you based on our terms of use.
      </p>
      
      <p style="padding-bottom: 15px;">
        Please complete the delivery of this transaction on or before the date needed to avoid suspension of your account and/or bad reviews.
      </p>
      

      <!-- Button -->
      <div class="button-container">
          <a href="${link}/#/StoreOwner" class="button" style="color:#000;">VIEW ON DASHBOARD</a>
      </div>


      <p>Celebrate Life!</p>

       <div stype="padding-top:15px;">
          <p>
            <strong>ANTURAZ</strong><br>
            OneStras Technologies Corp.<br>
            Unit 102, SMJ Residences Mawaque Rd,<br>
            Mabiga, Mabalacat City
          </p>
        </div>
  </div>
  `;
};

export const shopperManualRecievedOrder = order => {
  console.log(order.store_data);
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `<div class="content">
                <p>Dear Mr./Ms. ${
                  order.checkout_data.data.customer.last_name
                },</p>
                <p>The transaction below was marked as received.</p>

                <p><strong>Transaction Details:</strong></p>
                <p>Order No: ${order.order_number}<br>
                    Amount: ${order.checkout_data.data.payment.amount}<br>
                    Payment Method: ${order.payment_option}<br>
                    Delivery Method: ${order.mode_of_delivery}<br>
                    Store Name: ${order.store_data.name} <br>
                    Store Contact No: 0${order.store_data.mobile_num} <br>
                    Method of Receipt: Triggered by you</p>

                <div class="button-container">
                    <a href="https://anturaz.io/#/Orders" class="button">VIEW ON DASHBOARD</a>
                </div>

                <p>For any concern or clarification about this transaction, please contact the store or escalate to us if
                    not settled between you and the store.</p>
                <p>Celebrate Life!</p>
            </div>`;
};

export const vendorManualRecievedOrder = order => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  return `<div class="content">
            <p>Hello ${
              order.store_data.name
            }! The transaction below was marked as received.</p>

            <p><strong>Transaction Details:</strong></p>
            <p>Order No: ${order.order_number}<br>
                Amount: ${order.checkout_data.data.payment.amount}<br>
                Payment Method: ${order.payment_option}<br>
                Delivery Method: ${order.mode_of_delivery}<br>
                Contact Person: ${order.primary_person_name} <br>
                Contact Number: ${order.primary_contact_number}<br>
                Method of Receipt: Triggered by client</p>

            <div class="button-container">
                <a href="https://anturaz.io/#/Orders" class="button">VIEW ON DASHBOARD</a>
            </div>

            <p>For any concern or clarification about this transaction, please contact the store or escalate to us if
                not settled between you and the store.</p>
            <p>Celebrate Life!</p>
        </div>`;
};

// gift registry
