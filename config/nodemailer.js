const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: "theimmortallucifer@gmail.com",
    pass: "immortallucifer",
  },
});

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
