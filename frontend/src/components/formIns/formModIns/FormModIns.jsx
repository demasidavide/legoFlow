import "./FormModIns.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

function FormModIns({ close, idOld }) {
  const navigate = useNavigate();
  //salvataggio dati letti dalle tabelle
  const [containers, setContainers] = useState([]);
  const [drawers, setDrawers] = useState([]);
  const [sections, setSections] = useState([]);
  const [colors, setColors] = useState([]);
  const [rowOld, setRowOld] = useState([]);
  //valori da modificare
  const [selCont, setSelCont] = useState("");
  const [selDraw, setSelDraw] = useState("");
  const [selSect, setSelSect] = useState("");
  const [selSectName, setSelSectName] = useState("");
  const [selCol, setSelCol] = useState("");
  const [selPartId, setSelPartId] = useState("");
  const [selPartName, setSelPartName] = useState("");
  const [selPartQta, setSelPartQta] = useState("");
  const [selColName, setSelColName] = useState("");
  //valori per submit
  const [selectedCont, setSelectedCont] = useState("");
  const [selectedDraw, setSelectedDraw] = useState("");
  const [selectedSect, setSelectedSect] = useState("");
  const [selectedCol, setSelectedCol] = useState("");
  const [selectedPartId, setSelectedPartId] = useState("");
  const [selectedPartName, setSelectedPartName] = useState("");
  const [selectedPartQta, setSelectedPartQta] = useState("");
  const [selectedColName, setSelectedColName] = useState("");

  
  //useEffect per caricare i dati selezionati dall utente da modificare--------------
  useEffect(() => {
    if (rowOld.length > 0) {
      const data = rowOld[0];
      setSelPartId(data.part_id);
      setSelPartName(data.part_name);
      setSelCol(data.color_id);
      setSelPartQta(data.quantity);
      setSelSect(data.section_id);
      setSelSectName(data.section_name);
      setSelCont(data.container_name);
      setSelDraw(data.drawer_name);
      setSelPartQta(data.quantity);
      setSelColName(data.color_name);
      //inizializzo anche i selected nel caso non si modificassero valori durante la modifica
      setSelectedPartId(data.part_id);
      setSelectedPartName(data.part_name);
      setSelectedCol(data.color_id);
      setSelectedPartQta(data.quantity);
      setSelectedSect(data.section_id);
      setSelectedCont(data.container_name);
      setSelectedDraw(data.drawer_name);
      setSelectedCol(data.color_id);
    }
  }, [rowOld]);

  useEffect(() => {
    if (idOld) {
      handleReadOld();
    }
  }, [idOld]);
  //---------------------------------------------------------------------------------
  useEffect(() => {
    handleContainers();
    handleDrawers();
    handleSections();
    handleColors();
  }, [selCont, selDraw, selSect]);

  // visualizzo la lista dei containers/cassettiere----------------------------------
  const handleContainers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/containers/read");
    setContainers(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista dei drawers/cassetti-----------------------------------------
  const handleDrawers = async (id) => {
    const res = await axios.get("http://127.0.0.1:3000/drawers/read/mod", {
      params: { id },
    });
    if (res.data.length === 0) {
      setDrawers([]);
    } else {
      setDrawers(res.data);
    }
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista sezioni------------------------------------------------------
  const handleSections = async (id) => {
    const res = await axios.get("http://127.0.0.1:3000/sections/read/mod", {
      params: { id },
    });
    if (res.data.length === 0) {
      setSections([]);
    } else {
      setSections(res.data);
    }
  };

  //---------------------------------------------------------------------------------
  //visualizzo la lista colori-------------------------------------------------------
  const handleColors = async () => {
    const res = await axios.get("http://127.0.0.1:3000/colors/read");
    setColors(res.data);
  };
  //---------------------------------------------------------------------------------

  //gestione modifica-lettura dati vecchi--------------------------------------------
  const handleReadOld = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/inventory/read/mod", {
        params: { id: idOld },
      });
      setRowOld(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //-----------------------------------------------------------------------------------
  //gestione inserimento pezzi-------------------------------------------------------
  const handleSubmit = async (e) => {
    console.log("handle partito...");
    e.preventDefault();
    try {
      console.log("Invio richiesta PUT...");
      console.log("Valori inviati:", {
        parts_id: selPartId,
        new_parts_id: selectedPartId,
        parts_name: selectedPartName,
        color_id: selectedCol,
        section_id: selectedSect,
        quantity: selectedPartQta,
      });
      const res = await axios.put(
        "http://127.0.0.1:3000/inventory/transaction/mod",
        {
          parts_id: selPartId,
          new_parts_id: selectedPartId,
          parts_name: selectedPartName,
          color_id: selectedCol,
          section_id: selectedSect,
          quantity: selectedPartQta,
        }
      );
      console.log("Richiesta riuscita:", res.status);
      navigate("/Insert");
    } catch (error) {
      console.log("Errore nella richiesta:", error);
      console.log(error);
    }
  };
  //-----------------------------------------------------------------------------------

  return (
    <>
      <form className="modifica-ins" onSubmit={handleSubmit}>
        <CloseIcon className="close" onClick={close}></CloseIcon>
        <h2 className="title">MODIFICA POSIZIONE</h2>
        <label>Cassettiera</label>
        <Box
          component="div"
          noValidate
          autoComplete="off"
          sx={{ minWidth: 100, maxWidth: 450 }}
        >
          <InputLabel id="demo-simple-select-label">{selCont}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCont}
            label=""
            onChange={(e) => {
              setSelectedCont(e.target.value);
              handleDrawers(e.target.value);
            }}
          >
            {containers.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <br></br>
        <label>Cassetto</label>
        <Box
          component="div"
          noValidate
          autoComplete="off"
          sx={{ minWidth: 100, maxWidth: 450 }}
        >
          <InputLabel id="demo-simple-select-label">{selDraw}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDraw}
            label=""
            onChange={(e) => {
              setSelectedDraw(e.target.value);
              handleSections(e.target.value);
            }}
          >
            {drawers.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <br></br>
        <label>Sezione</label>
        <Box
          component="div"
          noValidate
          autoComplete="off"
          sx={{ minWidth: 100, maxWidth: 450 }}
        >
          <InputLabel id="demo-simple-select-label">{selSectName}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSect}
            label=""
            onChange={(e) => {
              setSelectedSect(e.target.value);
            }}
          >
            {sections.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <h2 className="title">MODIFICA PEZZO</h2>
        <Box
          component="div"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            type="text"
            label="Id Pezzo"
            value={selectedPartId}
            variant="outlined"
            required
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                transform: "translate(14px, -29px) scale(0.75)",
              },
            }}
            onChange={(e) => {
              setSelectedPartId(e.target.value);
            }}
          />
        </Box>
        <Box
          component="div"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            type="text"
            label="Nome"
            value={selectedPartName}
            variant="outlined"
            required
            shrink={true}
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                transform: "translate(14px, -29px) scale(0.75)",
              },
            }}
            onChange={(e) => {
              setSelectedPartName(e.target.value);
            }}
          />
        </Box>
        <label>Colore</label>
        <Box
          component="div"
          noValidate
          autoComplete="off"
          sx={{ minWidth: 100, maxWidth: 450 }}
        >
          <InputLabel id="demo-simple-select-label">
            {selCol} {selColName}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCol}
            label=""
            onChange={(e) => {
              setSelectedCol(e.target.value);
            }}
          >
            {colors.map((cl) => (
              <MenuItem key={cl.id} value={cl.id}>
                {cl.id} {cl.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <br></br>
        <label>Quantità</label>
        <input
          type="number"
          placeholder={selPartQta}
          required
          min={0}
          onChange={(e) => {
            setSelectedPartQta(e.target.value);
          }}
        ></input>
        <br></br>
        <button type="submit">Modifica</button>
      </form>
    </>
  );
}
export default FormModIns;
