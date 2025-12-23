import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Card from "../components/card/Card";
import Form from "../components/formSearch/Form";
import Table from "../components/table/Table";
import FormCont from "../components/formIns/formContainer/FormCont"
import "./Structure.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function Structure() {
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
            <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Inserisci Cassettiera</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <FormCont></FormCont>
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
