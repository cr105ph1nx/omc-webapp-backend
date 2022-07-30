const Bureau = require("../models/bureau");
const { PAGELENGTH } = require("../const");

module.exports = {
  // Find bureau by ID
  async getBureau(req, res, next) {
    let bureau;
    try {
      bureau = await Bureau.findById(req.params.bureauID);
      if (bureau === null) {
        return res.status(404).json({ error: "Bureau could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.bureau = bureau;
    next();
  },

  // Getting all bureaux
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Bureau.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Bureau.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Bureau.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, bureaux: docs } });
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Getting a bureau by ID
  async getBureauByID(req, res, next) {
    res.send(res.bureau);
    next();
  },

  // Getting current bureau
  async getCurrentBureau(req, res, next) {
    try {
      // current year is found in req.body
      let bureau = await Bureau.findOne({ year: req.body.year });
      res.status(201).json(bureau);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Creating a bureau
  async createBureau(req, res, next) {
    try {
      const bureau = new Bureau({
        year: req.body.year,
        president: req.body.president,
        vicePresident: req.body.vicePresident,
        secretary: req.body.secretary,
        viceSecretary: req.body.viceSecretary,
      });

      await bureau.save();
      res.status(201).json({
        bureau,
        error: null,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  //  Setting current bureau as visible
  async setBureauVisible(req, res, next) {
    try {
      let currentYear = new Date().getFullYear();
      console.log("year: ", currentYear);
      let bureau = await Bureau.findOne({ year: currentYear });
      bureau.isVisible = true;
      bureau.save();
      res.status(201).json({
        message: "Bureau is now visible !",
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Updating a bureau
  async updateBureau(req, res, next) {
    if (req.body.year != null) {
      res.bureau.year = req.body.year;
    }
    if (req.body.president != null) {
      // president
      res.bureau.president = req.body.president;
    }
    if (req.body.vicePresident != null) {
      // vicePresident
      res.bureau.vicePresident = req.body.vicePresident;
    }
    if (req.body.secretary != null) {
      // secretary
      res.bureau.secretary = req.body.secretary;
    }
    if (req.body.viceSecretary != null) {
      // viceSecretary
      res.bureau.viceSecretary = req.body.viceSecretary;
    }
    try {
      const updatedBureau = await res.bureau.save();
      res.json(updatedBureau);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Deleting a bureau
  async deleteBureau(req, res, next) {
    try {
      // delete bureau
      await res.bureau.remove();

      res.json({ message: "Bureau deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },
};
