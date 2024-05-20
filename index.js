const express = require("express");
const cors = require("cors");
const route = require('./route.js')
const { dbConnect } = require("./config.js");
const cookieSession = require('cookie-session')
const helmet = require('helmet')

const app = express();
app.use(cors({ credentials: true, origin: "https://ojs-client.netlify.app" }));
app.use(express.json());

app.use(helmet({
  xFrameOptions: { action: "deny" },
  strictTransportSecurity: {
    maxAge: 86400,
  },
  xPermittedCrossDomainPolicies: {
    permittedPolicies: "none",
  },
}))
// app.use(
//   cookieSession({
//     name: "OJ-session",
//     secret: "bismillahLulusGenap2024",
//     httpOnly: true,
//     sameSite: "none"
//   })
// );

app.use("/",route);

const startServer = async () => {
  try {
    await dbConnect.authenticate();
    console.log("Connection has been established successfully.");
    await dbConnect.sync({ alter: false, force: false });
    app.listen(8006, () => {
      console.log("App is running on port 8006");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

try {
  startServer();
} catch (error) {
  console.error(error);
}
