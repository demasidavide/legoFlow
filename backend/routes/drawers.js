const express = require('express');
const db = require("../../database/initDb.js");
const router = express.Router();

//get per leggere i cassetti
router.get('/read',(req,res)=>{
    const rowDrawers = db.prepare(`
        SELECT * FROM drawers`).all();
        res.json(rowDrawers);
})

//get per leggere nome cassettiera associata
router.get('/read/name',(req,res)=>{
    const nameContainers = db.prepare(`
        SELECT drawers.id, drawers.container_id, containers.name AS container_name, drawers.name AS drawer_name
        FROM drawers INNER JOIN containers ON containers.id = drawers.container_id
        `).all();
        res.json(nameContainers);
})
//get per leggere nome in base a un id container selezionato (FormModIns.jsx)
router.get('/read/mod',(req,res)=>{
    const { id } = req.query;
    const rows = db.prepare(`
        SELECT * FROM DRAWERS 
        WHERE container_id = ?`).all(id);
        res.json(rows);
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
//put per modifica nome
router.put('/edit',(req,res)=>{
    const { id, name } = req.body;
    if(!id||!name){
        return res.status(400).json({error:"Id o nome non corretto"});
    }
    try{
        db.prepare(`
            UPDATE drawers SET name = ?
            WHERE id = ?
            `).run(name,id);
            res.status(200).json({ success: true, message: "Nome cassetto aggiornato" });
    }catch(error){
        res.status(403).json({error:"Update non riuscito"});
    }
})

//delete per cancellazione 
router.delete('/delete',(req,res)=>{
    const { id } = req.body;
    try{
    db.prepare(`
        DELETE FROM drawers WHERE id = ?`).run(id);
        res.status(200).json({succes:true, message:"Cancellazione avvenuta con successo"});
    }catch(error){
        res.status(403).json({error: "Impossibile camncellare"})
    }
})

module.exports = router;