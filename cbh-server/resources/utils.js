const crypto = require("crypto");

const c = require("./constants");

const randomString = (length) => {

  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const createKey = (pw, salt, len) => {

  const key = crypto.scryptSync(pw, salt, len);
  return key;
};

const createBytes = (num) => {
  return crypto.randomBytes(num).toString("hex");
};

const ePw = (pw) => {

  const cipher = crypto.createCipheriv("aes-192-cbc", c.BULK_STRING_4, c.BULK_STRING_3);

  let encrypted = cipher.update(pw, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

const dPw = (pw) => {

  const decipher = crypto.createDecipheriv("aes-192-cbc", c.BULK_STRING_4, c.BULK_STRING_3);

  let decrypted = decipher.update(pw, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

const generateUserId = () => {
  return Math.random().toString(36).substr(2, 9);
};

module.exports = {
  randomString: randomString,
  createKey: createKey,
  createBytes: createBytes,
  ePw: ePw,
  dPw: dPw,
  generateUserId: generateUserId
};
