const userMethods = require("./db/methods/user");
const dbConnect = require("./db/connect");

const run = async () => {

  await dbConnect();

  const result = await userMethods.wipeUsers();
  console.log("Deleted users: " + result);
};

run();
