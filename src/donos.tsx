import { useEffect, useState } from 'react'
import './donos.css'
import { Link } from "react-router-dom";
type DonosType = {
    id:number,
    nomeDono:string,
    nomeAnimal:string,
    CPF:string,
    telefone:string,
    dataCadastro:string,
    imagem:string
}

function Donos() {
  const [donos, setDonos] = useState<DonosType[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/Donos")
      .then(resposta => resposta.json())
      .then(dados => setDonos(dados))
  }, [])

  return (
    <>
      <header className="site-header">
<div className="cabecalho">
  <div className="logo">CatShop</div>
    <nav className="navigation">
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li>
            <Link to="/funcionarios">Funcionarios</Link>  {/**No lugar do "a href" use o componente LINK */}
            </li>
            <li><a href="#contato">Marcar consultos</a></li>
            <li><Link to="/donos">Donos</Link></li>
        </ul>
    </nav>
  </div>
</header>
      
      {/* Listagem de Donos */}
      <div className="donos-container">
      <h1 className="titulo-donos">Donos</h1>
      <div className="donos-list">
        {
          donos.map(dono => (
            <div key={dono.id} className="donos-item">
              <div className='container-imagem'>
                  <img className="foto-donos" src={dono.imagem} alt="Foto dono" />
                </div>
              <h3 className="donos-nome"> {dono.nomeDono}</h3>
              <p>Animal: {dono.nomeAnimal}</p>
              <p>CPF: {dono.CPF}</p>
              <p>Telefone:{dono.telefone}</p>
              <p>Data de Cadastro: {new Date(dono.dataCadastro).toLocaleDateString()}</p>
            </div>
            ))
        }  
        </div> {/* Fechando a div aqui */}
        </div>
    </>
  )
}  


export default Donos