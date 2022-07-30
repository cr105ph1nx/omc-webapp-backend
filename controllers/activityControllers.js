const Activity = require("../models/activity");
const { PAGELENGTH } = require("../const");

module.exports = {
  // Find activity by ID
  async getActivity(req, res, next) {
    let activity;
    try {
      activity = await Activity.findById(req.params.activityID);
      if (activity == null) {
        return res.status(404).json({ error: "Activity could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.activity = activity;
    next();
  },

  // Getting all activities
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Activity.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Activity.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Activity.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, activities: docs } });
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Getting an activity by ID
  async getActivityByID(req, res, next) {
    res.send(res.activity.email);
    next();
  },

  // Creating an activity
  async createActivity(req, res, next) {
    // create activity
    const activity = new Activity({
      title: req.body.title,
      tags: req.body.tags,
      description: req.body.description,
      ...(req.body.images && { images: req.body.images }),
      location: req.body.location,
      startDate: req.body.startDate,
      ...(req.body.endDate && { endDate: req.body.endDate }),
      period: req.body.period,
      capacity: req.body.capacity,
      level: req.body.level,
      ...(req.body.resources && { resources: req.body.resources }),
      hosts: req.body.hosts,
    });

    try {
      await activity.save();

      res.status(201).json({
        activity,
        error: null,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Updating an activity
  async updateActivity(req, res, next) {
    if (req.body.title != null) {
      res.activity.title = req.body.title;
    }
    if (req.body.tags != null) {
      res.activity.tags = req.body.tags;
    }
    if (req.body.description != null) {
      res.activity.description = req.body.description;
    }
    if (req.body.images != null) {
      res.activity.images = req.body.images;
    }
    if (req.body.location != null) {
      res.activity.location = req.body.location;
    }
    if (req.body.startDate != null) {
      res.activity.startDate = req.body.startDate;
    }
    if (req.body.endDate != null) {
      res.activity.endDate = req.body.endDate;
    }
    if (req.body.period != null) {
      res.activity.period = req.body.period;
    }
    if (req.body.level != null) {
      res.activity.level = req.body.level;
    }
    if (req.body.capacity != null) {
      res.activity.capacity = req.body.capacity;
    }
    if (req.body.resources != null) {
      res.activity.resources = req.body.resources;
    }
    if (req.body.hosts != null) {
      res.activity.hosts = req.body.hosts;
    }

    try {
      const updatedActivity = await res.activity.save();
      res.json(updatedActivity);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Deleting an activity
  async deleteActivity(req, res, next) {
    try {
      // delete activity
      await res.activity.remove();

      res.json({ message: "Activity deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Searching for activity
  async searchActivity(req, res, next) {
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
        ...(filters.level && { level: filters.level }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        ...(filters.period && { period: filters.period }),
        ...(filters.host && { hosts: filters.host }),
        ...(filters.hosts && { hosts: filters.hosts }),
      };

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Activity.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Activity.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Activity.find(queryObj)
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, activities: docs } });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
