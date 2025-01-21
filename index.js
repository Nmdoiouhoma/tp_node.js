// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = process.env.PORT || 80;

const { UserController } = require('./controller/userController');
const { Database } = require('./config/database')

// Middleware pour analyser les corps de requêtes en JSON
app.use(cors());
app.use(bodyParser.json());

app.use(UserController)
// Route GET pour récupérer des utilisateur 
const syncDb = async () => {
  await sequelize.sync({ alter: true });
};
syncDb();

