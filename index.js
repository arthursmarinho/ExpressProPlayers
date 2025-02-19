require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("✅ MongoDB conectado com sucesso!"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.use(session({
  secret: process.env.SESSION_SECRET || "segredo_super_secreto",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

const homeRoute = require("./routes/home");
app.use("/", homeRoute);

const playersRoute = require("./routes/proplayers");
app.use("/proplayers", playersRoute);

const aboutplayerRoutes = require("./routes/aboutplayer");
app.use("/aboutplayer", aboutplayerRoutes);

const teamsRoute = require("./routes/teams");
app.use("/teams", teamsRoute);

const aboutusRoute = require("./routes/aboutus");
app.use("/aboutus", aboutusRoute);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

module.exports = app;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
});
