require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
serverSelectionTimeoutMS: 5000,
})
.then(() => console.log("✅ MongoDB conectado com sucesso!"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Configuração de sessão
app.use(session({
  secret: process.env.SESSION_SECRET || "segredo_super_secreto",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === "production",  // Ativado apenas em produção
    httpOnly: true, // Impede acesso ao cookie via JavaScript no frontend
    sameSite: "lax" // Permite envio do cookie entre domínios diferentes (tente "none" se necessário)
  }
}));

// Middleware para adicionar informações do usuário à sessão
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Definição das rotas
const homeRoute = require("./routes/home");
app.use("/", homeRoute);

const playersRoute = require("./routes/proplayers");
app.use("/proplayers", playersRoute);

const teamsRoute = require("./routes/teams");
app.use("/teams", teamsRoute);

const aboutRoute = require("./routes/about");
app.use("/about", aboutRoute);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const proplayersApi = require('./routes/api/proplayers'); 
app.use('/api/proplayers', proplayersApi);

const teamsApi = require('./routes/api/teams')
app.use('/api/teams', teamsApi);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
});
