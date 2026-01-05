const express = require('express');
const db = require("../../database/initDb.js");
const router = express.Router();

//get per read totale
router.get('/read',(req,res)=>{
  const rowInv = db.prepare(
    'SELECT * FROM inventory'
  ).all();
  res.json(rowInv);
})
//read per modifica
router.get('/read/mod',(req,res)=>{
  const {id} = req.query;
  const rowTot = db.prepare(`
    SELECT 
    inventory.part_id,
    parts.name AS part_name,
    inventory.color_id,
    colors.name AS color_name,
    inventory.quantity,
    inventory.section_id,
    sections.name AS section_name,
    drawers.name AS drawer_name,
    containers.name AS container_name
FROM inventory
INNER JOIN parts ON inventory.part_id = parts.id
INNER JOIN colors ON inventory.color_id = colors.id
INNER JOIN sections ON inventory.section_id = sections.id
INNER JOIN drawers ON sections.drawer_id = drawers.id
INNER JOIN containers ON drawers.container_id = containers.id
WHERE inventory.part_id = ?;`).all(id);
res.json(rowTot);
})

//read per tabella inserimento
router.get('/read/ins',(req,res)=>{
  
  const rowTot = db.prepare(`
    SELECT 
    inventory.part_id,
    parts.name AS part_name,
    inventory.color_id,
    colors.name AS color_name,
    inventory.quantity,
    inventory.section_id,
    sections.name AS section_name,
    drawers.name AS drawer_name,
    containers.name AS container_name
FROM inventory
INNER JOIN parts ON inventory.part_id = parts.id
INNER JOIN colors ON inventory.color_id = colors.id
INNER JOIN sections ON inventory.section_id = sections.id
INNER JOIN drawers ON sections.drawer_id = drawers.id
INNER JOIN containers ON drawers.container_id = containers.id;`).all();
res.json(rowTot);
})

//transazione con inserimento pezzo e poi inventory
router.post('/transaction',(req,res)=>{
    const { parts_id, parts_name, color_id, section_id, quantity } = req.body;
  
  // Con better-sqlite3 le transazioni sono sincrone
  const transaction = db.transaction(() => {
    // Inserisco il pezzo
    const insertPart = db.prepare("INSERT INTO parts (id, name) VALUES (?, ?)");
    insertPart.run(parts_id, parts_name);
    
    // Inserisco nell'inventory
    const insertInventory = db.prepare(
      "INSERT INTO inventory (part_id, color_id, section_id, quantity) VALUES (?, ?, ?, ?)"
    );
    insertInventory.run(parts_id, color_id, section_id, quantity);
  });
  
  try {
    transaction();
    res.json({ success: true });
  } catch (error) {
    console.log("Errore transazione:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;