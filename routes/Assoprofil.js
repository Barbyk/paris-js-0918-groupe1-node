const express = require("express");
const router = express.Router()
const connection = require("../conf");

//route assoProfil

router.get('/', (req, res) => {

    // connection à la base de données, et sélection des associations
    connection.query('SELECT * from assoprofil WHERE is_visible = 1', (err, results) => {
  
      if (err) {
  
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send('Erreur lors de la récupération des associations');
      } else {
  
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });
  router.get('/:id/actions', (req, res) => {

    // connection à la base de données, et sélection des associations
    connection.query('select a3.name from associations_has_actions a2, actions a3 where a2.assoprofil_id=? AND a2.actions_id=a3.id',req.params.id, (err, results) => {
  
      if (err) {
  
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send('Erreur lors de la récupération des associations');
      } else {
  
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });

  router.post('/',(req,res)=>{
  
    const {actions,name, description, address, logo, social_network_url_1, 
      social_network_url_2, social_network_url_3, phone_number, web_site,
       mail, is_visible, departements_id} = req.body;
  
      // utilisation d'une promesse pour gérer la synchronisation entre les 2 requetes INSERT INTO
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO assoprofil VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?);`, [name, description, address, logo, social_network_url_1, social_network_url_2, social_network_url_3, phone_number, web_site, mail, is_visible, departements_id], (err, results) => {
  
        if (err) {
  
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de l\'insertion des associations');
        } else {
  
          // On retourne l'id du nouvel asso, pour l'utiliser dans la seconde requete
          resolve(results)
        }
  
      })
    }).then((results) => {  // Les actions ci-dessous ne sont executes qu'apres le 1er INSERT INTO
  
      for (let i = 0; i < actions.length; i++) {
        connection.query(`INSERT INTO associations_has_actions VALUES (?,?);`, [results.insertId, actions[i]], (err, results) => {
  
          if (err) {
  
            // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
            res.status(500).send('Erreur lors de l\'insertion des associations avec les actions');
          }
        })
      }
      res.send(`${name} with actions INSERTED`)
    }
    )
  
  });
  
  router.get('/:id', (req, res) => {
  
    // connection à la base de données, et sélection des associations
    connection.query('SELECT * from assoprofil WHERE id=?',req.params.id, (err, results) => {
  
      if (err) {
  
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send('Erreur lors de la récupération des associations');
      } else {
  
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });
  
  
  router.put('/:id', (req, res) => {
    const  { id }  = req.params;     
    const formData = req.body;
  
    connection.query(`UPDATE assoprofil SET ? WHERE id = ?`, [formData,id], err => {
        if (err)
          res.status(500).send('Erreur lors de la mise a jour des associations');
        else console.log(`you modify row number ${id} for ${formData.name}`);
    });
    
  });
  
  //route assoProfil

  module.exports = router;