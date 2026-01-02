import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import FormCont from "../components/formIns/formContainer/FormCont";
import FormDraw from "../components/formIns/formDrawers/FormDraw";
import FormSect from "../components/formIns/formSections/FormSect";
import FormModCont from "../components/formIns/FormModCont/FormModCont";
import FormColors from "../components/formIns/formColors/FormColors";
import FormModCol from "../components/formIns/formModCol/FormModCol";
import "./Structure.css";
// icone
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeIcon from "@mui/icons-material/Mode";
//------
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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
  //geastione cancellazione containers(errore se associato a drawer,ok se non associato)
  const handleDeleteCont = async (id) => {
    try {
      const res = await axios.delete(
        "http://127.0.0.1:3000/containers/delete",
        { data: { id: id } }
      );
      if (res.status === 200) {
        alert(res.data.message || "Cancellazione avvenuta con successo!");
        handleContainers();
      }
    } catch (error) {
      if (error.status === 500 || 400)
        alert(
          "Impossibile cancellare! Un Cassetto è associato a questa cassettiera"
        );
    }
  };
  //----------------------------------------------------------------------------------
  //gestione cancellazione cassetto,drawer--------------------------------------------
  const handleDeletDraw = async (id) => {
    try {
      const res = await axios.delete("http://127.0.0.1:3000/drawers/delete", {
        data: { id: id },
      });
      if (res.status === 200) {
        alert(res.data.message || "Cancellazione avvenuta con successo!");
        handleDrawers();
      }
    } catch (error) {
      if (error.status === 500 || 400 || 403)
        alert("Errore-Impossibile cancellare! ");
    }
  };
  //-------------------------------------------------------------------------------------
  //gestione cancellazione sezioni-------------------------------------------------------
  const handleDeleteSection = async (id) => {
    try {
      const res = await axios.delete("http://127.0.0.1:3000/sections/delete", {
        data: { id: id },
      });
      if (res.status === 200) {
        alert(res.data.message || "Cancellazione avvenuta con successo!");
        handleSections();
      }
    } catch (error) {
      if (error.status === 500 || 400 || 403)
        alert("Errore-Impossibile cancellare ");
    }
  };
  //-------------------------------------------------------------------------------------
  //gestione cancellazione colori--------------------------------------------------------
  const handleDeleteColor = async (id) => {
    try {
      const res = await axios.delete("http://127.0.0.1:3000/colors/delete", {
        data: { id: id },
      });
      if (res.status === 200) {
        alert(res.data.message || "Cancellazione avvenuta con successo!");
        handleColors();
      }
    } catch (error) {
      if (error.status === 500 || 400 || 403)
        alert("Errore-Impossibile cancellare ");
    }
  };
  //-------------------------------------------------------------------------------------
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
  //gestione per modifica cassetto-------------------------------------------------------
  
  const handleSubmitDrawer = async (formData, close) => {
    try {
      const res = await axios.put(
        "http://127.0.0.1:3000/drawers/edit",
        formData
      );
      if (res.status === 200) {
        setAlertOk(true);
        setTimeout(() => {
          setAlertOk(null);
          setModDrawId(null);
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
  // Funzione per modifica sezione
  const handleSubmitSection = async (formData, close) => {
    try {
      const res = await axios.put(
        "http://127.0.0.1:3000/sections/edit",
        formData
      );
      if (res.status === 200) {
        setAlertOk(true);
        setTimeout(() => {
          setAlertOk(null);
          setModSectId(null);
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
  // Funzione per modifica colore
  const handleSubmitColors = async (formData, close) => {
    try {
      const res = await axios.put(
        "http://127.0.0.1:3000/colors/edit",
        formData
      );
      if (res.status === 200) {
        setAlertOk(true);
        setTimeout(() => {
          setAlertOk(null);
          setModColId(null);
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
              <Accordion
                expanded={openContainers}
                onChange={() => setOpenContainers(!openContainers)}
                onClick={handleContainers}
              >
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    Inserisci Cassettiera
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="div">
                    <FormCont></FormCont>
                    {containers.map((c) => (
                      <table>
                        <thead>
                          <tr>
                            <td>ID</td>
                            <td>Nome</td>
                            <td>Azioni</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>
                              <DeleteForeverOutlinedIcon
                                className="delete"
                                onClick={() => handleDeleteCont(c.id)}
                              ></DeleteForeverOutlinedIcon>
                              <ModeIcon
                                className="modify"
                                onClick={() => setModContId(c.id)}
                              ></ModeIcon>
                              {modContId === c.id ? (
                                <FormModCont
                                  id={c.id}
                                  old={c.name}
                                  onSubmit={handleSubmitContainer}
                                  close={() => setModContId(null)}
                                  alertOk={alertOk}
                                  setAlertOk={setAlertOk}
                                  alertNo={alertNo}
                                  setAlertNo={setAlertNo}
                                ></FormModCont>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/* accordion per drawers------------------------------------------------------------ */}
              <Accordion
                expanded={openDrawers}
                onChange={() => setOpenDrawers(!openDrawers)}
                onClick={handleDrawers}
              >
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Inserisci Cassetto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="div">
                    <FormDraw></FormDraw>
                    {drawers.map((d) => (
                      <table>
                        <thead>
                          <tr>
                            <td>ID Cassettiera</td>
                            <td>Nome Cassettiera</td>
                            <td>ID</td>
                            <td>Nome Cassetto</td>
                            <td>Azioni</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={d.id}>
                            <td>{d.container_id}</td>
                            <td>{d.container_name}</td>
                            <td>{d.id}</td>
                            <td>{d.drawer_name}</td>
                            <td>
                              <DeleteForeverOutlinedIcon
                                className="delete"
                                onClick={() => handleDeletDraw(d.id)}
                              ></DeleteForeverOutlinedIcon>
                              <ModeIcon
                                className="modify"
                                onClick={() => setModDrawId(d.id)}
                              ></ModeIcon>
                              {modDrawId === d.id ? (
                                <FormModCont
                                  id={d.id}
                                  old={d.drawer_name}
                                  close={() => setModDrawId(null)}
                                  onSubmit={handleSubmitDrawer}
                                  alertOk={alertOk}
                                  setAlertOk={setAlertOk}
                                  alertNo={alertNo}
                                  setAlertNo={setAlertNo}
                                ></FormModCont>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/* accordion per sezioni--------------------------------------------------------------- */}
              <Accordion
                expanded={openSections}
                onChange={() => setOpenSections(!openSections)}
                onClick={handleSections}
              >
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Inserisci Sezione</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="div">
                    <FormSect></FormSect>
                    {sections.map((s) => (
                      <table>
                        <thead>
                          <tr>
                            <td>ID Cassetto</td>
                            <td>Nome Cassetto</td>
                            <td>ID</td>
                            <td>Nome Sezione</td>
                            <td>Azioni</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={s.id}>
                            <td>{s.drawer_id}</td>
                            <td>{s.drawer_name}</td>
                            <td>{s.id}</td>
                            <td>{s.section_name}</td>
                            <td>
                              <DeleteForeverOutlinedIcon
                                className="delete"
                                onClick={() => handleDeleteSection(s.id)}
                              ></DeleteForeverOutlinedIcon>
                              <ModeIcon
                                className="modify"
                                onClick={() => setModSectId(s.id)}
                              ></ModeIcon>
                              {modSectId === s.id ? (
                                <FormModCont
                                  id={s.id}
                                  old={s.section_name}
                                  close={() => setModSectId(null)}
                                  onSubmit={handleSubmitSection}
                                  alertOk={alertOk}
                                  setAlertOk={setAlertOk}
                                  alertNo={alertNo}
                                  setAlertNo={setAlertNo}
                                ></FormModCont>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/* accordion per colori--------------------------------------------------------------- */}
              <Accordion
                expanded={openColors}
                onChange={() => setOpenColors(!openColors)}
                onClick={handleColors}
              >
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">Inserisci Colore</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="div">
                    <FormColors></FormColors>
                    {colors.map((cl) => (
                      <table>
                        <thead>
                          <tr>
                            <td>ID Colore</td>
                            <td>Nome Colore</td>
                            <td>Azioni</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={cl.id}>
                            <td>{cl.id}</td>
                            <td>{cl.name}</td>
                            <td>
                              <DeleteForeverOutlinedIcon
                                className="delete"
                                onClick={() => handleDeleteColor(cl.id)}
                              ></DeleteForeverOutlinedIcon>
                              <ModeIcon
                                className="modify"
                                onClick={() => setModColId(cl.id)}
                              ></ModeIcon>
                              {modColId === cl.id ? (
                                <FormModCol
                                  id={cl.id}
                                  old={cl.name}
                                  close={() => setModColId(null)}
                                  onSubmit={handleSubmitColors}
                                  alertOk={alertOk}
                                  setAlertOk={setAlertOk}
                                  alertNo={alertNo}
                                  setAlertNo={setAlertNo}
                                ></FormModCol>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Structure;
