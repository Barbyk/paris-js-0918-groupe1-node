const express = require("express");
const router = express.Router()
const connection = require("../conf");



router.get('/assoprofil', (req, res) => {

    new Promise((resolve, reject) => {
  
      // connection à la base de données, et sélection des associations
      connection.query('SELECT * from assoprofil WHERE is_visible = 1', (err, results) => {
  
        if (err) {
  
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des associations');
        } else {
  
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          resolve(results);
        }
      })
    }).then((results1) => {
  
      // connection à la base de données, et sélection des associations
      connection.query('select a1.id id, JSON_ARRAYAGG(a3.id) actions from assoprofil a1, associations_has_actions a2, actions a3 where a1.id=a2.assoprofil_id and a2.actions_id=a3.id group by ID', (err, results2) => {
  
        if (err) {
  
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des associations');
        } else {
  
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          const mergedList = results1.concat(results2).reduce((acc, x) => {
            acc[x.id] = Object.assign(acc[x.id] || {}, x);
            return acc;
          }, {});
          res.json(Object.values(mergedList));
        }
      });
    }
    );
  });
  
// filtré par departement
router.get('/assoprofil/filterbydept/:id', (req, res) => {

    new Promise((resolve, reject) => {
  
      // connection à la base de données, et sélection des associations
      connection.query('SELECT * from assoprofil WHERE departements_id = ? AND is_visible = 1', req.params.id, (err, results) => {
  
        if (err) {
  
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des associations');
        } else {
  
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          resolve(results);
        }
      })
    }).then((results1) => {
  
      // connection à la base de données, et sélection des associations
      connection.query('select a1.id id, JSON_ARRAYAGG(a3.id) actions from assoprofil a1, associations_has_actions a2, actions a3 where a1.id IN (SELECT id from assoprofil WHERE departements_id = ?) and a1.id=a2.assoprofil_id and a2.actions_id=a3.id group by ID', req.params.id, (err, results2) => {
        if (err) {
  
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des associations');
        } else {
          const shouldParse = (el) => {
            if (!Array.isArray(el)){
              return JSON.parse(el)
            }else{
              return el
            }
          }
  
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          const mergedList = results1.concat(results2).reduce((acc, x) => {
            if (x.actions) x.actions =  shouldParse(x.actions)
            acc[x.id] = Object.assign(acc[x.id] || {}, x);
            return acc;
          }, {});
          //console.log(results2)
          res.json(Object.values(mergedList));
        }
      });
    }
    );
  });
  
  
  
  // filtré par action
  router.get('/assoprofil/filterbyaction/:id', (req, res) => {
  
    new Promise((resolve, reject) => {
  
      // connection à la base de données, et sélection des associations
      connection.query('SELECT * from assoprofil a1, associations_has_actions a2 WHERE a2.actions_id=? AND a1.id=a2.assoprofil_id AND is_visible = 1', req.params.id, (err, results) => {
  
        if (err) {
  
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des associations');
        } else {
  
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          resolve(results);
        }
      })
    }).then((results1) => {
        // connection à la base de données, et sélection des associations
        connection.query('select a1.id id, JSON_ARRAYAGG(a3.id) actions from assoprofil a1, associations_has_actions a2, actions a3 where a1.id IN (SELECT a1.id from assoprofil a1, associations_has_actions a2 WHERE a2.actions_id=? AND a1.id=a2.assoprofil_id AND is_visible = 1) and a1.id=a2.assoprofil_id and a2.actions_id=a3.id group by ID', req.params.id, (err, results2) => {
        if (err) {
  
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          res.status(500).send('Erreur lors de la récupération des associations');
        } else {
          const shouldParse = (el) => {
            if (!Array.isArray(el)){
              return JSON.parse(el)
            }else{
              return el
            }
          }
  
          // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
          const mergedList = results1.concat(results2).reduce((acc, x) => {
            if (x.actions) x.actions =  shouldParse(x.actions)
            acc[x.id] = Object.assign(acc[x.id] || {}, x);
            return acc;
          }, {});
          //console.log(results2)
          res.json(Object.values(mergedList));
        }
      });
    }
    );
  });

//route news
router.get('/news', (req, res) => {
    connection.query("SELECT * FROM news WHERE is_active=1", (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récuperation des news')
      } else {
        res.json(results);
       
      }
    })
  });
  

  
  
  // Fin de route news

  router.get("/actions", (req, res) => {
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

  router.get('/locations', (req, res) => {
    connection.query("SELECT * FROM locations WHERE is_active=1;", (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récuperation des news')
      } else {
        res.json(results)
      }
    })
  });

  // route Events

router.get("/events", (req, res) => {
    // connection à la base de données, et sélection des associations
    connection.query("SELECT `id`, `title`, `description`, `begin_date` as start, `end_date` as end, `begin_hour`, `end_hour`, `is_active`, `users_id`, `locations_id` FROM `events` WHERE is_active = 1", (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.json(err);
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });

  router.get("/events/location/:locationsid", (req, res) => {
    // connection à la base de données, et sélection des associations
    connection.query("SELECT `id`, `title`, `description`, `begin_date` as start, `end_date` as end, `begin_hour`, `end_hour`, `is_active`, `users_id`, `locations_id` FROM `events` WHERE is_active = 1 AND locations_id = ?", req.params.locationsid, (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la récupération des événements");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });
  
  router.post("/events/multiplelocations", (req, res) => {
    if (!req.body.id) res.json("[]")
    else {
    const ids = req.body.id
    // connection à la base de données, et sélection des associations
    connection.query("SELECT `id`, `title`, `description`, `begin_date` as start, `end_date` as end, `begin_hour`, `end_hour`, `is_active`, `users_id`, `locations_id` FROM `events` WHERE is_active = 1 AND locations_id IN (?)", [ids], (err, results) => {
      if (err) {

        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la récupération des événements");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  }
  });

  // Route pour ajouter des événements
  router.post("/events", (req, res) => {
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
          res.status(500).send("Erreur lors de l'insertion des événements");
        } else {
          res.json(results);
        }
      }
    );
  });
  
  //Modification des événements en fonction de l'id
  router.put("/events/:id", (req, res) => {
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
          res.status(500).send("Erreur lors de la modification des événements");
        } else {
          res.json(results);
        }
      }
    );
  });
  
  // Route pour récupérer les events par id
  
  router.get("/events/:id", (req, res) => {
    // connection à la base de données
    connection.query(
      "SELECT * from events WHERE id=?",
      req.params.id,
      (err, results) => {
        if (err) {
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
