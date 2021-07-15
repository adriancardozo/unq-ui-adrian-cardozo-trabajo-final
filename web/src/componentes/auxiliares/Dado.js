import React from 'react'
import CursorLinkAutomatico from './CursorLinkAutomatico'
import DadoCinco from './DadoCinco'
import DadoCuatro from './DadoCuatro'
import DadoDos from './DadoDos'
import DadoSeis from './DadoSeis'
import DadoTres from './DadoTres'
import DadoUno from './DadoUno'
import './estilos/Dado.css'

const Dado = ({ numero, onClick }) => {



  const dado = () => {
    switch (numero) {
      case 1:
        return <DadoUno />
      case 2:
        return <DadoDos />
      case 3:
        return <DadoTres />
      case 4:
        return <DadoCuatro />
      case 5:
        return <DadoCinco />
      case 6:
        return <DadoSeis />
      default:
        return <DadoUno />
    }
  }

  return(
    <CursorLinkAutomatico onClick={ onClick }>
      <div className="dado">{dado()}</div>
    </CursorLinkAutomatico>
  );  
}

export default Dado