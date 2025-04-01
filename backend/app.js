require("dotenv").config();
const express = require("express");
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port, ", process.env.PORT);
});
