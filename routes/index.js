const adminsRouter = require("./admins.js");
const membersRouter = require("./members.js");

module.exports = (app) => {
  app.use("/admins", adminsRouter);
  app.use("/members", membersRouter);
};
