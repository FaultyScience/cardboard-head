const CODE_MAP = {
  900: "Login successful",
  904: "Email or password is incorrect",
  905: "Login failed: internal server error",
  910: "Signup successful",
  911: "An account with that email already exists",
  915: "Signup failed: internal server error",
  800: "Player profile retrieved",
  804: "Could not get player profile: user ID does not exist",
  805: "Could not get player profile: internal server error",
  700: "Image retrieved",
  704: "Could not get image: user ID does not exist",
  705: "Could not get image: internal server error",
  600: "Image uploaded",
  604: "Could not upload image: user ID does not exist",
  605: "Could not upload image: internal server error",
  500: "Profile saved",
  504: "Could not save profile: user ID does not exist",
  505: "Could not save profile: internal server error",
  400: "Game posted",
  404: "Could not post game: user ID does not exist",
  405: "Could not post game: internal server error",
  300: "Scheduled games retrieved",
  304: "Could not get scheduled games: user ID does not exist",
  305: "Could not get scheduled games: internal server error"
};

export default CODE_MAP;
