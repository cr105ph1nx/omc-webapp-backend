const Review = require("../models/review");
const nodemailer = require("nodemailer");
const { ACTIVITY, COURSE, EVENT, MAXAGE } = require("../const");
const Activity = require("../models/activity");
const Course = require("../models/course");
const Event = require("../models/event");

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

  // Verify if guest is logged in with google account
  async authRequired(req, res, next) {
    try {
      // save everything in cookie
      let { rating, title, description, sessionID, sessionType } = req.params;
      if (!rating || !sessionID || !sessionType) {
        return res.status(400).json({ error: "Insufficient Information..." });
      }
      res.cookie("rating", rating, { maxAge: MAXAGE });
      res.cookie("title", title, { maxAge: MAXAGE });
      res.cookie("description", description, { maxAge: MAXAGE });
      res.cookie("sessionID", sessionID, { maxAge: MAXAGE });
      res.cookie("sessionType", sessionType, { maxAge: MAXAGE });
      if (req.user) {
        next();
      } else {
        // redirect to /auth/google
        res.redirect("/guests/auth/google");
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Adding review to given session
  async addReview(req, res, next) {
    try {
      let { title, description, sessionType, sessionID } = req.cookies;
      let rating = parseFloat(req.cookies.rating);
      let user = req.user._json;
      let oldGuestRating,
        found = false;
      // check if this client_id has already rated this session before
      let review = await Review.findOne({
        client_id: user.client_id,
        session: { sessionType, sessionID },
      });

      switch (sessionType) {
        case EVENT:
          let event = await Event.findById(sessionID);
          if (event) {
            if (review) {
              // this client has rated this session before => update review
              found = true;
              // this client has rated this session before => update review
              review.description = description;
              // save old guest rating
              oldGuestRating = review.rating;
              // update to new rating
              review.rating = rating;
              review.title = title;
              review.save();

              // Update event
              event.rating = (event.rating * 2 - oldGuestRating + rating) / 2;
            } else {
              // this client has never rated this session before => new review
              review = new Review({
                client_id: user.sub,
                client_photo: user.picture,
                client_name: user.name,
                title,
                rating,
                description,
                session: { sessionType, sessionID },
              });

              await review.save();

              // Update event
              event.rating = (event.rating + rating) / 2;
            }
            // push new review
            event.reviews.push(review._id);
            // save changes
            await event.save();
          } else {
            res.status(404).json({ error: "Session not found." });
          }
          break;
        case COURSE:
          let course = await Course.findById(sessionID);
          if (course) {
            if (review) {
              // this client has rated this session before => update review
              found = true;
              // this client has rated this session before => update review
              review.description = description;
              // save old guest rating
              oldGuestRating = review.rating;
              // update to new rating
              review.rating = rating;
              review.title = title;
              review.save();

              // Update course
              course.rating = (course.rating * 2 - oldGuestRating + rating) / 2;
            } else {
              // this client has never rated this session before => new review
              review = new Review({
                client_id: user.sub,
                client_photo: user.picture,
                client_name: user.name,
                title,
                rating,
                description,
                session: { sessionType, sessionID },
              });

              await review.save();

              // Update course
              course.rating = (course.rating + rating) / 2;
            }
            // push new review
            course.reviews.push(review._id);
            // save changes
            await course.save();
          } else {
            res.status(404).json({ error: "Session not found." });
          }
          break;
        case ACTIVITY:
          let activity = await Activity.findById(sessionID);
          if (activity) {
            if (review) {
              // this client has rated this session before => update review
              found = true;
              // this client has rated this session before => update review
              review.description = description;
              // save old guest rating
              oldGuestRating = review.rating;
              // update to new rating
              review.rating = rating;
              review.title = title;
              review.save();

              // Update activity
              activity.rating =
                (activity.rating * 2 - oldGuestRating + rating) / 2;
            } else {
              // this client has never rated this session before => new review
              review = new Review({
                client_id: user.sub,
                client_photo: user.picture,
                client_name: user.name,
                title,
                rating,
                description,
                session: { sessionType, sessionID },
              });

              await review.save();

              // Update activity
              activity.rating = (activity.rating + rating) / 2;
            }
            // push new review
            activity.reviews.push(review._id);
            // save changes
            await activity.save();
          } else {
            res.status(404).json({ error: "Session not found." });
          }
          break;
      }

      res.status(200).json({ message: "Rated Successfully !" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Handling authentication failure of guest
  async authFailure(req, res, next) {
    try {
      res.status(500).json({ error: "Authentication failed..." });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
