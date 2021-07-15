import React from 'react'
import './estilos/OcultadorModal.css'

const OcultadorModal = ({ children }) => {
  const click = (evento) => {
    if(evento.target !== evento.currentTarget){
      evento.currentTarget.click()
    }
  }

  return <div onClick={ click } className='ocultador-modal'>{ children }</div>
}

export default OcultadorModal