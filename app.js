
const express = require("express");
const app = express();
const port = 3029;
const connection = require("./conf");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//route assoProfil

app.get('/assoprofil', (req, res) => {

  // connection à la base de données, et sélection des associations
  connection.query('SELECT * from assoprofil', (err, results) => {

    if (err) {

      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des associations');
    } else {

      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

app.post('/assoprofil',(req,res)=>{

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
      connection.query(`INSERT INTO associations_has_actions VALUES (?,?);`, [results.insertId, actions[i].actions_id], (err, results) => {

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

app.get('/assoprofil/:id', (req, res) => {

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


app.put('/assoprofil/:id', (req, res) => {
  const  { id }  = req.params;     
  const { name, description, address, logo, social_network_url_1, 
    social_network_url_2, social_network_url_3, phone_number, web_site, 
    mail, is_visible, departements_id } = req.body;

  connection.query(`UPDATE assoprofil SET name = ? WHERE id = ?`, [name, description, address, logo, social_network_url_1, social_network_url_2, social_network_url_3, phone_number, web_site, mail, is_visible, departements_id], err => {
      if (err) throw err;
      console.log(`you modify row number ${id} for ${name}`);
  });
  
});

//route assoProfil

// route Action

app.get("/actions", (req, res) => {
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

// route Location

app.get('/locations', (req, res) => {
  connection.query("SELECT * FROM locations;", (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récuperation des news')
    } else {
      res.json(results)
    }
  })
});

app.post('/locations', (req, res) => {
  const { name, longitude, latitude, image_url, is_active, departements_id, } = req.body;

  if (!name) return;//nb demander quel champ est obligatoire 
  connection.query(
    'INSERT INTO locations (name, longitude, latitude, image_url,is_active , departements_id) VALUES(?,?,?,?,?,?)',
    [name, longitude, latitude, image_url,is_active, departements_id],
    (err, result) => {
      if (err) {
        res.status(500).send('Erreur lors de la récuperation des lieux')
      } else {
        res.json(result)
      }
    }
  );
});

app.get("/locations/:id", (req, res) => {
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

app.put("/locations/:id", (req, res) => {
  const { id } = req.params;
  const { name, longitude, latitude, image_url, is_active, departements_id } = req.body;



  connection.query(
    `UPDATE locations SET name=?, longitude=?, latitude=?, image_url=? is_active=? WHERE id = ?`,
    [name, longitude, latitude, image_url, is_active, departements_id, id],
    (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la modification du lieux");

      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    }
  );
});
// fin route Location

// route Events

app.get("/events", (req, res) => {
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
app.post("/events", (req, res) => {
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
        console.log(`INSERTED`);
        res.json(results);
      }
    }
  );
});

//Modification des événements en fonction de l'id
app.put("/events/:id", (req, res) => {
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

app.get("/events/:id", (req, res) => {
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

// route Departements

app.get("/departements", (req, res) => {
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

//route news

app.get('/news', (req, res) => {
  connection.query("SELECT * FROM news;", (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récuperation des news')
    } else {
      res.json(results)
    }
  })
});

app.post('/news', (req, res) => {
  const { img_url, text, title, date, is_active,/* users_id */ } = req.body;

  if (!title) return;//nb demander quel champ est obligatoire 
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

app.get("/news/:id", (req, res) => {
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

app.put("/news/:id", (req, res) => {
  const { id } = req.params;
  const { img_url, text, title, date, is_active,/* users_id */ } = req.body;



  connection.query(
    `UPDATE news SET img_url = ? ,text=? , title=?, date=?, is_active=? , users_id=1  WHERE id = ?`,
    [img_url, text, title, date, is_active/* ,users_id  */, id],
    (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Erreur lors de la modification de la news");

      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    }
  );
});

// Fin de route news


app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
