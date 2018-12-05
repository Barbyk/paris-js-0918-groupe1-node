
const express = require("express");
const app = express();
const port = 3002;
const connection = require("./conf");
const bodyParser = require("body-parser");
const cors = require("cors");
const assoProfil = require("./routes/Assoprofil")
const actions = require("./routes/Actions")
const departements = require("./routes/Departements")
const events = require("./routes/Events")
const locations = require("./routes/Locations")
const news = require("./routes/News")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/assoProfil", assoProfil)
app.use("/actions", actions)
app.use("/departements", departements)
app.use("/events", events)
app.use("/locations", locations)
app.use("/news", news)

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
