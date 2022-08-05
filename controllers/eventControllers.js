const Event = require("../models/event");
const { PAGELENGTH } = require("../const");

module.exports = {
  // Find event by ID
  async getEvent(req, res, next) {
    let event;
    try {
      event = await Event.findById(req.params.eventID);
      if (event == null) {
        return res.status(404).json({ error: "Event could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.event = event;
    next();
  },

  // Getting all events
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Event.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Event.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Event.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, events: docs } });
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Getting an event by ID
  async getEventByID(req, res, next) {
    res.send(res.event.email);
    next();
  },

  // Creating an event
  async createEvent(req, res, next) {
    /* After `upload.array('images'): We find the uploaded image info in `req.files` */
    try {
      let images = [];
      await req.files.forEach((file) => {
        images.push(file.path);
      });
      // create event
      const event = new Event({
        title: req.body.title,
        tags: req.body.tags,
        description: req.body.description,
        ...(images !== [] && { images }),
        ...(req.body.websiteUrl && { websiteUrl: req.body.websiteUrl }),
        ...(req.body.agendaUrl && { agendaUrl: req.body.agendaUrl }),
        ...(req.body.sponsoringFolderUrl && {
          sponsoringFolderUrl: req.body.sponsoringFolderUrl,
        }),
      });
      await event.save();

      res.status(201).json({
        event,
        error: null,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Updating an event
  async updateEvent(req, res, next) {
    if (req.body.title != null) {
      res.event.title = req.body.title;
    }
    if (req.body.tags != null) {
      res.event.tags = req.body.tags;
    }
    if (req.body.description != null) {
      res.event.description = req.body.description;
    }
    if (req.body.images != null) {
      res.event.images = req.body.images;
    }
    if (req.body.websiteUrl != null) {
      res.event.websiteUrl = req.body.websiteUrl;
    }
    if (req.body.agendaUrl != null) {
      res.event.agendaUrl = req.body.agendaUrl;
    }
    if (req.body.sponsoringFolderUrl != null) {
      res.event.sponsoringFolderUrl = req.body.sponsoringFolderUrl;
    }
    try {
      const updatedEvent = await res.event.save();
      res.json(updatedEvent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Deleting an event
  async deleteEvent(req, res, next) {
    try {
      // delete event
      await res.event.remove();

      res.json({ message: "Event deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Searching for event
  async searchEvent(req, res, next) {
    try {
      let skip;
      let totalDocs, totalPages;

      /* {title, tags} */
      let filters = req.body;
      let queryObj = {
        ...(filters.title && {
          title: { $regex: filters.title, $options: "$i" },
        }),
        ...(filters.rating && { rating: filters.rating }),
        ...(filters.tag && { tags: filters.tag }),
        ...(filters.tags && { tags: filters.tags }),
      };

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Event.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Event.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Event.find(queryObj)
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, events: docs } });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
