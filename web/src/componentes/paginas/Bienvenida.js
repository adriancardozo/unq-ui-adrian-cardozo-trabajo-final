import React, { useState } from 'react'
import Modal from '../auxiliares/Modal.js'
import OcultadorModal from '../auxiliares/OcultadorModal.js'
import './estilos/Bienvenida.css'

const Bienvenida = (props) => {
  const [nombreJugador, setNombreJugador] = useState("Jugador")

  const irAJugar = () =>  {
    props.history.push(`/jugar/${nombreJugador ? nombreJugador : "Jugador"}`)
  }
  
  return(
    <Modal alCerrar={ irAJugar }>
      <div className="modal-header justify-content-center">
        <h3 className="modal-title">Generala Web</h3>
      </div>
      <div className="modal-body">
        <form onSubmit={ e => e.preventDefault() } className="formulario-modal-bienvenida">
          <div className="row align-items-start"/>
          <div className="row align-items-center">
            <div className="row justify-content-center">
              <label className="nombre-jugador-bienvenida">Ingrese su nombre: </label>
            </div>
            <div className="row justify-content-center">
              <input className="form-control nombre-jugador-bienvenida" onChange={ e => setNombreJugador(e.target.value) } value={ nombreJugador }></input>
            </div>
          </div>
          <div className="row justify-content-center align-items-end">
            <OcultadorModal><button className="btn btn-success">Jugar</button></OcultadorModal>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default Bienvenida