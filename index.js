require("dotenv").config(); 

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cocktailsRoutes = require("./routes/cocktails");
const sequelize = require("./database");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const verifyToken = require("./middlewares/auth");
const jwt = require("jsonwebtoken");

const app = express();

// Importation et initialisation du modèle
const Cocktail = require("./models/cocktail")(sequelize, Sequelize.DataTypes);
const User = require("./models/user")(sequelize, Sequelize.DataTypes);


const saltRounds = 10;

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/cocktails", verifyToken, cocktailsRoutes);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);

  try {
    const user = await User.create({
      username: name,
      email: email,
      password: hash,
    });
    res.status(200).json({ Status: "Success", userId: user.id });
  } catch (err) {
    console.error("Error inserting data in server:", err);
    res.status(500).json({ Error: "Error inserting data in server" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Email not found." });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };

    const secret = process.env.JWT_SECRET; 

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    // Enregistrement du token dans la base de données avec l'utilisateur
    user.token = token;
    await user.save();

    res.header("Authorization", `Bearer ${token}`).status(200).json({
      Status: "Success",
      userId: user.id,
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (err) {
    console.error("Error during user login:", err);
    res.status(500).json({ Error: "Error during user login." });
  }
});

// Middleware d'erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données établie avec succès.");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données:", err);
  });
