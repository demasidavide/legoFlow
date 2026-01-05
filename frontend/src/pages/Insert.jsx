import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import FormInv from "../components/formInvent/FormInv";
import Table from "../components/table/Table";
import "./Insert.css";
// icone
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeIcon from "@mui/icons-material/Mode";
//------

import { useState, useEffect } from "react";
import axios from "axios";

function Structure() {
  //apertura e chiusura accordion
  const [openContainers, setOpenContainers] = useState(false);
  const [openDrawers, setOpenDrawers] = useState(false);
  const [openSections, setOpenSections] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  //salvataggio dati letti dalle tabelle
  const [containers, setContainers] = useState([]);
  const [drawers, setDrawers] = useState([]);
  const [sections, setSections] = useState([]);
  const [colors, setColors] = useState([]);
  //lettura set id per modifica
  const [modContId, setModContId] = useState(null);
  const [modDrawId, setModDrawId] = useState(null);
  const [modSectId, setModSectId] = useState(null);
  const [modColId, setModColId] = useState(null);
  //alert per risposta
  const [alertOk, setAlertOk] = useState(null);
  const [alertNo, setAlertNo] = useState(null);

  useEffect(() => {
    handleContainers();
    handleDrawers();
    handleSections();
    handleColors();
  }, [
    modContId,
    modDrawId,
    modSectId,
    openContainers,
    openDrawers,
    openSections,
    modColId,
  ]);
  // visualizzo la lista dei containers/cassettiere----------------------------------
  const handleContainers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/containers/read");
    setContainers(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista dei drawers/cassetti-----------------------------------------
  const handleDrawers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/drawers/read/name");
    setDrawers(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista sezioni------------------------------------------------------
  const handleSections = async () => {
    const res = await axios.get("http://127.0.0.1:3000/sections/read/name");
    setSections(res.data);
  };
  //---------------------------------------------------------------------------------
  //visualizzo la lista colori-------------------------------------------------------
  const handleColors = async () => {
    const res = await axios.get("http://127.0.0.1:3000/colors/read");
    setColors(res.data);
  };
  //---------------------------------------------------------------------------------
 
  //gestione modifica nome container-----------------------------------------------------
  const handleSubmitContainer = async (formData, close) => {
    try {
      const res = await axios.put(
        "http://127.0.0.1:3000/containers/edit",
        formData
      );
      if (res.status === 200) {
        setAlertOk(true);
        setTimeout(() => {
          setAlertOk(null);
          setModContId(null);
        }, 3000);
      }
    } catch (error) {
      setAlertNo(true);
      setTimeout(() => {
        setAlertNo(null);
      }, 3000);
    }
  };
  //-------------------------------------------------------------------------------------
  
  
  
  return (
    <>
      <Navbar></Navbar>
      <div className="container-home">
        <div className="container-side">
          <Sidebar></Sidebar>
        </div>
        <div className="container-main">
          <div className="container-show">
            <div className="container-acc">
              <FormInv></FormInv>
              <hr></hr>
              <Table></Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Structure;
