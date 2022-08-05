const Course = require("../models/course");
const { PAGELENGTH } = require("../const");

module.exports = {
  // Find course by ID
  async getCourse(req, res, next) {
    let course;
    try {
      course = await Course.findById(req.params.courseID);
      if (course == null) {
        return res.status(404).json({ error: "Course could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.course = course;
    next();
  },

  // Getting all courses
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Course.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Course.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Course.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, courses: docs } });
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Getting an course by ID
  async getCourseByID(req, res, next) {
    res.send(res.course.email);
    next();
  },

  // Creating an course
  async createCourse(req, res, next) {
    /* After `upload.array('images'): We find the uploaded image info in `req.files` */

    try {
      let images = [];
      await req.files.forEach((file) => {
        images.push(file.path);
      });
      // create course
      const course = new Course({
        title: req.body.title,
        tags: req.body.tags,
        description: req.body.description,
        ...(images !== [] && { images }),
        location: req.body.location,
        startDate: req.body.startDate,
        ...(req.body.endDate && { endDate: req.body.endDate }),
        period: req.body.period,
        capacity: req.body.capacity,
        level: req.body.level,
        ...(req.body.resources && { resources: req.body.resources }),
        hosts: req.body.hosts,
      });

      await course.save();

      res.status(201).json({
        course,
        error: null,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Updating an course
  async updateCourse(req, res, next) {
    if (req.body.isActive != null) {
      res.course.isActive = req.body.isActive;
    }
    if (req.body.title != null) {
      res.course.title = req.body.title;
    }
    if (req.body.tags != null) {
      res.course.tags = req.body.tags;
    }
    if (req.body.description != null) {
      res.course.description = req.body.description;
    }
    if (req.body.images != null) {
      res.course.images = req.body.images;
    }
    if (req.body.location != null) {
      res.course.location = req.body.location;
    }
    if (req.body.startDate != null) {
      res.course.startDate = req.body.startDate;
    }
    if (req.body.endDate != null) {
      res.course.endDate = req.body.endDate;
    }
    if (req.body.period != null) {
      res.course.period = req.body.period;
    }
    if (req.body.level != null) {
      res.course.level = req.body.level;
    }
    if (req.body.capacity != null) {
      res.course.capacity = req.body.capacity;
    }
    if (req.body.resources != null) {
      res.course.resources = req.body.resources;
    }
    if (req.body.hosts != null) {
      res.course.hosts = req.body.hosts;
    }

    try {
      const updatedCourse = await res.course.save();
      res.json(updatedCourse);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Deleting an course
  async deleteCourse(req, res, next) {
    try {
      // delete course
      await res.course.remove();

      res.json({ message: "Course deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Searching for course
  async searchCourse(req, res, next) {
    try {
      let skip;
      let totalDocs, totalPages;

      /* {title, tags} */
      let filters = req.body;
      let queryObj = {
        ...(filters.isActive && { isActive: filters.isActive }),
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
        totalDocs = await Course.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Course.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Course.find(queryObj)
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, courses: docs } });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
