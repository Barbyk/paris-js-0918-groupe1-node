
const express = require("express");
const path = require("path");
const app = express();
const port = 3002;
const connection = require("./conf");
const bodyParser = require("body-parser");
const exjwt = require('express-jwt');
const cors = require("cors");
const assoProfil = require("./routes/Assoprofil")
const actions = require("./routes/Actions")
const departements = require("./routes/Departements")
const events = require("./routes/Events")
const locations = require("./routes/Locations")
const news = require("./routes/News")
const login = require("./routes/Login")
const publicRoute = require("./routes/PublicRoute")
const jwt = require("./jwt")
require('dotenv').config()

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", publicRoute)

app.use(jwt())
// Error handling 
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
      res.status(401).send(err);
  }
  else {
      next(err);
  }
});
app.use("/assoProfil", assoProfil)
app.use("/actions", actions)
app.use("/login", login)
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
