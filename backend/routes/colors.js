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
//delete per cancellazione colore
//delete per cancellazione
router.delete('/delete',(req,res)=>{
    const { id } = req.body;
    try{
    db.prepare(`
        DELETE FROM colors WHERE id = ?`).run(id);
        res.status(200).json({succes:true, message:"Cancellazione avvenuta con successo"});
    }catch(error){
        res.status(403).json({error: "Impossibile cancellare"})
    }
})
//put per modifica nome
router.put('/edit',(req,res)=>{
    const { id, newId, name } = req.body;
    if(!id||!name){
        return res.status(400).json({error:"Id o nome non corretto"});
    }
    try{
        db.prepare(`
            UPDATE colors SET id = ?, name = ?
            WHERE id = ?
            `).run(newId, name, id);
            res.status(200).json({ success: true, message: "Colore aggiornato" });
    }catch(error){
        res.status(403).json({error:"Update non riuscito"});
    }
})

module.exports = router;