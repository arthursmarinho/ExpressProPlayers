require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const favicon = require('serve-favicon');

const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log("✅ MongoDB conectado com sucesso!"))
    .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.use(session({
    secret: process.env.SESSION_SECRET || "segredo_super_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === "production", 
        httpOnly: true, 
        sameSite: "lax" 
    }
}));

app.use((req, res, next) => {
    if (req.session.userId) {
        res.locals.user = { id: req.session.userId }; 
    } else {
        res.locals.user = null;
    }
    next();
});

const homeRoute = require("./routes/home");
app.use("/", homeRoute);

const playersRoute = require("./routes/proplayers");
app.use("/proplayers", playersRoute);

const teamsRoute = require("./routes/teams");
app.use("/teams", teamsRoute);

const aboutRoute = require("./routes/about");
app.use("/about", aboutRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
});
