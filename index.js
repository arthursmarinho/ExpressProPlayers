const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();

const PORT = process.env.PORT || 3000;

// Configurações do Express
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Middleware para processar formulários
app.use(express.json()); // Middleware para processar JSON

// Conectar com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar:", err));

  app.use(session({
    secret: process.env.SESSION_SECRET || "segredo_super_secreto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mudar para true se usar HTTPS
  }));
  
  // Middleware para tornar user disponível em todas as views
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });

// Rotas
const homeRoute = require("./routes/home");
app.use("/", homeRoute);

const playersRoute = require("./routes/proplayers");
app.use("/proplayers", playersRoute);

const teamsRoute = require("./routes/teams");
app.use("/teams", teamsRoute);

const aboutusRoute = require("./routes/aboutus");
app.use("/aboutus", aboutusRoute);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
});