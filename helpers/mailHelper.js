const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

const createEmailTemplate = async ({ verifyToken }) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Our Users",
      link: "http://localhost:3000/",
    },
  });
  const template = {
    body: {
      intro:
        "Welcome to Our Users team! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Our Users, please click here:",
        button: {
          color: "#22BC66",
          text: "Confirm your account",
          link: `http://localhost:3000/api/users/verify/${verifyToken}`,
        },
      },
      outro: "Need help, or have questions? Just reply to this email.",
    },
  };
  const emailBody = mailGenerator.generate(template);
  return emailBody;
};

const sendEmail = async (verifyToken, email) => {
  const emailCore = await createEmailTemplate({ verifyToken, email });
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "stepakiev10@gmail.com",
    subject: "Verification E-mail",
    html: emailCore,
  };

  await sgMail.send(msg);
};

module.exports = {
  sendEmail,
};
