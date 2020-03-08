const fs = require("fs");

const User = require("../models/user").User;
const pf = require("../models/profile");
const utils = require("../../resources/utils");

const createUser = async (email, pw, displayName) => {

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(pw)) {
    throw new Error("Invalid password");
  }

  const password = utils.ePw(pw);

  let userId = utils.generateUserId();

  while (await isDuplicateId(userId)) {
    userId = utils.generateUserId();
  }

  const filepath = __dirname + "/../user-images/" + userId;
  fs.mkdirSync(filepath);
  fs.chmodSync(filepath, 0o777);

  fs.copyFileSync(__dirname + "/../../assets/default-profile.png",
    __dirname + "/../user-images/" + userId + "/profile-image.png");

  const profile = new pf.Profile({
    name: displayName,
    imageId: "profile-image",
    imageType: "png",
    weightPreference: [false, false, false],
    age: "default"
  });

  const user = new User({
    userId: userId,
    email: email,
    password: password,
    displayName: displayName,
    profile: profile,
    sessions: []
  });

  const result = await user.save();
  return result;
};

const checkEmailExists = async (email) => {

  const users = await User.find({ email: email });
  return (users.length !== 0);
};

const checkUserIdExists = async (userId) => {

  const users = await User.find({ userId: userId });
  return (users.length !== 0);
};

const checkDisplayNameExists = async (displayName) => {

  const users = await User.find({ displayName: displayName });
  return (users.length !== 0);
};

const verifyPassword = async (userId, password) => {

  if (password === undefined) { return false; }

  const user = (await User.find({ userId: userId }))[0];
  const dPw = utils.dPw(user.password);

  return (dPw === password);
};

const getUser = async (userId) => {

  const user = (await User.find({ userId: userId }))[0];
  return user;
};

const getUserId = async (email) => {

  const user = (await User.find({ email: email }))[0];
  return user.userId;
};

const getPassword = async (userId) => {

  const user = (await User.find({ userId: userId }))[0];
  const dPw = utils.dPw(user.password);

  return dPw;
};

const getPlayerProfile = async (userId) => {

  const user = (await User.find({ userId: userId }))[0];
  return user.profile;
};

const savePlayerProfile = async (userId, displayName, rules, weightPreference,
  age, about) => {

  const user = (await User.find({ userId: userId }))[0];

  user.profile.name = displayName;
  user.profile.rules = rules;
  user.profile.weightPreference = weightPreference;
  user.profile.age = age;
  user.profile.about = about;

  await user.save();
};

const getProfileImageName = async (userId) => {

  const user = (await User.find({ userId: userId }))[0];

  const imageId = user.profile.imageId;
  const imageType = user.profile.imageType;

  return imageId + "." + imageType;
};

const updateProfileImage = async (userId, imageId, imageType) => {

  const user = (await User.find({ userId: userId }))[0];

  user.profile.imageId = imageId;
  user.profile.imageType = imageType;

  await user.save();
};

const getSessionIds = async (userId) => {

  const user = (await User.find({ userId: userId }))[0];

  return user.sessions;
};

const wipeUsers = async () => {

  const users = await User.find();

  users.forEach(user => {

    try {

      const filePath = "./db/user-images/" + user.userId;
      fs.unlinkSync(filePath + "/" + user.profile.imageId + "." + user.profile.imageType);
      fs.rmdirSync(filePath);

    } catch (err) {
      console.log(err);
    }
  });

  const result = await User.deleteMany({});
  return result.deletedCount;
};

const isDuplicateId = async (id) => {

  const userIds = await User.find().select("userId");

  for (let i = 0; i < userIds.length; i++) {
    if (userIds[i].userId === id) { return true; }
  }

  return false;
};

module.exports = {
  createUser: createUser,
  checkEmailExists: checkEmailExists,
  checkUserIdExists: checkUserIdExists,
  checkDisplayNameExists: checkDisplayNameExists,
  verifyPassword: verifyPassword,
  getUser: getUser,
  getUserId: getUserId,
  getPassword: getPassword,
  getPlayerProfile: getPlayerProfile,
  savePlayerProfile: savePlayerProfile,
  getProfileImageName: getProfileImageName,
  updateProfileImage: updateProfileImage,
  getSessionIds: getSessionIds,
  wipeUsers: wipeUsers,
  isDuplicateId: isDuplicateId
};
