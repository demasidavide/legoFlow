import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import FormCont from "../components/formIns/formContainer/FormCont";
import FormDraw from "../components/formIns/formDrawers/FormDraw";
import "./Structure.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState, useEffect } from "react";
import axios from "axios";

function Structure() {
  const [openContainers, setOpenContainers] = useState(false);
  const [openDrawers, setOpenDrawers] = useState(false);
  const [containers, setContainers] = useState([]);
  const [drawers, setDrawers] = useState([]);

  useEffect(() => {
    handleContainers();
    handleDrawers();
  }, []);

  const handleContainers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/containers/read");
    setContainers(res.data);
  };

  const handleDrawers = async () => {
    const res = await axios.get("http://127.0.0.1:3000/drawers/read");
    setDrawers(res.data);
  };

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
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
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
                            <td>ID</td>
                            <td>ID Cassettiera</td>
                            <td>Nome Cassetto</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={d.id}>
                            <td>{d.id}</td>
                            <td>{d.container_id}</td>
                            <td>{d.name}</td>
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
