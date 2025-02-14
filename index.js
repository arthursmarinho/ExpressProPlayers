const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public")); 

  const homeRoute = require("./routes/home");
app.use("/", homeRoute);

const playersRoute = require("./routes/proplayers");
app.use("/proplayers", playersRoute);

const teamsRoute = require("./routes/teams");
app.use("/teams", teamsRoute);

const aboutusRoute = require("./routes/aboutus");
app.use("/aboutus", aboutusRoute);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
});
