import React from 'react'
import './estilos/CursorLinkAutomatico.css'

const CursorLinkAutomatico = ({ onClick, children }) => <div {...(onClick ? { onClick } : {})} className={`cursor-link ${onClick ? "cursor-link-activado" : ""}`}>{children}</div>

export default CursorLinkAutomatico