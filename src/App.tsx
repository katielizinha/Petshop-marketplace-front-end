import { useEffect, useState } from 'react'
import './App.css'
import { Link } from "react-router-dom";

// Tipo para produto
// teste do commit
type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  data_producao: string,
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
      {/* Listagem de Produtos */}
      <div className="produtos-container">
        <h1 className="titulo-produto">Produtos Catshop</h1>
        <div className="produtos-list">
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-item">
              <div className="container-imagem">
                <img src={produto.imagem} alt={`Imagem de ${produto.nome}`} />
              </div>
              <h3 className="produto-nome">{produto.nome}</h3>
              <p className="produto-descricao">{produto.descricao}</p>
              <p className="produto-data_producao">
                {/* Formatação da data */}
                {new Date(produto.data_producao).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <div className="produto-preco-botao">
                <span className="produto-preco">R$ {produto.preco}</span>
                <button className="botao-comprar">Comprar</button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão estilizado com Link */}
        <div className="link-cadastro-produtos-container">
          <Link to="/cadastro-produto" className="link-cadastro-produtos">
            Cadastrar Produtos
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
