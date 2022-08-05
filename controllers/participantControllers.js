const Participant = require("../models/participant");
const { PAGELENGTH } = require("../const");
const converter = require("json-2-csv");

module.exports = {
  // Find participant by ID
  async getParticipant(req, res, next) {
    let participant;
    try {
      participant = await Participant.findById(req.params.participantID);
      if (participant == null) {
        return res
          .status(404)
          .json({ error: "Participant could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.participant = participant;
    next();
  },

  // Getting all participants
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Participant.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Participant.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Participant.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, participants: docs } });
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Getting a participant by ID
  async getParticipantByID(req, res, next) {
    res.send(res.participant);
    next();
  },

  // Creating a participant
  async createParticipant(req, res, next) {
    // create participant
    const participant = new Participant({
      email: req.body.email,
      fullname: req.body.fullname,
      phonenumber: req.body.phonenumber,
      studentID: req.body.studentID,
      level: req.body.level,
      establishment: req.body.establishment,
      experience: req.body.experience,
      session: req.body.session,
    });

    try {
      await participant.save();
      res.status(201).json({
        participant,
        error: null,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Updating a participant
  async updateParticipant(req, res, next) {
    if (req.body.email != null) {
      res.participant.email = req.body.email;
    }
    if (req.body.fullname != null) {
      res.participant.fullname = req.body.fullname;
    }
    if (req.body.phonenumber != null) {
      res.participant.phonenumber = req.body.phonenumber;
    }
    if (req.body.studentID != null) {
      res.participant.studentID = req.body.studentID;
    }
    if (req.body.level != null) {
      res.participant.level = req.body.level;
    }
    if (req.body.establishment != null) {
      res.participant.faculty = req.body.faculty;
    }
    if (req.body.isAccepted != null) {
      res.participant.isAccepted = req.body.isAccepted;
    }
    try {
      const updatedParticipant = await res.participant.save();
      res.json(updatedParticipant);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Deleting a participant
  async deleteParticipant(req, res, next) {
    try {
      // delete participant
      await res.participant.remove();

      res.json({ message: "Participant deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Searching for participant
  async searchParticipant(req, res, next) {
    try {
      let skip;
      let totalDocs, totalPages;

      /* {isAccepted, session{type, id} email, fullname, phonenumber, studentID, level, establishment} */
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
        ...(filters.establishment && { faculty: filters.establishment }),
        ...(filters.isAccepted && { isAccepted: filters.isAccepted }),
        ...(filters.session && { session: filters.session }),
      };

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Participant.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Participant.countDocuments(queryObj);
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Participant.find(queryObj)
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, participants: docs } });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Accept multiple members
  async acceptParticipants(req, res, next) {
    try {
      // req.body.participants has id of all participants that should be accepted
      let { participants } = req.body;
      let i,
        length = participants.length,
        unhandled = [];
      // update status
      for (i = 0; i < length; i++) {
        await Participant.findById({ _id: participants[i] })
          .then((participant) => {
            if (participant) {
              participant.isAccepted = true;
              participant.save();
            } else unhandled = participants[i];
          })
          .catch((err) => {
            unhandled = participants[i];
          });
      }

      res.status(200).json({ message: "Participants accepted.", unhandled });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Reject multiple members
  async rejectParticipants(req, res, next) {
    try {
      // req.body.participants has id of all participants that should be accepted
      let { participants } = req.body;
      let i,
        length = participants.length,
        unhandled = [];
      // update status
      for (i = 0; i < length; i++) {
        await Participant.findById({ _id: participants[i] })
          .then((participant) => {
            if (participant) {
              participant.isAccepted = false;
              participant.save();
            } else unhandled = participants[i];
          })
          .catch((err) => {
            unhandled = participants[i];
          });
      }

      res.status(200).json({ message: "Participants rejected.", unhandled });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Download all accepted participants from given session
  async downloadAccepted(req, res, next) {
    try {
      let { sessionType, sessionID } = req.body;
      if (!sessionType || !sessionID) {
        return res.status(400).json({ error: "Insufficient Information..." });
      }
      // get all participants that are accepted to given session
      let participants = await Participant.find({
        isAccepted: true,
        session: {
          sessionType,
          sessionID,
        },
      });

      // convert from json to csv format
      const csvString = await converter.json2csvAsync(participants, {
        emptyFieldValue: "N/A",
        excelBOM: true,
        excludeKeys: ["_id", "isAccepted"],
        keys: [
          "createdAt",
          "fullname",
          "email",
          "phonenumber",
          "studentID",
          "establishement",
          "level",
          "experience",
        ],
      });
      // download file
      res.setHeader(
        "Content-disposition",
        "attachment; filename=participants.csv"
      );
      res.set("Content-Type", "text/csv");
      res.status(200).send(csvString);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
