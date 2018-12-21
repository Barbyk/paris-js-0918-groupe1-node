const express = require("express");
const router = express.Router()
const connection = require("../conf");

//route assoProfil

router.get('/', (req, res) => {

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


router.post('/', (req, res) => {

  const { actions, name, description, address, logo, social_network_url_1,
    social_network_url_2, social_network_url_3, phone_number, web_site,
    mail, is_visible, departements_id } = req.body;

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

  new Promise((resolve, reject) => {

    // connection à la base de données, et sélection des associations
    connection.query('SELECT * from assoprofil WHERE id = ?', req.params.id, (err, results) => {

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
    connection.query('select a1.id id, JSON_ARRAYAGG(a3.id) actions from assoprofil a1, associations_has_actions a2, actions a3 where a1.id=a2.assoprofil_id and a1.id=? and a2.actions_id=a3.id group by ID', req.params.id, (err, results2) => {

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
          if (x.actions) x.actions = shouldParse(x.actions)
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

// filtré par departement
router.get('/filterbydept/:id', (req, res) => {

  new Promise((resolve, reject) => {

    // connection à la base de données, et sélection des associations
    connection.query('SELECT * from assoprofil WHERE departements_id = ?', req.params.id, (err, results) => {

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
    connection.query('select a1.id id, JSON_ARRAYAGG(a3.id) actions from assoprofil a1, associations_has_actions a2, actions a3 where a1.id=a2.assoprofil_id and a1.id=? and a2.actions_id=a3.id group by ID', req.params.id, (err, results2) => {

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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, address, logo, social_network_url_1,
    social_network_url_2, social_network_url_3, phone_number, web_site,
    mail, is_visible, departements_id } = req.body;
  const p1 = new Promise((resolve, reject) => {

    connection.query(`UPDATE assoprofil SET name=?, description=?,address=?,logo=?,social_network_url_1=?,social_network_url_2=?,social_network_url_3=?,phone_number=?,web_site=?,mail=?,is_visible=?,departements_id=? WHERE id = ?`, [name, description, address, logo, social_network_url_1, social_network_url_2, social_network_url_3, phone_number, web_site, mail, is_visible, departements_id, id], (err, results) => {
      if (err)
        //res.status(500).send('Erreur lors de la mise a jour des associations');
        reject(err)
      else resolve(results)
    });

  })
  const p2 = new Promise((resolve, reject) => {
    for (let i = 0; i < req.body.actions.length; i++) {
      connection.query(`INSERT IGNORE INTO associations_has_actions VALUES (?,?)`, [req.params.id, req.body.actions[i]], (err, results2) => {
        if (err) {
          reject(err)
        }
      });
    }
    resolve(results1)
  })
  const p3 = new Promise((resolve, reject) => {
    let query = "";
    if (req.body.actions.length === 0)
      query = `DELETE FROM associations_has_actions WHERE assoprofil_id=?`
    else query = `DELETE FROM associations_has_actions WHERE assoprofil_id=? AND actions_id NOT IN ? `

    connection.query(query, [id, [req.body.actions]], (err, results3) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(results3)
      }
    });
  })
  Promise.all([p1, p2, p3]).then((resu) => res.send(resu)).catch((err) => { res.send(err) })
})


//route assoProfil

module.exports = router;