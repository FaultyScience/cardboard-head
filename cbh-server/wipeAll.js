const userMethods = require("./db/methods/user");
const sessionMethods = require("./db/methods/session");
const dbConnect = require("./db/connect");

const run = async () => {

  await dbConnect();

  const userResult = await userMethods.wipeUsers();
  console.log("Deleted users: " + userResult);

  const sessionResult = await sessionMethods.wipeSessions();
  console.log("Deleted sessions: " + sessionResult);
};

run();
