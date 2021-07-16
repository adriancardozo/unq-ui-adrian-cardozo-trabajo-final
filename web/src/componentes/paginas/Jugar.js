import React, { useState } from 'react'
import { useParams } from 'react-router';
import Dados from '../auxiliares/Dados';
import Modal from '../auxiliares/Modal';
import ModalSeleccionCategoria from '../auxiliares/ModalSeleccionCategoria';
import TablaPuntajes from '../auxiliares/TablaPuntajes';
import './estilos/ModalJugar.css'

const Jugar = (props) => {
  const [dados, setDados] = useState({ elegidos: [], tarro: [{id: 1, numero: 1}, {id: 2, numero: 2}, {id: 3, numero: 3}, {id: 4, numero: 4}, {id: 5, numero: 5}] })
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
  const [turno, setTurno] = useState({ numero: 0, tiradas: 0 })
  const [claseHabilitado, setClaseHabilitado] = useState("")
  const [termino, setTermino] = useState(false)
  const [seleccionarCategoria, setSeleccionarCategoria] = useState(false)
  const [elegirDados, setElegirDados] = useState(false)

  const elegirDado = (dadoElegido) => {
    const dadosActualizados = { elegidos: [...dados.elegidos, dadoElegido], tarro: dados.tarro.filter(dado => dado.id !== dadoElegido.id) }
    setDados(dadosActualizados)
    if(dadosActualizados.tarro.length === 0){
      seleccionarCategoriaNumero(dados)
    }
  }

  const aleatorio = () => Math.floor(Math.random() * 6) + 1

  const aleatorios = (cantidad) => [...Array(cantidad)].map(() => aleatorio())

  const terminar = () => {
    setClaseHabilitado("disabled")
    setTermino(true)
  }

  const resetearDados = () => {
    setDados({ elegidos: [], tarro: [{id: 1, numero: 1}, {id: 2, numero: 2}, {id: 3, numero: 3}, {id: 4, numero: 4}, {id: 5, numero: 5}] })
    setElegirDados(false)
  }

  const actualizarTurno = () => {
    if(turno.numero + (Math.floor(turno.tiradas + 1) / 3) === 10) {
      terminar()
    }
    else {
      setTurno({ numero: turno.numero + (Math.floor((turno.tiradas + 1) / 3)), tiradas: (turno.tiradas + 1) % 3 })
    }
  }

  const agruparIguales = (numeros) => {
    return [...new Set(numeros)].map(numeroGrupo => ({ numero: numeroGrupo, cantidad: numeros.map(numero => (numero === numeroGrupo) + 0).reduce((n1, n2) => n1 + n2) }))
  }

  const obtenerFull = (dados) => {
    const grupos = agruparIguales(dados.map(dado => dado.numero))
    if(grupos.length === 2  && ((grupos[0].cantidad === 3 && grupos[1].cantidad === 2) || (grupos[0].cantidad === 2 && grupos[1].cantidad === 3))) {
      return { categoria: "Full", puntos: 30, juego: dados }
    }
    return undefined
  }

  const obtenerPoker = (dados) => {
    const grupos = agruparIguales(dados.map(dado => dado.numero))
    if(grupos.length === 2  && grupos[0].cantidad === 4) {
      return { categoria: "Poker", puntos: 40, juego: dados.filter(dado => dado.numero === grupos[0].numero) }
    }
    else if(grupos.length === 2  && grupos[1].cantidad === 4) {
      return { categoria: "Poker", puntos: 40, juego: dados.filter(dado => dado.numero === grupos[1].numero) }
    }
    return undefined
  }

  const obtenerGenerala = (dados) => {
    const grupos = agruparIguales(dados.map(dado => dado.numero))
    if(grupos.length === 1) {
      return { categoria: "Generala", puntos: 60, juego: dados }
    }
    return undefined
  }

  const obtenerEscalera = (dados) => {
    if(JSON.stringify(dados.map(dado => dado.numero).sort()) === JSON.stringify([1,2,3,4,5]) || JSON.stringify(dados.map(dado => dado.numero).sort()) === JSON.stringify([2,3,4,5,6])) {
      return { categoria: "Escalera", puntos: 20, juego: dados }
    }
    return undefined
  }

  const obtenerJuego = (categoria, dados) => {
    switch (categoria) {
      case "Escalera":
        return obtenerEscalera(dados)
      case "Full":
        return obtenerFull(dados)
      case "Poker":
        return obtenerPoker(dados)
      case "Generala":
        return obtenerGenerala(dados)
      default:
        return undefined
    }
  }

  const categoriasNumeroAbiertas = () => {
    return puntajes.slice(0, 6).filter(puntaje => puntaje.puntos === 0)
  }

  const categoriasJuegoAbiertas = () => {
    return puntajes.slice(6).filter(puntaje => puntaje.puntos === 0)
  }

  const juegoMayor = (dados) => {
    return categoriasJuegoAbiertas().map(categoria => obtenerJuego(categoria.categoria, dados)).filter(juego => !!juego)[0]
  }

  const anotarPuntosCategoriaNumero = (categoria) => {
    const puntos = obtenerDados(dados).filter(dado => dado.numero === (parseInt(categoria.categoria))).length * parseInt(categoria.categoria)
    setPuntajes(puntajes.map(puntaje => puntaje.categoria === categoria.categoria ? { ...puntaje, puntos } : puntaje))
    resetearTurno(turno)
    resetearDados()
  }

  const anotarPuntos = (juego) => {
    setPuntajes(puntajes.map(puntaje => puntaje.categoria === juego.categoria ? { ...puntaje, puntos: juego.puntos } : puntaje))
  }

  const seleccionarCategoriaNumero = (dados) => {
    if(categoriasNumeroAbiertas().length > 0){
      setSeleccionarCategoria(true)
    }
    else {
      resetearTurno(turno)
      resetearDados()
    }
  }

  const resetearTurno = (turnoAnterior) => {
    if(turnoAnterior.numero === 9){
      setTurno({ numero: turnoAnterior.numero, tiradas: 2 })
      terminar()
    } 
    else {
      setTurno({ numero: turnoAnterior.numero + 1, tiradas: 0 })
    }
  }

  const terminarTirada = (dados, turnoAnterior) => {
    const juego = juegoMayor(dados)
    if(juego){
      anotarPuntos(juego)
      resetearTurno(turnoAnterior)
      resetearDados()
    }
    else if(turnoAnterior.tiradas === 2){
      seleccionarCategoriaNumero(dados)
    } 
    else {
      actualizarTurno(turnoAnterior)
    }
  }

  const tirarDados = () => {
    setElegirDados(true)
    const numerosAleatorios = aleatorios(dados.tarro.length)
    const dadosActualizados = { ...dados, tarro: dados.tarro.map((dado, i) => ( { ...dado, numero: numerosAleatorios[i] } ))}
    setDados(dadosActualizados)
    terminarTirada(obtenerDados(dadosActualizados), turno)
  }

  const obtenerDados = (dados) => {
    return [...(dados.tarro), ...(dados.elegidos)]
  }

  return(
    <>
    <Modal className="modal-jugar">
    {seleccionarCategoria && <ModalSeleccionCategoria dados={ obtenerDados(dados)} alClickearCategoria={ anotarPuntosCategoriaNumero } categorias={categoriasNumeroAbiertas()} alCerrar={ () => setSeleccionarCategoria(false) }></ModalSeleccionCategoria>}
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
                <Dados titulo="Dados en el tarro" horizontal={true} {...(elegirDados ? { alClickearDado: elegirDado } : {}) } dados={ dados.tarro } />
                <div className="row justify-content-center">
                  <button onClick={ tirarDados } className={`btn btn-success ${claseHabilitado} boton-tirar-los-dados`}>Tirar los dados</button>
                </div>
                <h6>Turno: {turno.numero + 1}</h6>
                <h6>Tiradas restantes: {termino ? 0 : 3 - turno.tiradas}</h6>
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
    </>
  );
}

export default Jugar