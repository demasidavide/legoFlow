import "./FormModIns.css";
import { useState,useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";


function FormModIns({close,idOld}) {
  //salvataggio dati letti dalle tabelle
  const [containers, setContainers] = useState([]);
  const [drawers, setDrawers] = useState([]);
  const [sections, setSections] = useState([]);
  const [colors, setColors] = useState([]);
  //valori selezionati
  const [selCont,setSelCont] = useState("");
  const [selDraw,setSelDraw] = useState("");
  const [selSect,setSelSect] = useState("");
  const [selCol,setSelCol] = useState("");
  const [selPartId,setSelPartId] = useState("");
  const [selPartName,setSelPartName] = useState("");
  const [selPartQta,setSelPartQta] = useState("");

  //gestione modifica-lettura dati vecchi
  
  
  //gestione inserimento pezzi-------------------------------------------------------
  const handleSubmit = async(e)=>{
    e.preventDefault();
try{
    await axios.post("http://127.0.0.1:3000/inventory/transaction",{
      parts_id:selPartId,
      parts_name:selPartName,
      color_id:selCol,
      section_id:selSect,
      quantity:selPartQta
    });
    navigate('/Insert');
}catch(error){

}

  }

  return (
    <>
      <form className="modifica-ins" onSubmit={handleSubmit}>
        <CloseIcon className="close" onClick={close}></CloseIcon>
        <h2 className="title">MODIFICA POSIZIONE</h2>
        <label>Cassettiera</label>
        <select onChange={(e)=>{setSelCont(e.target.value); handleContainers();}}>
            <option value="">Seleziona...</option>
          {containers.map((c) => (
            <option key={c.id} value={c.id}>
             {c.name}
            </option>
          ))}
        </select>
        <label>Cassetto</label>
        <select onChange={(e)=>{setSelDraw(e.target.value); handleDrawers();}}>
            <option value="">Seleziona...</option>
          {drawers.map((d) => (
            <option key={d.id} value={d.id}>
             {d.name}
            </option>
          ))}
        </select>
        <label>Sezione</label>
        <select onChange={(e)=>{setSelSect(e.target.value); handleSections();}}>
            <option value="">Seleziona...</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
             {s.name}
            </option>
          ))}
        </select>
        <h2 className="title">INSERISCI PEZZO</h2>
        <input type="text" placeholder="Inserisci ID" onChange={(e)=>{setSelPartId(e.target.value)}}></input>
        <input type="text" placeholder="Inserisci nome" onChange={(e)=>{setSelPartName(e.target.value)}}></input><br></br>
        <input type="number" placeholder="Quantità" min={0} onChange={(e)=>{setSelPartQta(e.target.value)}}></input>
        <label>Colore</label>
        <select onChange={(e)=>{setSelCol(e.target.value); handleColors();}}>
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
    </>
  );
}
export default FormModIns;
