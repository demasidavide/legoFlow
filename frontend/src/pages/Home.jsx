import "./Home.css";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import CardArt from "../components/card/CardArt";
import CardTot from "../components/card/CardTot";
import CardWar from "../components/card/CardWar";
import Form from "../components/formSearch/Form";
import Table from "../components/table/Table";
import FormModCont from "../components/formIns/FormModCont/FormModCont";
import CardActionArea from "@mui/material/CardActionArea";


function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="container-home">
        <div className="container-side">
          <Sidebar></Sidebar>
        </div>
        <div className="container-main">
          <div className="container-card">
            <CardArt></CardArt>
            <CardTot></CardTot>
            <CardWar></CardWar>
            
          </div>
          <div className="container-show">
            <Form></Form>
            <Table></Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
