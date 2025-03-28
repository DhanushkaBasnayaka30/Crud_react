// import express from 'express';
// import mysql from 'mysql';
// import cors from 'cors';

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

app.listen(8082,() =>{
    console.log("Running...");
})
const db = mysql.createConnection({
    host: "localhost",
    password:"",
    user: "root",
    database: "reactcrud"

})
app.get('/',(req,res) =>{
    const sql = "SELECT * FROM student";
    db.query(sql,(err,result) =>{
        if(err){
            return res.json({Message:"ERROR inside server"});
        }
        return res.json(result);
        
    })
})
app.post('/create',(req,res) =>{
    const sql = "INSERT INTO student (`name`,`email`) VALUES(?)";
    console.log(req.body)
    const values =[
    req.body.name,
    req.body.email
]

db.query(sql,[values],(err,result) =>{
    if(err){
        return res.json(err);
    }
    else{
        return res.json(result);
    }
})
})


app.get('/read/:id',(req,res) =>{
  const id =req.params.id;
    const sql = "SELECT * FROM student WHERE id =?";
    db.query(sql,[id],(err,result) =>{
        if(err){
            return res.json({Message:"ERROR inside server"});
        }
        return res.json(result);
        
    })
})

app.get('/edit/:id',(req,res) =>{
  const id =req.params.id;
    const sql = "SELECT * FROM student WHERE id =?";
    db.query(sql,[id],(err,result) =>{
        if(err){
            return res.json({Message:"ERROR inside server"});
        }
        return res.json(result);
        
    })
})

app.put('/edit/:id', (req, res) => {
  const id = req.params.id;

  const sql = "UPDATE student SET name=?, email=? WHERE id=?";
  const values = [req.body.name, req.body.email, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});


app.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM student WHERE id=?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});

