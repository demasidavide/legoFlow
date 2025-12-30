import "./FormModCont.css";
import axios from "axios";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function FormModCont({ old, close, onSubmit, id, alertOk, alertNo }) {
  const [newName, setNewName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, name: newName, close });
  };

  return (
    <>
      <form className="modifica" onSubmit={handleSubmit}>
        <CloseIcon className="close" onClick={close}></CloseIcon>
        <label className="selected">Hai selezionato:</label>
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
