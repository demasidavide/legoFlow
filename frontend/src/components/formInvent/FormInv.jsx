import "./FormInv.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import axios from "axios";

function FormInv() {
  //salvataggio dati letti dalle tabelle
  const [containers, setContainers] = useState([]);
  const [drawers, setDrawers] = useState([]);
  const [sections, setSections] = useState([]);
  const [colors, setColors] = useState([]);
  const [messageOk, setMessageOk] = useState(false);
  const [messageNo, setMessageNo] = useState(false);
  //valori selezionati
  const [selCont, setSelCont] = useState("");
  const [selDraw, setSelDraw] = useState("");
  const [selSect, setSelSect] = useState("");
  const [selCol, setSelCol] = useState("");
  const [selPartId, setSelPartId] = useState("");
  const [selPartName, setSelPartName] = useState("");
  const [selPartQta, setSelPartQta] = useState("");

  useEffect(() => {
    handleContainers();
    handleDrawers(selCont);
    handleSections(selDraw);
    handleColors();
  }, [selCont, selDraw, selSect]);

  // visualizzo la lista dei containers/cassettiere----------------------------------
  const handleContainers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/containers/read");
    setContainers(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista dei drawers/cassetti-----------------------------------------
  const handleDrawers = async (id) => {
    const res = await axios.get("http://127.0.0.1:3000/drawers/read/mod", {
      params: { id },
    });
    setDrawers(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista sezioni------------------------------------------------------
  const handleSections = async (id) => {
    const res = await axios.get("http://127.0.0.1:3000/sections/read/mod", {
      params: { id },
    });
    setSections(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista colori-------------------------------------------------------
  const handleColors = async () => {
    const res = await axios.get("http://127.0.0.1:3000/colors/read");
    setColors(res.data);
  };
  //---------------------------------------------------------------------------------
  //gestione inserimento pezzi-------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/inventory/transaction",
        {
          parts_id: selPartId,
          parts_name: selPartName,
          color_id: selCol,
          section_id: selSect,
          quantity: selPartQta,
        }
      );
      if (res.status === 200) {
        setMessageOk(true);
        setTimeout(() => {
          setMessageOk(false);
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      if (res.status === 400 || 500 || 404 || 403) {
        setMessageNo(true);
        setTimeout(() => {
          setMessageNo(false);
          window.location.reload();
        }, 3000);
      }
    }
  };

  return (
    <>
      <form className="insert" onSubmit={handleSubmit}>
        <h2 className="title">INSERISCI POSIZIONE</h2>
        <label>Cassettiera</label>
        <select
          required
          onChange={(e) => {
            setSelCont(e.target.value);
          }}
        >
          <option value="">Seleziona...</option>
          {containers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label>Cassetto</label>
        <select
          required
          onChange={(e) => {
            setSelDraw(e.target.value);
          }}
        >
          <option value="">Seleziona...</option>
          {drawers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <label>Sezione</label>
        <select
          required
          onChange={(e) => {
            setSelSect(e.target.value);
          }}
        >
          <option value="">Seleziona...</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <h2 className="title">INSERISCI PEZZO</h2>
        <input
          required
          type="text"
          placeholder="Inserisci ID"
          onChange={(e) => {
            setSelPartId(e.target.value);
          }}
        ></input>
        <input
          required
          type="text"
          placeholder="Inserisci nome"
          onChange={(e) => {
            setSelPartName(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          required
          type="number"
          placeholder="Quantità"
          min={0}
          onChange={(e) => {
            setSelPartQta(e.target.value);
          }}
        ></input>
        <label>Colore</label>
        <select
          required
          onChange={(e) => {
            setSelCol(e.target.value);
            handleColors();
          }}
        >
          <option value="">Seleziona...</option>
          {colors.map((cl) => (
            <option key={cl.id} value={cl.id}>
              {cl.id} {cl.name}
            </option>
          ))}
        </select>
        <br></br>
        <button type="submit">Inserisci</button>
      </form>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {messageOk && (
          <Alert variant="filled" severity="success">
            Inserimento avvenuto con successo!
          </Alert>
        )}
        {messageNo && (
          <Alert variant="filled" severity="error">
            Errore-Inserimento non riuscito
          </Alert>
        )}
      </Stack>
    </>
  );
}
export default FormInv;
