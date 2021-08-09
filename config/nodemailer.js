const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require("./environment");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
},);

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    (err, template) => {
        // template is composed of the above two 19 and 20 lines
      if (err) {
        console.log("error in rendering template");
        return;
      }
      mailHTML = template;
    }
  );

  return mailHTML;


};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
