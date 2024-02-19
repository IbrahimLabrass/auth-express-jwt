
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // don't forget to  install  
const authRoutes = require('./routes/authRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/authapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



// Middleware pour parser le JSON
app.use(bodyParser.json());



// Utilisation des routes d'authentification
app.use('/auth', authRoutes);



// Démarrage du serveur
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
