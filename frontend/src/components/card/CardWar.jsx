import './CardWar.css';
import { useState,useEffect } from 'react';
import axios from "axios";

function CardWar(){
    const [quantityLow, setQuantityLow] = useState([]);

    useEffect(()=>{
        const handleTotalQuantityLow = async()=>{
            const res = await axios.get("http://127.0.0.1:3000/inventory/read/low");
            setQuantityLow(res.data);
        } 
        handleTotalQuantityLow();
    },[]);


    return(
        <>
        <div className="card">
            <p className="title">Sotto Scorta</p>
            <p className="number-low">{quantityLow.count_low_quantity}</p>
        </div>
        </>
    )
}
export default CardWar;