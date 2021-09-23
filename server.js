const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define routes
app.use("/auth", require("./routes/auth"));
app.use("/employee", require("./routes/employee"));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ msg: "Server Running" });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
