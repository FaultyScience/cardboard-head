const mongoose = require("mongoose");

const profile = require("./profile");

const userSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },

  password: {
    type: String,
    required: true
  },

  displayName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },

  profile: {
    type: profile.profileSchema,
    required: true
  },

  sessions: {
    type: [mongoose.ObjectId],
    required: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  userSchema: userSchema,
  User: User
};
