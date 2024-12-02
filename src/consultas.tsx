import { useEffect, useState } from 'react'
import './consulta.css'
import { Link } from "react-router-dom";

// Tipo para consulta
type ConsultaType = {
  id: number,
  nomePaciente: string,
  tipoConsulta: string,
  nomeVeterinario: string,
 dataConsulta: number

}

function ConsultaApp() {
  const [consulta, setConsulta] = useState<ConsultaType[]>([])



  useEffect(() => {
      // Buscar consulta
    fetch("http://localhost:8000/consulta")
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
            <li><a href="#produtos">Produtos</a></li>
            <li>
                <Link to="/funcionarios">Funcionários</Link>  {/**No lugar do "a href" use o componente LINK */}
            </li>
            <li><a href="#contato">Marcar consultas</a></li>
            <li><Link to="/donos">Donos</Link></li>
            <li><Link to="/animais">Animais</Link></li>
          </ul>
        </nav>
      </div>
      <div className="header-actions">
        <button className="login-button">Login</button>
      </div>
      </header>
     
      {/* Listagem de Consulta */}
      <div className="consulta-container">
        <h1 className='titulo-consulta'>Consulta</h1>
        <div className="cons-list">
          {
            consulta.map(consulta => (
              <div key={consulta.id} className="consulta-item">
                <h1 className="consulta-nome">{consulta.nomePaciente}</h1> {/* Use h3 para o nome do produto */}
                <p className="consulta-nomePaciente">Tipo da Consulta: {consulta.tipoConsulta}</p>
                <p className="nome-Veterinario"> {consulta.nomeVeterinario}</p>
                <p className="consulta-dataConsulta">{consulta.dataConsulta}</p>
                <a href='#'>Conhecer profissional</a>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default ConsultaApp
