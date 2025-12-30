import "./FormModCont.css";
import axios from "axios";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function FormModCont({ old, close, id }) {
  const [alertOk, setAlertOk] = useState(null);
  const [alertNo, setAlertNo] = useState(null);
  const [newName, setNewName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://127.0.0.1:3000/containers/edit", {
        id: id, // oppure solo id, se usi la shorthand
        name: newName,
      });
      if (res.status === 200) {
        setAlertOk(true);
        setTimeout(() => {
          setAlertOk(null);
          close();
        }, 3000);
      }
    } catch (error) {
      setAlertNo(true);
      setTimeout(() => {
        setAlertNo(null);
      }, 5000);
    }
  };

  return (
    <>
      
      <form className="modifica" onSubmit={handleSubmit}>
        <CloseIcon className="close" onClick={close}></CloseIcon>
        <label className="selected">Cassettiera Selezionata:</label>
        <label className="selected-name">{old}</label>
        <input
          className="new-name"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Inserisci nuovo nome"
        ></input>
        <button type="submit">Modifica</button>
        {alertOk && (
        <Stack sx={{ width: "80%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            Modifica avvenuta con successo.
          </Alert>
        </Stack>
      )}
      {alertNo && (
        <Stack sx={{ width: "80%" }} spacing={2}>
          <Alert variant="filled" severity="warning">
            Attenzione, impossibile effettuare la modifica.
          </Alert>
        </Stack>
      )}
      </form>
    </>
  );
}
export default FormModCont;
