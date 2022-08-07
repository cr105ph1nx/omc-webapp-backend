const Host = require("../models/host");
const { PAGELENGTH } = require("../const");

module.exports = {
  // Find host by ID
  async getHost(req, res, next) {
    let host;
    try {
      host = await Host.findById(req.params.hostID);
      if (host == null) {
        return res.status(404).json({ error: "Host could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.host = host;
    next();
  },

  // Getting all hosts
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Host.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Host.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Host.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, hosts: docs } });
        });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Getting a host by ID
  async getHostByID(req, res, next) {
    res.send(res.host);
    next();
  },

  // Creating a host
  async createHost(req, res, next) {
    // create host
    const host = new Host({
      email: req.body.email,
      fullname: req.body.fullname,
      ...(req.body.redirectPortfolio && {
        redirectPortfolio: req.body.redirectPortfolio,
      }),
    });

    try {
      await host.save();
      res.status(200).json({
        host,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Updating a host
  async updateHost(req, res, next) {
    if (req.body.email != null) {
      res.host.email = req.body.email;
    }
    if (req.body.fullname != null) {
      res.host.fullname = req.body.fullname;
    }
    if (req.body.redirectPortfolio != null) {
      res.host.redirectPortfolio = req.body.redirectPortfolio;
    }
    try {
      const updatedHost = await res.host.save();
      res.status(200).json({ host: updatedHost });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Add a new session to host
  async addSession(req, res, next) {
    // host is in res
    try {
      let host = res.host;
      host.sessions.push(req.body.session);
      host.save();
      res.status(200).json({
        message: "New session added to Host !",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Remove session from host
  async removeSession(req, res, next) {
    // host is in res
    try {
      let host = res.host;
      host.sessions.remove(req.body.session);
      host.save();
      res.status(200).json({
        message: "Session removed from Host !",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Deleting a host
  async deleteHost(req, res, next) {
    try {
      // delete host
      await res.host.remove();

      res.status(200).json({ message: "Host deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Searching for host
  async searchHost(req, res, next) {
    try {
      let skip;
      let totalDocs, totalPages;

      /* {session{type, id}, email, fullname} */
      let filters = req.body;
      let queryObj = {
        ...(filters.fullname && {
          fullname: { $regex: filters.fullname, $options: "$i" },
        }),
        ...(filters.email && {
          email: { $regex: filters.email, $options: "$i" },
        }),
        ...(filters.session && { sessions: filters.session }),
        ...(filters.sessions && { sessions: filters.sessions }),
      };

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Host.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Host.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Host.find(queryObj)
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, hosts: docs } });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
