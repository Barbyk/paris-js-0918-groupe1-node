const express = require("express");
const router = express.Router()
const connection = require("../conf");

// route Location
  
router.get('/', (req, res) => {
    connection.query("SELECT * FROM locations WHERE is_active=1;", (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récuperation des news')
      } else {
        res.json(results)
      }
    })
  });
  
  router.post('/', (req, res) => {
    const { name, longitude, latitude, img_url, is_active, departements_id } = req.body;
  
    connection.query(
      'INSERT INTO locations (name, longitude, latitude, img_url,is_active , departements_id) VALUES(?,?,?,?,?,?)',
  
      [name, longitude, latitude, img_url,is_active, departements_id],
      (err, result) => {
        if (err) {
          res.status(500).send('Erreur lors de la récuperation des lieux')
        } else {
          res.json(result)
          console.log(result);
          
        }
      }
    );
  });


router.get("/:id", (req, res) => {
    // connection à la base de données, et sélection des associations
    connection.query(
      "SELECT * from locations WHERE id=?",
      req.params.id,
      (err, results) => {
        if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send("Erreur lors de la récupération des lieux");
        } else {
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
      }
    );
  });
  
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const formData = req.body
  
  
  
    connection.query(
      `UPDATE locations SET ?  WHERE id = ?`,
      [formData, id],(err,results) => {
        if (err){        
    
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send("Erreur lors de la modification du lieux");
        }
     
  
           else {
             res.json(results)
           }
          
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.;
      }
    );
  });
  // fin route Location

  module.exports = router;