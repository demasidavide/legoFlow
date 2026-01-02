import "./FormColors.css";
import { useState } from "react";
import axios from "axios";

function FormColors() {
  const [name, setName] = useState("");
  const [idCol, setIdCol] = useState("");
  const [message, setMessage] = useState("");
  const [classMessage, setClassMessage] = useState("");

  const handleColors = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3000/colors/add", {
        id: Number(idCol),
        name: name,
      });
      setClassMessage("message-ok");
      setName("");
      setMessage(`Colore ${name} con ID ${idCol} inserito con successo`);
      setTimeout(() => {
        setMessage("");
        setClassMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setClassMessage("message-no");
      setMessage("Inserimento non riuscito");
      setTimeout(() => {
        setMessage("");
        setClassMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <form onSubmit={handleColors}>
        <input
          required
          type="text"
          placeholder="Inserisci ID"
          value={idCol}
          onChange={(e) => setIdCol(e.target.value)}
        ></input>
        <input
          required
          type="text"
          placeholder="Inserisci nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button type="submit" className="confirm">
          Aggiungi
        </button>
        <p className={classMessage}>{message}</p>
      </form>
    </>
  );
}
export default FormColors;
