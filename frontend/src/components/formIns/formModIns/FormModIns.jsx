import "./FormModIns.css";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";

function FormModIns({ close, idOld }) {
  //salvataggio dati letti dalle tabelle
  const [containers, setContainers] = useState([]);
  const [drawers, setDrawers] = useState([]);
  const [sections, setSections] = useState([]);
  const [colors, setColors] = useState([]);
  const [rowOld, setRowOld] = useState([]);
  //valori selezionati
  const [selCont, setSelCont] = useState("");
  const [selDraw, setSelDraw] = useState("");
  const [selSect, setSelSect] = useState("");
  const [selCol, setSelCol] = useState("");
  const [selPartId, setSelPartId] = useState("");
  const [selPartName, setSelPartName] = useState("");
  const [selPartQta, setSelPartQta] = useState("");
  const [selColName, setSelColName] = useState("");

  useEffect(() => {
    handleContainers();
    handleDrawers();
    handleSections();
    handleColors();
  }, []);

  // visualizzo la lista dei containers/cassettiere----------------------------------
  const handleContainers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/containers/read");
    setContainers(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista dei drawers/cassetti-----------------------------------------
  const handleDrawers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/drawers/read/name");
    setDrawers(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista sezioni------------------------------------------------------
  const handleSections = async () => {
    const res = await axios.get("http://127.0.0.1:3000/sections/read/name");
    setSections(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista colori-------------------------------------------------------
  const handleColors = async () => {
    const res = await axios.get("http://127.0.0.1:3000/colors/read");
    setColors(res.data);
  };
  //---------------------------------------------------------------------------------


  useEffect(()=>{
    if(rowOld.length > 0){
      const data = rowOld[0];
    setSelPartId(data.part_id);
    setSelPartName(data.part_name);
    setSelCol(data.color_id);
    setSelPartQta(data.quantity);
    setSelSect(data.section_id);
    setSelCont(data.container_name);
    setSelDraw(data.drawer_name);
    setSelPartQta(data.quantity);
    setSelColName(data.color_name);

    }
  },[rowOld]);

  useEffect(()=>{
    if(idOld){
    handleReadOld();
    }
  },[idOld])


  //gestione modifica-lettura dati vecchi
  const handleReadOld = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/inventory/read/mod", {
        params: {id : idOld}
      });
      setRowOld(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //gestione inserimento pezzi-------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3000/inventory/transaction", {
        parts_id: selPartId,
        parts_name: selPartName,
        color_id: selCol,
        section_id: selSect,
        quantity: selPartQta,
      });
      navigate("/Insert");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="modifica-ins" onSubmit={handleSubmit}>
        <CloseIcon className="close" onClick={close}></CloseIcon>
        <h2 className="title">MODIFICA POSIZIONE</h2>
        <label>Cassettiera</label>
        <select
          onChange={(e) => {
            setSelCont(e.target.value);
            handleContainers();
          }}
        >
          <option value="">{selCont}</option>
          {containers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select><br></br>
        <label>Cassetto</label>
        <select
          onChange={(e) => {
            setSelDraw(e.target.value);
            handleDrawers();
          }}
        >
          <option value="">{selDraw}</option>
          {drawers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select><br></br>
        <label>Sezione</label>
        <select
          onChange={(e) => {
            setSelSect(e.target.value);
            handleSections();
          }}
        >
          <option value="">{selSect}</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <h2 className="title">INSERISCI PEZZO</h2>
        <input
          type="text"
          placeholder={selPartId}
          required
          onChange={(e) => {
            setSelPartId(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder={selPartName}
          required
          onChange={(e) => {
            setSelPartName(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="number"
          placeholder={selPartQta}
          required
          min={0}
          onChange={(e) => {
            setSelPartQta(e.target.value);
          }}
        ></input>
        <label>Colore</label>
        <select
          onChange={(e) => {
            setSelCol(e.target.value);
            handleColors();
          }}
        >
          <option value={selCol}>{selColName}</option>
          {colors.map((cl) => (
            <option key={cl.id} value={cl.id}>
              {cl.id} {cl.name}
            </option>
          ))}
        </select>
        <br></br>
        <button type="submit">Modifica</button>
      </form>
    </>
  );
}
export default FormModIns;
