
const express = require("express");
const app = express();
const port = 3003;
const connection = require("./conf");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
  const { images, text, title, date, Is_active,/* users_id */ } = req.body;
  console.log(images, text, title, date, Is_active);

  if (!title) return;//nb demander quel champ est obligatoire 
  connection.query(
    'INSERT INTO news (images,text,title,date,Is_active,users_id) VALUES(?,?,?,?,?,1)',
    [images, text, title, date, Is_active,/* users_id */],
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
  const { images, text, title, date, Is_active,/* users_id */ } = req.body;



  connection.query(
    `UPDATE news SET images = ? ,text=? , title=?, date=?, Is_active=? , users_id=1  WHERE id = ?`,
    [images, text, title, date, Is_active/* ,users_id  */, id],
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

// Route locations

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
  const { name, longitude, latitude, image_url/* , departements_id */ } = req.body;
  console.log(name, longitude, latitude, image_url/* , departements_id */);

  if (!name) return;//nb demander quel champ est obligatoire 
  connection.query(
    'INSERT INTO locations (name, longitude, latitude, image_url, departements_id) VALUES(?,?,?,?,1)',
    [name, longitude, latitude, image_url/* ,departements_id  */],
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
  const { name, longitude, latitude, image_url/* ,departements_id  */ } = req.body;



  connection.query(
    `UPDATE locations SET name=?, longitude=?, latitude=?, image_url=? WHERE id = ?`,
    [name, longitude, latitude, image_url/* ,departements_id  */, id],
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
// Fin de route location

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
