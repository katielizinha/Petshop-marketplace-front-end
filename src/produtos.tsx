import { useEffect, useState } from 'react'
import './produtos.css'
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


function Produto() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])

 

  // useEffect para carregar produtos e usuários
  useEffect(() => {
  // Buscar os produtos
    fetch("https://petshop-marketplace.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
  }, [])

  function handleExcluir(id:number){
    alert(`Excluir o produto com id ${id}`)
    fetch(`https://petshop-marketplace.onrender.com/produtos/${id}`, {
      method: 'DELETE'
    })
    .then(resposta=>{
      if(resposta.status ===200){
        alert("Produto excluído com sucesso")
        window.location.reload()
      }else{
        alert("Erro ao excluir o produto: Confira o terminal do backend")
      }
    })
  }

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
              <p className="produto-data_producao">
  {/* Formatação da data */}
  {(() => {
    const data = new Date(produto.data_producao);
    data.setMinutes(data.getMinutes() + data.getTimezoneOffset()); // Ajusta a data para o fuso horário local
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  })()}
</p>

              </p>
              <div className="produto-preco-botao">
                <span className="produto-preco">R$ {produto.preco}</span>
                <button className="botao-comprar">Comprar</button>
              </div>
              <div className="botoes-funcao">
              <Link className="botaoAlterar" to={`/alterar-produto/${produto.id}`}>Alterar</Link>
              <button className="botaoExcluir" onClick={() => handleExcluir(produto.id)}>Excluir</button>
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

export default Produto;
