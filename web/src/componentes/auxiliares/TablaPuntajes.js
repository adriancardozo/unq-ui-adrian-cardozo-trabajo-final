import React from 'react'

const TablaPuntajes = ({ nombreUsuario, puntajes }) => {
  return(
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Categoría</th>
          <th scope="col">{ nombreUsuario }</th>
        </tr>
      </thead>
      <tbody>
        {puntajes.map(puntaje => {
          return(
            <tr>
              <th scope="row">{puntaje.categoria}</th>
              <td>{puntaje.puntos}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TablaPuntajes