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
//read per leggere tutti i dati da modificare in base a id parts selezionato
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

// transazione per modifica pezzo e inventory

router.put('/transaction/mod', (req, res) => {
  const { parts_id, new_parts_id, parts_name, color_id, section_id, quantity } = req.body; 
  console.log("Valori ricevuti:", { parts_id, new_parts_id, parts_name, color_id, section_id, quantity });

  // Controllo se new_parts_id esiste già (se sì, rifiuta)
  const exists = db.prepare("SELECT id FROM parts WHERE id = ?").get(new_parts_id);
  if (exists && new_parts_id !== parts_id) {
    return res.status(400).json({ error: `new_parts_id ${new_parts_id} already exists` });
  }

  const transaction = db.transaction(() => {
    if (new_parts_id === parts_id) {
      // Caso semplice: stesso ID, aggiorna solo nome e campi inventory
      const updatePart = db.prepare("UPDATE parts SET name = ? WHERE id = ?");
      updatePart.run(parts_name, parts_id);
      
      const updateInventory = db.prepare(
        "UPDATE inventory SET color_id = ?, section_id = ?, quantity = ? WHERE part_id = ?"
      );
      updateInventory.run(color_id, section_id, quantity, parts_id);
      console.log("Aggiornamento per stesso ID completato");
      return;
    }

    // Caso cambio ID: aggiorna parts prima
    const updatePart = db.prepare("UPDATE parts SET id = ?, name = ? WHERE id = ?");
    updatePart.run(new_parts_id, parts_name, parts_id);
    console.log("Parts aggiornato al nuovo ID");

    // Ora inventory può puntare al nuovo ID senza FK violation
    const updateInventory = db.prepare(
      "UPDATE inventory SET part_id = ?, color_id = ?, section_id = ?, quantity = ? WHERE part_id = ?"
    );
    updateInventory.run(new_parts_id, color_id, section_id, quantity, parts_id);  // Nota: WHERE usa ancora parts_id originale
    console.log("Inventory aggiornato");
  });
  
  try {
    transaction();
    console.log("transazione ok");
    res.json({ success: true, message: "Modifica avvenuta con successo" });
  } catch (error) {
    console.error("Errore transazione modifica:", error.stack || error);
    res.status(500).json({ error: error.message });
  }
});
// router.put('/transaction/mod', (req, res) => {
//   const { parts_id, new_parts_id, parts_name, color_id, section_id, quantity } = req.body; 
//   console.log("Valori ricevuti:", { parts_id, new_parts_id, parts_name, color_id, section_id, quantity });

//   const transaction = db.transaction(() => {
    
//     const updateInventory = db.prepare(
//       "UPDATE inventory SET part_id = ?, color_id = ?, section_id = ?, quantity = ? WHERE part_id = ?"
//     );
//     updateInventory.run(new_parts_id, color_id, section_id, quantity, parts_id);
//     console.log("Righe aggiornate in inventory:");
//     const updatePart = db.prepare("UPDATE parts SET id = ?, name = ? WHERE id = ?");
//     updatePart.run(new_parts_id, parts_name, parts_id);
//     console.log("Righe aggiornate in parts:");
//   });
  
//   try {
//     transaction();
//     console.log("transazione ok")
//     res.json({ success: true, message: "Modifica avvenuta con successo" });
//   } catch (error) {
//     console.log("Errore transazione modifica:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

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
//transazione per cancellazione record inventory e parts

router.delete('/transaction/del', (req, res) => {
  const { id } = req.query;  // id del pezzo

  const transaction = db.transaction(() => {
    // Cancella da inventory
    const deleteInventory = db.prepare("DELETE FROM inventory WHERE part_id = ?");
    deleteInventory.run(id);
    
    // Cancella da parts
    const deletePart = db.prepare("DELETE FROM parts WHERE id = ?");
    deletePart.run(id);
  });
  try {
    transaction();
    res.json({ success: true, message: "Cancellazione avvenuta con successo" });
  } catch (error) {
    console.log("Errore cancellazione:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;