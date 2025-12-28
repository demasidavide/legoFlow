import "./FormDraw.css";
import axios from "axios";
import { useState, useEffect } from "react";

function FormDraw() {
  const [drawers, setDrawers] = useState([]);
  const [container, setContainer] = useState([]);
  const [idCont, setIdCont] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [classMessage, setClassMessage] = useState("");

  useEffect(() => {
    const handleContainer = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3000/containers/read");
        setContainer(res.data);
        console.log(container);
      } catch (error) {
        console.log(error, "errore ricerca containers-formdrawer");
      }
    };
    handleContainer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3000/drawers/add", {
        container_id: Number(idCont),
        name: name,
      });
      setDrawers(res.data);
      setClassMessage("message-ok");
      setName("");
      setMessage(`Cassetto ${name} inserito con successo`);
      setTimeout(() => setMessage(""), 5000);
      setClassMessage("");
    } catch (error) {
      setClassMessage("message-no");
      setMessage("Inserimento non riuscito");
      setTimeout(() => setMessage(""), 5000);
      setClassMessage("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Inserisci nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <select value={idCont} onChange={(e) => setIdCont(e.target.value)}>
          <option value="">Seleziona Cassettiera</option>
          {container.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id} {c.name}
            </option>
          ))}
        </select>
        <button type="submit" className="confirm">
          Aggiungi
        </button>
        <p className={classMessage}>{message}</p>
      </form>
    </>
  );
}
export default FormDraw;
