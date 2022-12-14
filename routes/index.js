const adminsRouter = require("./admins.js");
const membersRouter = require("./members.js");
const bureauxRouter = require("./bureaux.js");
const partnersRouter = require("./partners.js");
const participantsRouter = require("./participants.js");
const hostsRouter = require("./hosts.js");
const eventsRouter = require("./events.js");
const coursesRouter = require("./courses.js");
const activitiesRouter = require("./activities.js");
const slideshowsRouter = require("./slideshows.js");
const guestsRouter = require("./guests.js");
const reviewsRouter = require("./reviews.js");

module.exports = (app) => {
  app.use("/admins", adminsRouter);
  app.use("/members", membersRouter);
  app.use("/bureaux", bureauxRouter);
  app.use("/partners", partnersRouter);
  app.use("/participants", participantsRouter);
  app.use("/hosts", hostsRouter);
  app.use("/events", eventsRouter);
  app.use("/courses", coursesRouter);
  app.use("/activities", activitiesRouter);
  app.use("/slideshows", slideshowsRouter);
  app.use("/guests", guestsRouter);
  app.use("/reviews", reviewsRouter);
};
