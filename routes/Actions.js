const express = require("express");
const router = express.Router()
const connection = require("../conf");

// route Action

router.get("/", (req, res) => {
    // connection à la base de données, et sélection des départements
    connection.query("SELECT * from actions", (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la récupération des actions");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });
  // fin route Action
  
  

  module.exports = router;