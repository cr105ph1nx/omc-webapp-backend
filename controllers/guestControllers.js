const nodemailer = require("nodemailer");

module.exports = {
  // Sending Contact Email
  async sendContactEmail(req, res, next) {
    try {
      let { fullname, email, phonenumber, subject, description } = req.body;
      if (!fullname || !email || !phonenumber || !subject || !description) {
        return res.status(400).json({
          message: "Insufficient information.",
        });
      }
      var sender = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        from: process.env.EMAIL,
      });

      var mail = {
        from: `${fullname} <${email}>`,
        to: process.env.EMAIL,
        subject: `[Contact Us from openmindsclub.net] ${subject}`,
        html: `${description}<br><strong>Contact:</strong> ${phonenumber}`,
      };

      sender.sendMail(mail, (err, info) => {
        if (err) {
          return res.status(500).json({
            message: "There was an error at the time of sending the email.",
            err,
          });
        } else {
          res.status(200).json({ message: "Email sent successfully." });
        }
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  // Send suggestion
  async sendSuggestionEmail(req, res, next) {
    try {
      let { fullname, email, phonenumber, subject, description } = req.body;
      if (
        !fullname ||
        !email ||
        !phonenumber ||
        !subject ||
        !type ||
        !title ||
        !description
      ) {
        return res.status(400).json({
          message: "Insufficient information.",
        });
      }
      var sender = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        from: process.env.EMAIL,
      });

      var mail = {
        from: `${fullname} <${email}>`,
        to: process.env.EMAIL,
        subject: `[Suggestion from openmindsclub.net] ${subject}`,
        html: `<strong>Type:</strong> ${type}<br><strong>Title:</strong> ${title}<br><strong>Description:</strong> ${description}<br><br><strong>Contact:</strong> ${phonenumber}`,
      };

      sender.sendMail(mail, (err, info) => {
        if (err) {
          return res.status(500).json({
            message: "There was an error at the time of sending the email.",
            err,
          });
        } else {
          res.status(200).json({ message: "Email sent successfully." });
        }
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
