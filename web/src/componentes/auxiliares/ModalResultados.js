import React from 'react'
import Modal from './Modal';
import OcultadorModal from './OcultadorModal';
import TablaPuntajes from './TablaPuntajes'

const ModalResultados = ({ nombreUsuario, puntajes, alCerrar }) => {
  
  return(
    <Modal alCerrar={alCerrar}>
      <div className="modal-header">
        <h5 className="modal-title">Finalizó la partida</h5>
      </div>
      <div className="modal-body">
        <TablaPuntajes nombreUsuario={nombreUsuario} puntajes={puntajes} />
        <h1>Puntaje total: {puntajes.map(puntaje => puntaje.puntos).reduce((n1, n2) => (n1 + n2))}</h1>
        <OcultadorModal>
          <button className="btn btn-success">Jugar de nuevo</button>
        </OcultadorModal>
      </div>
    </Modal>
  );
}

export default ModalResultados