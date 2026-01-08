import './CardArt.css';
import { useState,useEffect } from 'react';
import axios from "axios";

function CardArt(){
    const [parts, setParts] = useState([]);

    useEffect(()=>{
        const handleTotalParts = async()=>{
            const res = await axios.get("http://127.0.0.1:3000/parts/read/tot");
            setParts(res.data);
        } 
        handleTotalParts();
    },[]);


    return(
        <>
        <div className="card">
            <p className="title">Totale Articoli</p>
            <p className="number">{parts.total}</p>
        </div>
        </>
    )
}
export default CardArt;