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
        SELECT sections.id, sections.drawer_id, drawers.name AS drawerr_name, sections.name AS section_name
        FROM sections INNER JOIN drawers ON drawers.id = sections.drawer_id
        `).all();
        res.json(nameDrawers);
})

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

module.exports = router;