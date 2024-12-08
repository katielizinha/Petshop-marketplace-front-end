import { useEffect, useState } from 'react'
import './animais.css'
import { Link } from "react-router-dom";


// Tipo para animais
type AnimalType = {
  id: number,
  nomeAnimal: string,
  peso: string,
  idade: string,
  raca: string,
  consultaRealizada: string,
  imagem: string
}


function AnimaisApp() {
  const [animais, setAnimais] = useState<AnimalType[]>([])


  // useEffect para carregar os animais
  useEffect(() => {
      // Buscar os animais
    fetch("https://petshop-marketplace.onrender.com/animais")
    .then(resposta => resposta.json())
    .then(dados => setAnimais(dados))
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
                <li><Link to="/consulta">Consultas Realizadas</Link></li>
                <li><Link to="/donos">Donos</Link></li>
                <li><Link to="/animais">Animais</Link></li>
              </ul>
            </nav>
          </div>
      </header>

      {/* Listagem de Animais */}
      <div className="animais-container">
        <h1 className='titulo-animal'>Animais</h1>
        <div className="animais-list">
          {
            animais.map(animal => (
              <div key={animal.id} className="animal-item">
                <div className='container-imagem'>
                  <img className="foto-animal" src={animal.imagem} alt="Foto do animal" />
                </div>
                <h1 className="animal-nome">{animal.nomeAnimal}</h1> {/* Use h3 para o nome do animal */}
                <p className="animal-peso">Peso: {animal.peso}</p>
                <p className="animal-idade">Idade: {animal.idade}</p>
                <p className="animal-raca">Raça: {animal.raca}</p>
                <p className="animal-consulta">Consulta realizada: {animal.consultaRealizada}</p>
                <a href='#'>Detalhes do animal</a>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export default AnimaisApp
