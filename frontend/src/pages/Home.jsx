import "./Home.css";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Card from "../components/card/Card";
import Form from "../components/formSearch/Form";
import Table from "../components/table/Table";

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
            <Card></Card>
            <Card></Card>
            <Card></Card>
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
