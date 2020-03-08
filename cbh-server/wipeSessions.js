const sessionMethods = require("./db/methods/session");
const dbConnect = require("./db/connect");

const run = async () => {

  await dbConnect();

  const result = await sessionMethods.wipeSessions();
  console.log("Deleted sessions: " + result);
};

run();
