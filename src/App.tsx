import { useEffect, useState } from 'react'
import './App.css'
import { Link } from "react-router-dom";

// Tipo para produtos
type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  data_producao: string,
  descricao: string,
  imagem: string
}


function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])

 

  // useEffect para carregar produtos e usuários
  useEffect(() => {
  // Buscar os produtos
    fetch("http://localhost:8000/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
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
              <li><a href="#contato">Cadastro</a></li>

            </ul>
          </nav>
        </div>
        <div className="header-actions">
          <button className="login-button">Login</button>
        </div>
      </header>
      {/* Listagem de Produtos */}
      <div className="produtos-container">
        <h1 className='titulo-produto'>Produtos</h1>
        <div className="produtos-list">
          {
            produtos.map(produto => (
              <div key={produto.id} className="produto-item">
                <h3 className="produto-nome">{produto.nome}</h3> {/* Use h3 para o nome do produto */}
                <div className='container-imagem'>
                  <img src={produto.imagem} alt="Imagem do produto" />
                </div>
                <p className="produto-preco">{produto.preco}</p>
                <p className="produto-data_producao">{produto.data_producao}</p>
                <p className="produto-descricao">{produto.descricao}</p>
                <button className="botao-comprar">Comprar</button>
              </div>
            ))
          }
        </div>
      </div>
      <li>
        <Link to="/cadastro-produto">Cadastrar Produtos</Link>  {/**No lugar do "a href" use o componente LINK */}
      </li>
      

      
    </>
  )
}

export default App