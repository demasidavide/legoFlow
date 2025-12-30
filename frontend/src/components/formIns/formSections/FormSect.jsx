import "./FormSect.css";
import axios from "axios";
import { useState, useEffect } from "react";

function FormSect() {
  const [drawers, setDrawers] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [classMessage, setClassMessage] = useState("");
  const [idDraw, setIdDraw] = useState("");

  useEffect(() => {
    const handleDrawers = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3000/drawers/read");
        setDrawers(res.data);
      } catch (error) {
        console.log(error, "errore ricerca containers-formdrawer");
      }
    };
    handleDrawers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3000/sections/add", {
        drawer_id: Number(idDraw),
        name: name,
      });
      setClassMessage("message-ok");
      setMessage(`Sezione ${name} inserita con successo`);
      setTimeout(() => {setMessage(""); setClassMessage("");}, 3000);
     
    } catch (error) {
      setClassMessage("message-no");
      setMessage("Inserimento non riuscito");
      setTimeout(() => {setMessage(""); setClassMessage("");}, 3000);
      
    }
  };

  return(
     <>
  <form onSubmit={handleSubmit}>
        <input
        required
          type="text"
          placeholder="Inserisci nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <select required value={idDraw} onChange={(e) => setIdDraw(e.target.value)}>
          <option value="">Seleziona Cassettiera</option>
          {drawers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.id} {d.name}
            </option>
          ))}
        </select>
        <button type="submit" className="confirm">
          Aggiungi
        </button>
        <p className={classMessage}>{message}</p>
      </form>
  
  </>
  )
}
export default FormSect;
