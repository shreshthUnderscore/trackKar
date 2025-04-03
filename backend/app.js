require("dotenv").config();
const express = require("express");
const cors = require("cors");
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const transactionsRouter = require("./routers/transactionRouter");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/transactions", transactionsRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port, ", process.env.PORT);
});
