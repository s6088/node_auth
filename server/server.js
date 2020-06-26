import express from "express";
import Cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import helmet from "helmet";

//sudo kill -9 `sudo lsof -t -i:9001`
const app = express();

const API_PORT = process.env.API_PORT || 5000;

require("./config/passport");

const whitelist = ["http://localhost:3000", "http://localhost:5000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(Cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(passport.initialize());

require("./routes/loginUser")(app);
require("./routes/registerUser")(app);
require("./routes/forgotPassword")(app);
require("./routes/resetPassword")(app);
require("./routes/updatePassword")(app);
require("./routes/updatePasswordViaEmail")(app);
require("./routes/findUsers")(app);
require("./routes/deleteUser")(app);
require("./routes/updateUser")(app);

// eslint-disable-next-line no-console
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;
