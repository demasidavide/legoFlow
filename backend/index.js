//importazione moduli
const express = require("express");
const db = require("../database/initDb.js");

const app = express();
app.use(express.json());

//post per inserire dati in inventory
app.post("/api/inventory/add", (req, res) => {
  const { part_id, color_id, section_id, quantity } = req.body;

  if (!part_id || !color_id || !section_id || quantity <= 0) {
    return res.status(400).json({ error: "dati non validi" });
  }

  const exist = db
    .prepare(
      `SELECT id, quantity
        FROM inventory
        WHERE part_id = ? AND color_id = ? AND section_id = ?
        `
    )
    .get(part_id, color_id, section_id);

  if (exist) {
    db.prepare(
      `
            UPDATE inventory
            SET quantity = quantity + ?
            WHERE id = ?
            `
    ).run(quantity, exist.id);
  } else {
    db.prepare(
      `INSERT INTO inventory (part_id, color_id, section_id, quantity)
        VALUES (?, ?, ?, ?)`
    ).run(part_id, color_id, section_id, quantity);
  }

  res.json({ success: true, message: "Pezzo aggiunto o aggiornato" });
});

//get per leggere i dati di inventory

app.get("/api/inventory/read", (req, res) => {
  const rows = db
    .prepare(
      `
        SELECT * FROM inventory`
    )
    .all();
  res.json(rows);
});

app.listen(3000, () => console.log("server partito su porta 3000"));
