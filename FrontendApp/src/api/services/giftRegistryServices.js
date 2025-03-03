import { http, httpFile, dbCon } from "../httpServices";
import { appLink } from "../../boot/dbCon";

const connection = dbCon();
connection.authenticate();
const giftService = connection.service("gift-registry");

export const findGiftReg = async () => {
  try {
    const res = await giftService.find({});
    return res;
  } catch (error) {
    console.error("Error while finding gift registry:", error);
  }
};

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

const formatDate = dateStr => {
  const [year, month, day] = dateStr.split("/");
  const date = new Date(year, month - 1, day); // Month is 0-based in JS

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

export const createGiftEmail = async (data, shopper) => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;
  const message = `
        <!-- Content -->
        <div class="content">
            <p>Dear Mr./Ms. ${shopper.lname},</p>

            <p style="padding-bottom: 15px;">
                Congratulations! You have successfully created a Gift Registry with the following details.</p>

            <p style="padding-bottom: 15px;">Gift Registry Reference No: ${
              data.reference_number
            }<br>
                Event Name: ${data.event_name} <br>
                Event Date: ${formatDate(data.event_date)} <br> 
                Name of Celebrant: ${data.celebrant_name} <br>
                Name of Groom (if Wedding): ${
                  data.grooms_name === "" ? "" : data.grooms_name
                }<br>
                Coordinator/Contact Person: ${data.coordinator_name}<br>
                Contact No: ${data.coordinator_contact}<br>
                Event Venue: ${data.house_bldg_st}, 
                            ${data.barangay_district},  
                            ${data.zip_code},  
                            ${data.city_municipality.name} 
                            ${data.city_municipality.city ? "City" : ""}
                           <br>
            </p>
            <p style="padding-bottom: 15px;">IMPORTANT NOTICE:</p>

            <p>Please notify us for any concern or clarification about this transaction.</p>

            <!-- Button -->
            <div class="button-container">
                <a href="${link}/#/GiftRegistry/Event/Manage/${
    data.reference_number
  }" class="button" style="color:#000;">VIEW GIFT REGISTRY</a>
            </div>


            <p>Celebrate Life!</p>

            <div>
                <p><strong>ANTURAZ</strong><br>
                    OneStras Technologies Corp.<br>
                    Unit 102, SMJ Residences Mawaque Rd,<br>
                    Mabiga, Mabalacat City</p>
            </div>
        </div>
    `;
  const subject = "ANTURAZ - Gift Registry Creation was Successful";
  await emailSender(shopper, message, subject);
};

export const createGiftReg = async data => {
  try {
    const createRes = await giftService.create(data);

    return createRes;
  } catch (error) {
    console.error("Error while creating gift registry:", error);
  }
};

export const contactInviteGiftRegEmail = async (data, contact) => {
  const link =
    appLink === "http://localhost:8081" ? "http://localhost:8080" : appLink;

  try {
    const message = `
        <!-- Content -->
        <div class="content">
            <p>Dear Mr./Ms. ${contact.name},</p>

            <p style="padding-bottom: 15px;">
               You have been invited to the following Gift Registry!</p>

            <p style="padding-bottom: 0px;">Gift Registry Reference No: ${
              data.reference_number
            }<br>
                Event Name: ${data.event_name} <br>
                Event Date: ${formatDate(data.event_date)} <br> 
                Name of Celebrant: ${data.celebrant_name} <br>
                Name of Groom (if Wedding): ${
                  data.grooms_name === "" ? "" : data.grooms_name
                }<br>
                Coordinator/Contact Person: ${data.coordinator_name}<br>
                Contact No: ${data.coordinator_contact}<br>
                Event Venue: ${data.house_bldg_st}, 
                            ${data.barangay_district},  
                            ${data.zip_code},  
                            ${data.city_municipality.name} 
                            ${data.city_municipality.city ? "City" : ""} 
                           <br>
            </p>
       
            <!-- Button -->
            <div class="button-container">
                <a href="${link}/#/GiftRegistry/Event/Manage/${
      data.reference_number
    }" class="button" style="color:#000;">VIEW GIFT REGISTRY</a>
            </div>


            <p>Let’s make the celebrant’s event memorable by purchasing only the gift in the wish list to avoid duplication of gift from other guests.</p>


            <p>Celebrate Life!</p>

            <div>
                <p><strong>ANTURAZ</strong><br>
                    OneStras Technologies Corp.<br>
                    Unit 102, SMJ Residences Mawaque Rd,<br>
                    Mabiga, Mabalacat City</p>
            </div>
        </div>
    `;

    const subject =
      "ANTURAZ - You have been invited to participate in a Gift Registry";
    await emailSender(contact, message, subject);
  } catch (error) {
    console.error("Error while finding gift registry contacts:", error);
  }
};
