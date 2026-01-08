import "./table.css";
import axios from "axios";
import { useState, useEffect } from "react";
// icone
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeIcon from "@mui/icons-material/Mode";
import FormModIns from "../formIns/formModIns/FormModIns";

function Table() {
  const [inventory, setInventory] = useState([]);
  const [idMod, setIdMod] = useState(null);

  useEffect(() => {
    handleInventory();
  }, []);

  const handleInventory = async () => {
    const res = await axios.get("http://127.0.0.1:3000/inventory/read/ins");
    setInventory(res.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Sei sicuro di voler cancellare l' elemento${id}?`
    );
    if (!confirmDelete) return;
   try{
    const res = await axios.delete(
      "http://127.0.0.1:3000/inventory/transaction/del",
      { params: { id } }
    );
    alert(`ATTENZIONE elemento ${id} cancellato`);
    handleInventory();
  }catch(error){
    console.log("Errore cancellazione:", error.response?.data || error.message);
    alert("Errore nella cancellazione: " + (error.response?.data?.error || error.message));
  }
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
              <td>
                <DeleteForeverOutlinedIcon
                  className="delete"
                  onClick={() => {
                    handleDelete(i.part_id);
                  }}
                ></DeleteForeverOutlinedIcon>
                <ModeIcon
                  className="modify"
                  onClick={() => setIdMod(i.part_id)}
                ></ModeIcon>
                {idMod === i.part_id ? (
                  <FormModIns
                    close={() => setIdMod(null)}
                    idOld={i.part_id}
                    onSuccess={() => setIdMod(null)}
                  ></FormModIns>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Table;
