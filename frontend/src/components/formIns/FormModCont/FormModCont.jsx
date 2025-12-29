import "./FormModCont.css";
import axios from "axios";
import { useState } from "react";

function FormModCont({old}){
return(
    <>
    <form>
        <label>Selezionato:{old}</label>
        <input type="text" value="new" placeholder="Inserisci nuovo nome"></input>
        <button type="submit">Modifica</button>
    </form>
    
    </>
);
}
export default FormModCont;