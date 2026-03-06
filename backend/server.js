const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/users", require("./routes/users"));

app.listen(port, async () => {
  await connectDB();
  console.log(`Server listening at http://localhost:${port}`);
});
