
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



// Route d'inscription
router.post('/register', async (req, res) => {
    try {

        // Hashage du mot de passe avant de le sauvegarder

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({

            username: req.body.username,
            email: req.body.email,
            password: hashedPassword

        });

        // Sauvegarde de l'utilisateur dans la base de données

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




// Route de connexion
router.post('/login', async (req, res) => {
    try {
        // Recherche de l'utilisateur dans la base de données

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Vérification du mot de passe

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Génération du token JWT

        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
