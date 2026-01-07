const express = require('express');
const db = require('../../database/initDb.js');
const router = express.Router();

//get per leggere tutte le sezioni di un cassetto
router.get('/read',(req,res)=>{
    const rowSections =db.prepare(`
        SELECT * FROM sections`).all()
        return res.json(rowSections);
});
//get per leggere nome cassetto associato
router.get('/read/name',(req,res)=>{
    const nameDrawers = db.prepare(`
        SELECT sections.id, sections.drawer_id, drawers.name AS drawer_name, sections.name AS section_name
        FROM sections INNER JOIN drawers ON drawers.id = sections.drawer_id
        `).all();
        res.json(nameDrawers);
})
//get per leggere nome in base a un id drawer selezionato (FormModIns.jsx)
router.get('/read/mod',(req,res)=>{
    const { id } = req.query;
    const rows = db.prepare(`
        SELECT * FROM sections 
        WHERE drawer_id = ?`).all(id);
        res.json(rows);
});

//post per aggiungere una section ad un drawer
router.post('/add',(req,res)=>{
    const {drawer_id,name} = req.body;
    if(!name || !drawer_id || typeof name !== 'string' || typeof drawer_id !== 'number'){
        return res.status(400).json({error:"Errore formato dati non valido"})
    }else{
        const exist = db.prepare(`
            SELECT * FROM sections WHERE name = ?`).get(name);
            if(exist){
                return res.status(400).json({error:`Il nome ${name} esiste gia`})
            }else{
                db.prepare(`
                    INSERT INTO sections(drawer_id, name)
                    VALUES (?, ?)`).run(drawer_id,name);
                    res.json({ success: true, message: "Section aggiunta"});
            }
    }
})
//delete per cancellazione
router.delete('/delete',(req,res)=>{
    const { id } = req.body;
    try{
    db.prepare(`
        DELETE FROM sections WHERE id = ?`).run(id);
        res.status(200).json({succes:true, message:"Cancellazione avvenuta con successo"});
    }catch(error){
        res.status(403).json({error: "Impossibile camncellare"})
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
            UPDATE sections SET name = ?
            WHERE id = ?
            `).run(name,id);
            res.status(200).json({ success: true, message: "Nome Sezione aggiornata" });
    }catch(error){
        res.status(403).json({error:"Update non riuscito"});
    }
})

module.exports = router;