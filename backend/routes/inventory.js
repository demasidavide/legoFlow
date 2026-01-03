const express = require('express');
const db = require("../../database/initDb.js");
const router = express.Router();

//transazione con inserimento pezzo e poi inventory
router.post('/transaction',(req,res)=>{
    const { parts,inventory } = req.body;
    db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    db.run(
      "INSERT INTO parts (id, name) VALUES (?, ?)",
      [parts.id, parts.name],
      function (err) {
        if (err) {
          db.run("ROLLBACK");
          return res.status(500).json({ error: "Errore inserimento pezzo" });
        }
        const pezzoId = this.lastID;
        const pezzoName = this.lastName;
        db.run(
          "INSERT INTO inventory (part_id, color_id, section_id, quantity) VALUES (?, ?, ?, ?)",
          [pezzoId, pezzoName, inventory.section, inventory.quantity],
          function (err2) {
            if (err2) {
              db.run("ROLLBACK");
              return res.status(500).json({ error: "Errore inserimento inventory" });
            }
            db.run("COMMIT");
            res.json({ success: true });
          }
        );
      }
    );
  });
})