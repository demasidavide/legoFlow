import "./FormInv.css";
import { useState,useEffect } from "react";
import axios from "axios";

function FormInv() {
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

  useEffect(()=>{
    handleContainers();
    handleDrawers();
    handleSections();
    handleColors();
  },[])

  // visualizzo la lista dei containers/cassettiere----------------------------------
  const handleContainers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/containers/read");
    setContainers(res.data);
    
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista dei drawers/cassetti-----------------------------------------
  const handleDrawers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/drawers/read");
    setDrawers(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista sezioni------------------------------------------------------
  const handleSections = async () => {
    const res = await axios.get("http://127.0.0.1:3000/sections/read");
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
  const handleSubmit = async(e)=>{
    e.preventDefault();
try{
    await axios.post("http://127.0.0.1:3000/inventory/add");
}catch(error){

}

  }

  return (
    <>
      <form className="insert" onSubmit={handleSubmit}>
        <h2 className="title">INSERISCI POSIZIONE</h2>
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
        <input type="text" placeholder="Inserisci ID"></input>
        <input type="text" placeholder="Inserisci nome"></input>
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
export default FormInv;
