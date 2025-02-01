import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./CadastroProdutos.css";

function CadastroProduto() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [data_producao, setData_producao] = useState("");
  const [imagem, setImagem] = useState("");

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
   // Converte a data para o formato yyyy-mm-dd
      const dataProducaoFormatada = data_producao.split('/').reverse().join('-');
    try {
      const resposta = await fetch("https://petshop-marketplace.onrender.com/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id,
          nome: nome,
          descricao: descricao,
          preco: preco,
          data_producao: dataProducaoFormatada,
          imagem: imagem
        })
      });
      if (resposta.status !== 500) {
        alert("Produto Cadastrado com Sucesso");
        navigate("/");
      } else {
        const mensagem = await resposta.text();
        alert("Erro ao Cadastrar Produto - Error: " + mensagem);
      }
    } catch(e){
      alert("Servidor não está respondendo.");
    }
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove caracteres que não sejam números e reformatar a string
    value = value.replace(/\D/g, ""); // Apenas números

    // Aplica a formatação condicionalmente
    if (value.length > 2 && value.length <= 4) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    } else if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    }

    // Limita o valor ao formato completo dd/mm/yyyy
    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    setData_producao(value);
  };

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

      
      <div className="container-cadastro-produto">
       <h1 className="titulo-produto">Bem-vindo de volta!</h1>
       <div className="cadastro-produto-list">
          <div className="left-cadastro-produto">
            <img
              src="https://imagensemoldes.com.br/wp-content/uploads/2020/09/Imagem-Cachorro-e-Gato-PNG.png"
              alt="Ilustração"
            />
          </div>
          <div className="right-cadastro-produto">
            <div className="form-container-produto">
              <h1>Cadastro de Produtos</h1>
              <form onSubmit={handleForm}>
                <input
                  placeholder="ID"
                  type="text"
                  name="id"
                  id="id"
                  onChange={(e) => setId(e.target.value)}
                />
                <input
                  placeholder="Nome"
                  type="text"
                  name="nome"
                  id="nome"
                  onChange={(e) => setNome(e.target.value)}
                />
                <input
                  placeholder="Descrição"
                  type="text"
                  name="descricao"
                  id="descricao"
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                  placeholder="Preço"
                  type="text"
                  name="preco"
                  id="preco"
                  onChange={(e) => setPreco(e.target.value)}
                />
                <input
                  placeholder="Data de Produção"
                  type="text"
                  name="data_producao"
                  id="data_producao"
                  value={data_producao}
                  onChange={handleDataChange}
                  maxLength={10} // Limita a 10 caracteres
                  pattern="\d{2}/\d{2}/\d{4}" // Avisa que o formato é dd/mm/yyyy
                  required
                />
                <input
                  placeholder="URL da Imagem"
                  type="text"
                  name="imagem"
                  id="imagem"
                  onChange={(e) => setImagem(e.target.value)}
                />
                <input className="botao-enviar-produto" type="submit" value="Cadastrar" />
              </form>
            </div>
        </div>
      </div>
      </div> 
    </>
  );
}

export default CadastroProduto;
