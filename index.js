// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 80;



// Middleware pour analyser les corps de requêtes en JSON
app.use(cors());
app.use(bodyParser.json());

// Route GET pour récupérer des utilisateur 
app.get('/users', async (req, res) => {

  try {
    const users = await User.findAll()
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recuperration des utilisateurs' })
  }
}
);

// Route POST pour ajouter un utilisateur
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
  })
  res.status(201).json(user);
});

// Route PATCH pour mettre à jour un utilisateur
app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  // Vous pouvez ici mettre à jour l'utilisateur dans la base de données avec Sequelize
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();

  res.status(200).json(user);
});

// Route DELETE pour supprimer un utilisateur
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  // Vous pouvez ici supprimer l'utilisateur dans la base de données avec Sequelize
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await User.destroy();
  res.status(204).send();
});

// Middleware pour l'authentification (exemple simple)
app.use("*", (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: '401: Not authorized' });
  }
  next();
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});


// Connexion à la base de données avec Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

// Créer un modèle Sequelize pour l'utilisateur
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});


const syncDb = async () => {
  await sequelize.sync({ alter: true });
};
syncDb();


// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('La connexion à la base de données a réussi!');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données :', err);
  });