import "./FormCont.css";
import axios from "axios";
import { useState } from "react";

function FormCont() {

    const [name, setName] = useState("");
    const [message,setMessage] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await axios.post("http://127.0.0.1:3000/containers/add", {name});
            setName("");
            setMessage(`Cassettiera ${name} inserito con successo`)
            setTimeout(()=>
            setMessage(""),5000);
        }catch(error){
            setMessage("Inserimento non riuscito")
            setTimeout(()=>
            setMessage(""),5000);
        }
    }

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
        <p>{message}</p>
      </form>
    </>
  );
}
export default FormCont;
