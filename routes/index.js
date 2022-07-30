const adminsRouter = require("./admins.js");
const membersRouter = require("./members.js");
const bureauxRouter = require("./bureaux.js");
const partnersRouter = require("./partners.js");
const participantsRouter = require("./participants.js");

module.exports = (app) => {
  app.use("/admins", adminsRouter);
  app.use("/members", membersRouter);
  app.use("/bureaux", bureauxRouter);
  app.use("/partners", partnersRouter);
  app.use("/participants", participantsRouter);
};
