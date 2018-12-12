const express = require("express");
const router = express.Router()
const connection = require("../conf");

// route Events

router.get("/", (req, res) => {
    // connection à la base de données, et sélection des associations
    connection.query("SELECT * from events", (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la récupération des événements");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });
  
  // Route pour ajouter des événements
  router.post("/", (req, res) => {
    const {
      title,
      description,
      begin_date,
      end_date,
      begin_hour,
      end_hour,
      is_active,
      users_id,
      locations_id
    } = req.body;
    //console.log(assoName, assoLogo, req.body);
  
    //if (!title) return;
    connection.query(
      `INSERT INTO events VALUES (NULL,?,?,?,?,?,?,?,?,?);`,
      [
        title,
        description,
        begin_date,
        end_date,
        begin_hour,
        end_hour,
        is_active,
        users_id,
        locations_id
      ],
      (err, results) => {
        if (err) {
          //res.status(500).send("Erreur lors de l'insertion des événements");
          res.send(err)
        } else {
          console.log(`INSERTED`);
          res.json(results);
        }
      }
    );
  });
  
  //Modification des événements en fonction de l'id
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const NewEventTitle = req.body.title;
    const NewEventDescription = req.body.description;
    const NewEventBegin_date = req.body.begin_date;
    const NewEventEnd_date = req.body.end_date;
    const NewEventBegin_hour = req.body.begin_hour;
    const NewEventEnd_hour = req.body.end_hour;
    const NewEventIs_active = req.body.is_active;
    const NewEventUsers_id = req.body.users_id;
    const NewEventLocation_id = req.body.locations_id;
  
    //if (!NewAssoName) return;
    connection.query(
      `UPDATE events SET title = ?, description = ?, begin_date = ?, end_date = ?, begin_hour = ?, end_hour = ?, is_active = ?,
      users_id = ?, locations_id = ? WHERE id = ?`,
      [
        NewEventTitle,
        NewEventDescription,
        NewEventBegin_date,
        NewEventEnd_date,
        NewEventBegin_hour,
        NewEventEnd_hour,
        NewEventIs_active,
        NewEventUsers_id,
        NewEventLocation_id,
        id
      ],
      (err, results) => {
        if (err) {
          res.json(err);
          //res.status(500).send("Erreur lors de la modification des événements");
        } else {
          console.log(`INSERTED`);
          res.json(results);
        }
      }
    );
  });
  
  // Route pour récupérer les events par id
  
  router.get("/:id", (req, res) => {
    // connection à la base de données
    connection.query(
      "SELECT * from events WHERE id=?",
      req.params.id,
      (err, results) => {
        if (err) {
          res.json(err);
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send("Erreur lors de la récupération des événements");
        } else {
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          res.json(results);
        }
      }
    );
  });
  // fin route Events

  module.exports = router;