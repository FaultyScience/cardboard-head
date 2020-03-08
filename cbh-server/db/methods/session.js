const mongoose = require("mongoose");

const Session = require("../models/session");
const User = require("../models/user").User;
const userMethods = require("./user");

const createSession = async (userId, game, totalNumberOfPlayers, openSpots,
  setting, platform, server, password, discordLink, neighborhood, city, state,
  country, address, locationNotes, unixUtc, lengthInHours, comments,
  isExpired) => {

  if (!userMethods.checkUserIdExists(userId)) return;
  const user = await userMethods.getUser(userId);

  const session = new Session({
    id: new mongoose.Types.ObjectId(),
    game: game,
    totalNumberOfPlayers: totalNumberOfPlayers,
    openSpots: openSpots,
    host: user,
    hostEmail: user.email,
    setting: setting,
    platform: platform,
    server: server,
    password: password,
    discordLink: discordLink,
    neighborhood: neighborhood,
    city: city,
    state: state,
    country: country,
    address: address,
    locationNotes: locationNotes,
    unixUtc: unixUtc,
    lengthInHours: lengthInHours,
    comments: comments,
    participantEmails: [user.email],
    participantNames: [user.displayName],
    pendingEmails: [],
    full: false,
    expired: isExpired
  });

  user.sessions.push(session.id);

  const userResult = await user.save();
  const result = await session.save();

  return result;
};

const getSession = async (sessionId) => {

  const session = (await Session.findById(sessionId))[0];
  return session;
};

const getSessions = async (sessionIds, sortBy) => {

  const sessions = (await Session.find({ id: { $in: sessionIds } }).sort(sortBy));

  return sessions;
};

const wipeSessions = async () => {

  const sessions = await Session.find();

  const result = await Session.deleteMany({});
  return result.deletedCount;
};

module.exports = {
  createSession: createSession,
  getSession: getSession,
  getSessions: getSessions,
  wipeSessions: wipeSessions
};
