//importazione moduli
const express = require("express");
const db = require("../../database/initDb.js");
const router = express.Router();

//get per leggere i dati di containers
router.get('/read',(req,res)=>{
   const rowContainers =  db.prepare(`SELECT * FROM containers`).all();
    res.json(rowContainers)
});

//post per aggiungere un containers
router.post('/add',(req,res)=>{
    const {name} = req.body;
    if(!name || typeof name !== 'string'){
        return res.status(400).json({error:"Errore, formato nome non valido"});
    }else{
        const exist = db.prepare(
            `SELECT name FROM containers WHERE name = ?`
        ).get(name);

        if(exist){
            return res.status(400).json({error:`Il nome ${name} esiste gia`})
        }else{
            db.prepare(`
                INSERT INTO containers (name)
                VALUES (?)`).run(name)
                res.json({ success: true, message: "Containers aggiunto" });
        }
    }
})

module.exports = router;