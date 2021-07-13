const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3030;

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const contactsRouter = require("../routes/api/contactRouter");
const userRouter = require("../routes/api/userRouter");
const avatarsRouter = require("../routes/api/avatarRouter");
const { connectMongo } = require("../db/connections");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);
app.use("/api/avatars", avatarsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const start = async () => {
  try {
    await connectMongo();
  } catch (error) {}
};
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch:", err);
    process.exit(1);
  }
  console.log(`Database connection successful. Use our API on port: ${PORT}`);
});

start();
