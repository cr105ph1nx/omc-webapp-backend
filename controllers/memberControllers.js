const Member = require("../models/member");
const { PAGELENGTH } = require("../const");

module.exports = {
  // Find member by ID
  async getMember(req, res, next) {
    let member;
    try {
      member = await Member.findById(req.params.memberID);
      if (member == null) {
        return res.status(404).json({ error: "Member could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.member = member;
    next();
  },

  // Getting all members
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Member.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Member.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Member.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, members: docs } });
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Getting a member by ID
  async getMemberByID(req, res, next) {
    res.send(res.member);
    next();
  },

  // Creating a member
  async createMember(req, res, next) {
    // create member
    const member = new Member({
      email: req.body.email,
      fullname: req.body.fullname,
      phonenumber: req.body.phonenumber,
      studentID: req.body.studentID,
      level: req.body.level,
      faculty: req.body.faculty,
      motivation: req.body.motivation,
      team: req.body.team,
      experience: req.body.experience,
    });

    try {
      await member.save();
      res.status(201).json({
        member,
        error: null,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Updating a member
  async updateMember(req, res, next) {
    if (req.body.email != null) {
      res.member.email = req.body.email;
    }
    if (req.body.fullname != null) {
      res.member.fullname = req.body.fullname;
    }
    if (req.body.phonenumber != null) {
      res.member.phonenumber = req.body.phonenumber;
    }
    if (req.body.studentID != null) {
      res.member.studentID = req.body.studentID;
    }
    if (req.body.level != null) {
      res.member.level = req.body.level;
    }
    if (req.body.faculty != null) {
      res.member.faculty = req.body.faculty;
    }
    if (req.body.motivation != null) {
      res.member.motivation = req.body.motivation;
    }
    if (req.body.team != null) {
      res.member.team = req.body.team;
    }
    if (req.body.experience != null) {
      res.member.experience = req.body.experience;
    }
    if (req.body.isAccepted != null) {
      res.member.isAccepted = req.body.isAccepted;
    }
    try {
      const updatedMember = await res.member.save();
      res.json(updatedMember);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Deleting a member
  async deleteMember(req, res, next) {
    try {
      // delete member
      await res.member.remove();

      res.json({ message: "Member deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Searching for member
  async searchMember(req, res, next) {
    try {
      let skip;
      let totalDocs, totalPages;

      /* {isAccepted, email,fullname,phonenumber,studentID,level,faculty,team} */
      let filters = req.body;
      let queryObj = {
        ...(filters.fullname && {
          fullname: { $regex: filters.fullname, $options: "$i" },
        }),
        ...(filters.email && {
          email: { $regex: filters.email, $options: "$i" },
        }),
        ...(filters.studentID && {
          studentID: { $regex: filters.studentID, $options: "$i" },
        }),
        ...(filters.phonenumber && {
          phonenumber: { $regex: filters.phonenumber, $options: "$i" },
        }),
        ...(filters.level && { level: filters.level }),
        ...(filters.faculty && { faculty: filters.faculty }),
        ...(filters.team && { team: filters.team }),
        ...(filters.isAccepted && { isAccepted: filters.isAccepted }),
      };

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Member.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Member.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Member.find(queryObj)
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, members: docs } });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
