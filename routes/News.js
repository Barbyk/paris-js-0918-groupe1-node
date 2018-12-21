const express = require("express");
const router = express.Router()
const connection = require("../conf");

//route news
router.get('/', (req, res) => {
    connection.query("SELECT * FROM news WHERE is_active=1", (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récuperation des news')
      } else {
        res.json(results);
        console.log(results);
        
      }
    })
  });
  
  router.post('/', (req, res) => {
    const { img_url, text, title, date, is_active,/* users_id */ } = req.body;
  
    //if (!title) return;//nb demander quel champ est obligatoire 
    connection.query(
      'INSERT INTO news (img_url,text,title,date,is_active,users_id) VALUES(?,?,?,?,?,1)',
      [img_url, text, title, date, is_active,/* users_id */],
      (err, result) => {
        if (err) {
          res.status(500).send('Erreur lors de la récuperation des news')
        } else {
          res.json(result)
        }
      }
    );
  });
  
  router.get("/:id", (req, res) => {
    // connection à la base de données, et sélection des associations
    connection.query(
      "SELECT * from news WHERE id=?",
      req.params.id,
      (err, results) => {
        if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send("Erreur lors de la récupération des news");
        } else {
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
      }
    );
  });
  
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { img_url, text, title, date, is_active,/* users_id */ } = req.body;
  
  
  
    connection.query(
      `UPDATE news SET img_url = ? ,text=? , title=?, date=?, is_active=? , users_id=1  WHERE id = ?`,
      [img_url, text, title, date, is_active/* ,users_id  */, id],
      (err, results) => {
        if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send("Erreur lors de la modification de la news");
          console.log(err,results);
          
          
  
        } else {
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
      }
    );
  });
  
  // Fin de route news
  
  module.exports = router;