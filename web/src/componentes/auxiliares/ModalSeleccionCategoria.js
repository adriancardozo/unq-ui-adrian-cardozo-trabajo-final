import React from 'react'
import CursorLinkAutomatico from './CursorLinkAutomatico';
import Dados from './Dados';
import Modal from './Modal';
import OcultadorModal from './OcultadorModal';

const ModalSeleccionCategoria = ({ dados, categorias, alClickearCategoria, alCerrar }) => {
  return(
    <Modal backdrop={true} alCerrar={alCerrar}>
      <div className="modal-header">
        <h5 className="modal-title">Seleccionar Categoría</h5>
      </div>
      <div className="modal-body">
        <Dados horizontal={true} dados={ dados } ></Dados>
        <div className="row justify-content-center">
          <div className="col-md-auto">
            <h6>Categorías disponibles:</h6>
          </div>
        </div>
        <div className="row justify-content-center">
          {categorias.map(categoria => {
            return(
              <OcultadorModal>
                <CursorLinkAutomatico onClick={ () => alClickearCategoria(categoria) } >
                  <div className="card">
                    <div className='card-body'>
                      {categoria.categoria}
                    </div>
                  </div>
                </CursorLinkAutomatico>
              </OcultadorModal>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default ModalSeleccionCategoria