const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  imageId: {
    type: String,
    required: true
  },

  imageType: {
    type: String,
    required: true
  },

  rules: {
    type: String,
    required: false
  },

  weightPreference: {
    type: [Boolean],
    required: false
  },

  age: {
    type: String,
    required: false
  },

  about: {
    type: String,
    required: false,
    maxlength: 3000
  }
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = {
  profileSchema: profileSchema,
  Profile: Profile
};
