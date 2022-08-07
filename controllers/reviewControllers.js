const Review = require("../models/review");
const { PAGELENGTH } = require("../const");

module.exports = {
  // Find review by ID
  async getReview(req, res, next) {
    let review;
    try {
      review = await Review.findById(req.params.reviewID);
      if (review === null) {
        return res.status(404).json({ error: "Review could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.review = review;
    next();
  },

  // Getting all reviews
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Review.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Review.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Review.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, reviews: docs } });
        });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Getting a review by ID
  async getReviewByID(req, res, next) {
    res.send(res.review);
    next();
  },

  // Getting reviews of given session ID
  async getSessionReviews(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;
      let filters = {
        isVisible: true,
        session: {
          sessionType: req.body.sessionType,
          sessionID: req.body.sessionID,
        },
      };

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Review.countDocuments(filters);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Review.countDocuments(filters);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Review.find(filters)
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, reviews: docs } });
        });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Censor given reviews
  async censorReviews(req, res, next) {
    try {
      // req.body.reviews has id of all reviews that should be censored
      let { reviews } = req.body;
      let i,
        length = reviews.length,
        unhandled = [];
      // update status
      for (i = 0; i < length; i++) {
        await Review.findById({ _id: reviews[i] })
          .then((review) => {
            if (review) {
              review.isVisible = false;
              review.save();
            } else unhandled = reviews[i];
          })
          .catch((err) => {
            unhandled = reviews[i];
          });
      }

      res.status(200).json({ message: "Reviews censored.", unhandled });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
