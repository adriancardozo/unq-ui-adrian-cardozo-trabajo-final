import React from 'react'
import Dado from './Dado';
import './estilos/Dados.css'

const Dados = ({ titulo, horizontal, dados, alClickearDado }) => {
  
  const clasePosicion = () => horizontal ? "col-md-auto columna-dados" : "row justify-content-center fila-dados"

  return(
    <>
    <div className="row justify-content-center">
      <h5 className="titulo-dados">{ titulo }</h5>
    </div>
    <div className="row justify-content-center">  
      <div className="card dados">
        <div className={`card-body cuerpo-dados ${!horizontal ? "cuerpo-dados-vertical" : ""}`}>
          <div className="container contenedor-dados">
            <div className="row justify-content-center">
              {dados.map(dado => {
                return(
                  <div key={`dado-${dado.id}`} className={ clasePosicion() }>
                    <Dado { ...(alClickearDado ? { onClick: () => alClickearDado(dado) } : {} ) } numero={ dado.numero } />
                  </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Dados