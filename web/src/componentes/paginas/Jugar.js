import React, { useState } from 'react'
import { useParams } from 'react-router';
import Dados from '../auxiliares/Dados';
import Modal from '../auxiliares/Modal';
import TablaPuntajes from '../auxiliares/TablaPuntajes';
import './estilos/ModalJugar.css'

const Jugar = (props) => {
  const [dados, setDados] = useState({ elegidos: [], tarro:[{id: 1, numero: 1}, {id: 2, numero: 2}, {id: 3, numero: 3}, {id: 4, numero: 4}, {id: 5, numero: 5}] })
  const { nombre } = useParams()
  const [puntajes, setPuntajes] = useState([
    { categoria: "1", puntos: 0 },
    { categoria: "2", puntos: 0 },
    { categoria: "3", puntos: 0 },
    { categoria: "4", puntos: 0 },
    { categoria: "5", puntos: 0 },
    { categoria: "6", puntos: 0 },
    { categoria: "Escalera", puntos: 0 },
    { categoria: "Full", puntos: 0 },
    { categoria: "Poker", puntos: 0 },
    { categoria: "Generala", puntos: 0 },
  ])


  const elegirDado = (dadoElegido) => {
    setDados({ elegidos: [...dados.elegidos, dadoElegido], tarro: dados.tarro.filter(dado => dado.id !== dadoElegido.id) })
  }

  const aleatorio = () => Math.floor(Math.random() * 6) + 1

  const aleatorios = (cantidad) => [...Array(cantidad)].map(() => aleatorio())

  const tirarDados = () => {
    const numerosAleatorios = aleatorios(dados.tarro.length)
    setDados({ ...dados, tarro: dados.tarro.map((dado, i) => ( { ...dado, numero: numerosAleatorios[i] } ))})
  }

  return(
    <Modal className="modal-jugar">
      <div className="modal-body">
        <div className="container contenedor-modal-jugar">
          <div className="row fila-modal-jugar fila-principal-modal-jugar">
            <div className="col columna-modal-jugar">
              <div className="row justify-content-center align-items-start fila-modal-jugar">
                <Dados titulo="Dados elegidos" dados={ dados.elegidos } />
              </div>
            </div>
            <div className="col columna-modal-jugar">
              <div className="row align-items-center fila-modal-jugar"></div>
              <div className="row justify-content-center align-items-end fila-modal-jugar">
                <Dados titulo="Dados en el tarro" horizontal={true} alClickearDado={ elegirDado } dados={ dados.tarro } />
                <div className="row justify-content-center">
                  <button onClick={ tirarDados } className="btn btn-success boton-tirar-los-dados">Tirar los dados</button>
                </div>
              </div>
            </div>
            <div className="col columna-modal-jugar">
              <div className="row align-items-start fila-modal-jugar">
                <TablaPuntajes nombreUsuario={ nombre } puntajes={ puntajes } />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Jugar