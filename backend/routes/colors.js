const express = require('express');
const db = require('../../database/initDb.js');
const router = express.Router();

//get per leggere tutti i colori
router.get('/read',(req,res)=>{
    const rowColors = db.prepare(`
        SELECT * FROM colors`).all();
        return res.json(rowColors);
});

//post per inserimento colori
router.post('/add',(req,res)=>{
    const {id, name} = req.body;
    if(!id || !name || typeof id !== 'number' || typeof name !== 'string'){
        return res.status(400).json({error:`Errore formato dati non valido`})
    }

    const existId = db.prepare(`
        SELECT * FROM colors WHERE id = ?`).get(id);

        if(existId){
            return res.status(400).json({error:`Attenzione, l' id: ${id} esiste gia`})
        }else{
            db.prepare(`
                INSERT INTO colors(id, name)
                VALUES (?, ?)`).run(id,name);
                res.json({success: true, message: "Colore aggiunto"})
        }
});

module.exports = router;