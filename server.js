const app = require("./app");
const dotenv = require("dotenv");
const connectDb = require("./Config/db");
// HANDLE UNCAUGHT EXEPTIONS
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exeption");
  process.exit(1);
});
// SETTING UP CONFIG FILE
dotenv.config({ path: "Config/config.env" });

// CONNECTING TO DATABASE
connectDb();

let Server = app.listen(process.env.PORT, () => {
  console.log(
    `Server Running on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
// HANDLE UNHANDLED PROMISE REJECTIONS
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(
    "Shuttibg down the server because of Unhandled Promise rejection!"
  );
  Server.close(() => {
    process.exit(1);
  });
});
