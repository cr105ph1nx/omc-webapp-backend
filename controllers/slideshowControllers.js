const Slideshow = require("../models/slideshow");
const { PAGELENGTH } = require("../const");

module.exports = {
  // Find slideshow by ID
  async getSlideshow(req, res, next) {
    let slideshow;
    try {
      slideshow = await Slideshow.findById(req.params.slideshowID);
      if (slideshow == null) {
        return res.status(404).json({ error: "Slideshow could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.slideshow = slideshow;
    next();
  },

  // Getting all slideshows
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Slideshow.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Slideshow.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Slideshow.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, slideshows: docs } });
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Getting an slideshow by ID
  async getSlideshowByID(req, res, next) {
    res.send(res.slideshow.email);
    next();
  },

  // Creating an slideshow
  async createSlideshow(req, res, next) {
    /* After `upload.single('image'): We find the uploaded image info in `req.file` */
    try {
      // create slideshow
      const slideshow = new Slideshow({
        title: req.body.title,
        // add name of file in image field
        image: req.file.filename,
        description: req.body.description,
        ...(req.body.actionButton && { actionButton: req.body.actionButton }),
      });
      await slideshow.save();

      res.status(201).json({
        slideshow,
        error: null,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Updating an slideshow
  async updateSlideshow(req, res, next) {
    if (req.body.isVisible != null) {
      res.course.isVisible = req.body.isVisible;
    }
    if (req.body.title != null) {
      res.slideshow.title = req.body.title;
    }
    if (req.body.image != null) {
      res.slideshow.image = req.body.image;
    }
    if (req.body.description != null) {
      res.slideshow.description = req.body.description;
    }
    if (req.body.actionButton != null) {
      res.slideshow.actionButton = req.body.actionButton;
    }
    try {
      const updatedSlideshow = await res.slideshow.save();
      res.json(updatedSlideshow);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Deleting an slideshow
  async deleteSlideshow(req, res, next) {
    try {
      // delete slideshow
      await res.slideshow.remove();

      res.json({ message: "Slideshow deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Searching for slideshow
  async searchSlideshow(req, res, next) {
    try {
      let skip;
      let totalDocs, totalPages;

      let queryObj = {
        ...(req.body.isVisible && { isVisible: req.body.isVisible }),
      };

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Slideshow.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Slideshow.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Slideshow.find(queryObj)
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, slideshow: docs } });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
