const express = require('express');
const db = require('../../database/initDb.js');
const router = express.Router();

//get per leggere tutte le parts
router.get('/read',(req,res)=>{
    const rowParts = db.prepare(`
        SELECT * FROM parts`).all();
        return res.json(rowParts);
})
//get per totale parts per card in Home.jsx
router.get('/read/tot',(req,res)=>{
    const rowParts = db.prepare(`
        SELECT COUNT(*) AS total FROM parts`).get();
        return res.json(rowParts);
})

//post per inserimento parts con controllo su id
router.post('/add',(req,res)=>{
    const {id, name} = req.body;
    if(!id || !name || typeof id !== 'string' || typeof name !== 'string'){
        return res.status(400).json({error:`Errore formato dati non valido`})
    }

    const existId = db.prepare(`
        SELECT * FROM parts WHERE id = ?`).get(id);

        if(existId){
            return res.status(400).json({error:`Attenzione, l' id: ${id} esiste gia`})
        }else{
            db.prepare(`
                INSERT INTO parts(id, name)
                VALUES (?, ?)`).run(id,name);
                res.json({success: true, message: "Section aggiunta"})
        }
})

module.exports = router;