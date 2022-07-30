const adminsRouter = require("./admins.js");

module.exports = (app) => {
  app.use("/admins", adminsRouter);
};
