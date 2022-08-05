const Partner = require("../models/partner");
const { PAGELENGTH } = require("../const");

module.exports = {
  // Find partner by ID
  async getPartner(req, res, next) {
    let partner;
    try {
      partner = await Partner.findById(req.params.partnerID);
      if (partner === null) {
        return res.status(404).json({ error: "Partner could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.partner = partner;
    next();
  },

  // Getting all partners
  async index(req, res, next) {
    try {
      // "page" value in req.params
      let skip;
      let totalDocs, totalPages;

      if (!req.params.page || req.params.page === 1) {
        totalDocs = await Partner.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      } else {
        skip = (req.params.page - 1) * PAGELENGTH;
        totalDocs = await Partner.countDocuments();
        totalPages = Math.floor(totalDocs / PAGELENGTH + 1);
      }

      Partner.find()
        .limit(PAGELENGTH)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res
            .status(200)
            .json({ data: { totalDocs, totalPages, partners: docs } });
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // Getting a partner by ID
  async getPartnerByID(req, res, next) {
    res.send(res.partner);
    next();
  },

  // Creating a partner
  async createPartner(req, res, next) {
    /* After `upload.single('image'): We find the uploaded image info in `req.file` */
    try {
      console.log(req.body);
      console.log(req.file);
      // create partner
      const partner = new Partner({
        name: req.body.name,
        // add name of file in image field
        logo: req.file.filename,
        ...(req.body.url && { url: req.body.url }),
      });

      await partner.save();
      res.status(201).json({
        partner,
        error: null,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Updating a partner
  async updatePartner(req, res, next) {
    if (req.body.name != null) {
      res.partner.name = req.body.name;
    }
    if (req.body.logo != null) {
      res.partner.logo = req.body.logo;
    }
    if (req.body.url != null) {
      res.partner.url = req.body.url;
    }
    try {
      const updatedPartner = await res.partner.save();
      res.json(updatedPartner);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    next();
  },

  // Deleting a partner
  async deletePartner(req, res, next) {
    try {
      // delete partner
      await res.partner.remove();

      res.json({ message: "Partner deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },
};
