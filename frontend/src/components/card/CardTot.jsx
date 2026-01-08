import './CardTot.css';
import { useState,useEffect } from 'react';
import axios from "axios";

function CardTot(){
    const [quantity, setQuantity] = useState([]);

    useEffect(()=>{
        const handleTotalQuantity = async()=>{
            const res = await axios.get("http://127.0.0.1:3000/inventory/read/tot");
            setQuantity(res.data);
        } 
        handleTotalQuantity();
    },[]);


    return(
        <>
        <div className="card">
            <p className="title">Totale Quantità</p>
            <p className="number">{quantity.total_quantity}</p>
        </div>
        </>
    )
}
export default CardTot;