const express = require('express');
const db = require("../../database/initDb.js");
const router = express.Router();

//get per leggere i cassetti
router.get('/read',(req,res)=>{
    const rowDrawers = db.prepare(`
        SELECT * FROM drawers`).all();
        res.json(rowDrawers);
})

//post per inserire un drawers
router.post('/add',(req,res)=>{
    const {container_id,name} = req.body;
    if(!name || !container_id || typeof name !== 'string' || typeof container_id !== 'number'){
        return res.status(400).json({error:"Errore formato dati non valido"})
    }else{
        const exist = db.prepare(`
            SELECT * FROM drawers WHERE name = ?`).get(name);
            if(exist){
                return res.status(400).json({error:`Il nome ${name} esiste gia`})
            }else{
                db.prepare(`
                    INSERT INTO drawers(container_id, name)
                    VALUES (?, ?)`).run(container_id,name);
                    res.json({ success: true, message: "Drawers aggiunto"});
            }
    }
})

module.exports = router;