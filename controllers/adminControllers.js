const Admin = require("../models/admin");
const { PAGELENGTH } = require("../const");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jwt-simple");
const jsonwebtoken = require("jsonwebtoken");

module.exports = {
  // Find admin by ID
  async getAdmin(req, res, next) {
    let admin;
    try {
      admin = await Admin.findById(req.params.adminID);
      if (admin == null) {
        return res.status(404).json({ error: "Admin could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.admin = admin;
    next();
  },

  // Getting all admins
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Admin.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Admin.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Admin.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, admins: docs } });
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Getting an admin by ID
  async getAdminByID(req, res, next) {
    res.send(res.admin.email);
    next();
  },

  // Creating an admin
  async createAdmin(req, res, next) {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // create admin
    const admin = new Admin({
      email: req.body.email,
      password,
    });

    try {
      await admin.save();

      // Generate an access token
      const accessToken = jsonwebtoken.sign(
        {
          id: admin._id,
          email: admin.email,
        },
        process.env.TOKEN_SECRET
      );

      res.status(201).json({
        accessToken,
        error: null,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Updating an admin
  async updateAdmin(req, res, next) {
    if (req.body.email != null) {
      res.admin.email = req.body.email;
    }

    if (req.body.password != null) {
      res.admin.password = req.body.password;
    }
    try {
      const updatedAdmin = await res.admin.save();
      res.json(updatedAdmin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Deleting an admin
  async deleteAdmin(req, res, next) {
    try {
      // delete admin
      await res.admin.remove();

      res.json({ message: "Admin deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // login an admin
  async loginValidation(req, res, next) {
    // check if email exists
    const admin = await Admin.findOne({ email: req.body.email });

    // throw error when email is wrong
    if (!admin)
      return res
        .status(400)
        .json({ error: "The information you entered is wrong..." });

    // check for password validity
    let validPassword = await bcrypt.compare(req.body.password, admin.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ error: "The information you entered is wrong..." });
    } else {
      // Generate an access token
      const accessToken = jsonwebtoken.sign(
        {
          id: admin._id,
          email: admin.email,
        },
        process.env.TOKEN_SECRET
      );

      res.json({
        accessToken,
        error: null,
      });
    }
    next();
  },

  authRequired(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send({ error: "Missing Token" });
    }
    var token = req.headers.authorization.split(" ")[1];

    var payload = null;

    try {
      payload = jwt.decode(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return res.status(401).send({ error: "Invalid Token" });
    }

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ error: "Expired Token" });
    }

    // check if the admin exists
    Admin.findById(payload.id, (err, admin) => {
      if (!admin) {
        return res.status(401).send({ error: "Admin Not Found" });
      } else {
        res.admin = admin;
        next();
      }
    });
  },
};
