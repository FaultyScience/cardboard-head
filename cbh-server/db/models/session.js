const mongoose = require("mongoose");
const userSchema = require("./user").userSchema;

const sessionSchema = new mongoose.Schema({

  id: {
    type: mongoose.ObjectId,
    required: true
  },

  game: {
    type: String,
    required: true
  },

  host: {
    type: userSchema,
    required: true
  },

  hostEmail: {
    type: String,
    required: true
  },

  setting: {
    type: String,
    required: true
  },

  platform: {
    type: String,
    required: false
  },

  server: {
    type: String,
    required: false
  },

  password: {
    type: String,
    required: false
  },

  discordLink: {
    type: String,
    required: false
  },

  neighborhood: {
    type: String,
    required: false
  },

  city: {
    type: String,
    required: false
  },

  state: {
    type: String,
    required: false
  },

  country: {
    type: String,
    required: false
  },

  address: {
    type: String,
    required: false
  },

  locationNotes: {
    type: String,
    required: false
  },

  unixUtc: {
    type: Number,
    required: true
  },

  comments: {
    type: String,
    required: false
  },

  totalNumberOfPlayers: {
    type: Number,
    required: true
  },

  openSpots: {
    type: Number,
    required: true
  },

  lengthInHours: {
    type: String,
    required: true
  },

  participantEmails: {
    type: [String],
    required: true
  },

  participantNames: {
    type: [String],
    required: true
  },

  pendingEmails: {
    type: [String],
    required: true
  },

  full: {
    type: Boolean,
    required: true
  },

  expired: {
    type: Boolean,
    required: true
  }
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
