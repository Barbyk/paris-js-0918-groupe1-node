const express = require('express');
const app = express();
const port = 3002;
const connection = require('./conf');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/asso', (req, res) => {

    // connection à la base de données, et sélection des associations
    connection.query('SELECT * from Associations', (err, results) => {
  
      if (err) {
  
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send('Erreur lors de la récupération des associations');
      } else {
  
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });


  app.post('/asso',(req,res)=>{
    const {assoName,assoLogo} = req.body;
    console.log(assoName,assoLogo,req.body);
    
    if(!assoName) return ;
    connection.query(`INSERT INTO Associations (name,logo,Departement_idDepartement) VALUES (?,?,1);`,[assoName,assoLogo], err => {
      if (err) throw err;
      console.log(`${assoName} INSERTED`)
    })
  });


  app.get('/asso/:id', (req, res) => {

    // connection à la base de données, et sélection des associations
    connection.query('SELECT * from Associations WHERE idAssociation=?',req.params.id, (err, results) => {
  
      if (err) {
  
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send('Erreur lors de la récupération des associations');
      } else {
  
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    });
  });


  app.put('/asso/:id', (req, res) => {
    const  { id }  = req.params;     
    const NewAssoName = req.body.newName;
    console.log(id,NewAssoName);

    if (!NewAssoName) return;
    connection.query(`UPDATE Associations SET name = ? WHERE idAssociation = ?`, [NewAssoName, id], err => {
        if (err) throw err;
        console.log(`you modify row number ${id} for ${NewAssoName}`);
    });
  });
  
  

  app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad happened...');
    }
  
    console.log(`Server is listening on ${port}`);
  });