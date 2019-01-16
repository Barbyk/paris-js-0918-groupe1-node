const express = require("express");
const router = express.Router()
const bcrypt = require('bcrypt');
const connection = require("../conf");
const jwt = require('jsonwebtoken');

// LOGIN ROUTE
router.post('/', (req, res) => {
     
      // connection à la base de données, et sélection des associations
      connection.query('SELECT password from users WHERE id = 1', (err, results) => {
  
        if (err) {

            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            res.status(500).send('Erreur lors de la récupération des users');
        } else {
            if (bcrypt.compareSync(req.body.password, results[0].password)) {

                let token = jwt.sign({ id: 1, username: "admin" }, process.env.SECRET_KEY_JWT, { expiresIn: 129600 }); // Sigining the token
                res.json({
                    sucess: true,
                    err: null,
                    token
                });
            }
            else {
                res.status(401).json({
                    sucess: false,
                    token: null,
                    err: 'Username or password is incorrect'
                });
            }
        
        }

    });

});

module.exports = router;
