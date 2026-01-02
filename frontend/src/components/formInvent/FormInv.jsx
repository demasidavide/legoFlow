import './FormInv.css';
import { useState } from 'react';


function FormInv(){
    return(
        <>
        
            <form className='insert'> 
                <h2 className='title'>INSERISCI POSIZIONE</h2>
                <label>Cassettiera</label>
                <select>
                    <option>prova 1</option>
                    <option>prova 2</option>
                    <option>prova 3</option>
                </select>
                <label>Cassetto</label>
                <select>
                    <option>prova 1</option>
                    <option>prova 2</option>
                    <option>prova 3</option>
                </select>
                <label>Sezione</label>
                <select>
                    <option>prova 1</option>
                    <option>prova 2</option>
                    <option>prova 3</option>
                </select>
                <h2 className='title'>INSERISCI PEZZO</h2>
                <input type='text' placeholder='Inserisci ID'></input>
                <input type='text' placeholder='Inserisci nome'></input><br></br>
                <button type='submit'>Inserisci</button>



            </form>
        
        </>
    )
}
export default FormInv;