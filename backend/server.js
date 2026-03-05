const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.use("/api/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
