import "./FormCont.css";
import axios from "axios";
import { useState } from "react";

function FormCont() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [classMessage, setClassMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3000/containers/add", { name });
      setName("");
      setClassMessage("message-ok");
      setMessage(`Cassettiera ${name} inserito con successo`);
      setTimeout(() => setMessage(""), 5000);
      setClassMessage("");
    } catch (error) {
      console.log(error);
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
        <button type="submit" className="confirm">
          Aggiungi
        </button>
        <p className={classMessage}>{message}</p>
      </form>
    </>
  );
}
export default FormCont;
