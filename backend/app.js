require("dotenv").config();
const express = require("express");
const signupRouter = require("./routers/signupRouter");
const app = express();

app.use("/signup", signupRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port, ", process.env.PORT);
});
