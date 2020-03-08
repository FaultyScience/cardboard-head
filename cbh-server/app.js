const express = require("express");
const cors = require("cors");
const http = require("http");

const dbConnect = require("./db/connect");
const root = require("./routes/root");
const login = require("./routes/login");
const signup = require("./routes/signup");
const getProfile = require("./routes/getProfile");
const getUserImage = require("./routes/getUserImage");
const uploadImage = require("./routes/uploadImage");
const saveProfile = require("./routes/saveProfile");
const postGame = require("./routes/postGame");
const getScheduledGames = require("./routes/getScheduledGames");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", root);
app.use("/api", login);
app.use("/api", signup);
app.use("/api", getProfile);
app.use("/api", getUserImage);
app.use("/api", uploadImage);
app.use("/api", saveProfile);
app.use("/api", postGame);
app.use("/api", getScheduledGames);

dbConnect();

const port = 80;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

server.setTimeout(9000000);
