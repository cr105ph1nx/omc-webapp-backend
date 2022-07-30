const adminsRouter = require("./admins.js");
const membersRouter = require("./members.js");
const bureauxRouter = require("./bureaux.js");

module.exports = (app) => {
  app.use("/admins", adminsRouter);
  app.use("/members", membersRouter);
  app.use("/bureaux", bureauxRouter);
};
