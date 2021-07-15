import React, { useEffect, useState } from 'react'
import './estilos/Modal.css'

const Modal = ({ alCerrar, className, children }) => {
  const [mostrarFade, setMostrarFade] = useState("");
  const [display, setDisplay] = useState("modal-fade-bloque")
  const producirFadeApertura = () => {
    setMostrarFade("show")
    document.body.style.overflow = "hidden"
  }
  const [efecto, setEfecto] = useState({ callback: producirFadeApertura});

  const producirFadeCierre = () => {
    setMostrarFade("");
    setEfecto({ callback: displayNone });
  }
  useEffect(() => {
    efecto.callback();
    return () => document.body.style.overflow = "visible"
  }, [efecto])


  const displayNone = () => {
    setTimeout(() => {
      setDisplay("modal-fade-none")
      setEfecto({ callback: alCerrar ? alCerrar : () => {} });
      document.body.style.overflow = "visible"
    }, 150);
  }

  const cerrar = (e) => {
    if(e.target.classList.contains(`ocultador-modal`)){
      setEfecto({ callback: producirFadeCierre })
    }
  }

  return(
    <>
      <div onClick={ cerrar } className={`modal fade modal-fade ${display} ${mostrarFade}`} aria-modal="true" role="dialog">
        <div className={`${className ? className : ""} modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-dialog-modal-fade`}>
          <div className="modal-content">
            { children }
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal