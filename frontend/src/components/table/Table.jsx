import './table.css'

function Table(){
    return(
        <>
        <table className='table-crp'>
  <thead>
    <tr className='first-line'>
      <th>ID</th>
      <th>Nome</th>
      <th>Colore</th>
      <th>Quantità</th>
      <th>Contenitore</th>
      <th>Cassetto</th>
      <th>Sezione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mattoncino 2x4</td>
      <td>Rosso</td>
      <td>50</td>
      <td>Box A</td>
      <td>Cassetto 1</td>
      <td>Sezione 3</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Piattaforma 4x6</td>
      <td>Blu</td>
      <td>20</td>
      <td>Box B</td>
      <td>Cassetto 2</td>
      <td>Sezione 1</td>
    </tr>
  </tbody>
</table>
        
        </>
    )
}
export default Table;