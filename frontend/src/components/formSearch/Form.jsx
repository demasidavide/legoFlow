import "./Form.css";
import { use, useState } from "react";

function Form() {
  const [selected, setSelected] = useState("1");

  return (
    <>
      <form className="search">
        <input type="text" placeholder={
            selected === "1" ? "Inserisci ID" 
            : selected === "2" ? "Inserisci un colore"
        : "Cerca contenitore"}></input>
        <button type="submit" className="submit">Cerca</button>
        <br></br>
        <input
          type="radio"
          id="scelta1"
          name="scelta"
          value="1"
          checked={selected === "1"}
          onChange={() => setSelected("1")}
        />
        <label htmlFor="scelta1" className={selected === "1" ? "option selected" : "option"}>
          Pezzo
        </label>

        <input
          type="radio"
          id="scelta2"
          name="scelta"
          value="2"
          checked={selected === "2"}
          onChange={() => setSelected("2")}
        />
        <label htmlFor="scelta2" className={selected === "2" ? "option selected" : "option"}>
          Colore
        </label>

        <input
          type="radio"
          id="scelta3"
          name="scelta"
          value="3"
          checked={selected === "3"}
          onChange={() => setSelected("3")}
        />
        <label htmlFor="scelta3" className={selected === "3" ? "option selected" : "option"}>
          Contenitore
        </label>
      </form>
      <hr></hr>
    </>
  );
}
export default Form;
