import "./table.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Table() {
  const [inventory, setInventory] = useState([]);

  useEffect(()=>{
handleInventory();
  },[])
  const handleInventory = async () => {
    const res = await axios.get("http://127.0.0.1:3000/inventory/read/ins");
    setInventory(res.data);
  };
  

  return (
    <>
      <table className="table-crp">
        <thead>
          <tr className="first-line">
            <th>ID</th>
            <th>Nome</th>
            <th>Colore</th>
            <th>Quantità</th>
            <th>Cassettiera</th>
            <th>Cassetto</th>
            <th>Sezione</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((i) => (
            <tr key={i.part_id}>
              <td>{i.part_id}</td>
              <td>{i.part_name}</td>
              <td>{i.color_name}</td>
              <td>{i.quantity}</td>
              <td>{i.container_name}</td>
              <td>{i.drawer_name}</td>
              <td>{i.section_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Table;
