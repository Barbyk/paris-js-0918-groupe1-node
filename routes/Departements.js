const express = require("express");
const router = express.Router()
const connection = require("../conf");


// route Departements

router.get("/", (req, res) => {
    // connection à la base de données, et sélection des départements
    connection.query("SELECT * from departements", (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la récupération des départements");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });
  // fin route Departements
  
  module.exports = router;