import { useEffect, useState } from 'react'
import './consulta.css'
import { Link } from "react-router-dom";

// Tipo para consulta
type ConsultaType = {
  id: number,
  dataConsulta: string,
  nomePaciente: string,
  tipoConsulta: string,
  veterinario: string,
}

function ConsultaApp() {
  const [consulta, setConsulta] = useState<ConsultaType[]>([])

  useEffect(() => {
      // Buscar consulta
    fetch("https://petshop-marketplace.onrender.com/consulta")
    .then(resposta => resposta.json())
    .then(dados => setConsulta(dados))
  }, [])

  return (
    <>

<header className="site-header">
          <div className="cabecalho"> 
            <div className="logo">CatShop</div>
            <nav className="navigation">
              <ul>
              <li><Link to="/produtos">Produtos</Link></li>
                <li>
                    <Link to="/funcionarios">Funcionários</Link>  {/**No lugar do "a href" use o componente LINK */}
                </li>
                <li><Link to="/consulta">Marcar Consultas</Link></li>
                <li><Link to="/donos">Donos</Link></li>
                <li><Link to="/animais">Animais</Link></li>
              </ul>
            </nav>
          </div>
      </header>
     
      {/* Listagem de Consulta */}
      <div className="consulta-container">
        <h1 className='titulo-consulta'>Consulta</h1>
        <div className="consulta-list">
          {
            consulta.map(consulta => (
              <div key={consulta.id} className="consulta-item">
                <h1 className="consulta-tipoConsulta">{consulta.tipoConsulta}</h1>
                <p className="consulta-nome">Nome paciente: {consulta.nomePaciente}</p> {/* Use h3 para o nome do produto */}
                <p className="nome-Veterinario"> Nome Médico: {consulta.veterinario}</p>
                <p className="consulta-dataConsulta">Data consulta:{new Date(consulta.dataConsulta).toLocaleDateString()}</p>
                <a href='#'>Detalhes do Prontuário</a>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default ConsultaApp
