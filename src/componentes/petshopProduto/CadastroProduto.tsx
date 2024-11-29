

import { FormEvent, useState } from "react"
import { useNavigate } from 'react-router-dom';
function CadastroProduto(){
    const navigate = useNavigate()
    const [id,setId] = useState("")
    const [nome,setNome] = useState("")
    const [descricao,setDescricao] = useState("")
    const [preco,setPreco] = useState("")
    const [data_producao,setData_producao] = useState("")
    const [imagem,setImagem] = useState("")
    async function handleForm(event:FormEvent){
        event.preventDefault()
        try{
            const resposta = await fetch("http://localhost:8000/produtos",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    id:id,
                    nome:nome,
                    descricao:descricao,
                    preco:preco,
                    data_producao:data_producao,
                    imagem:imagem
                })
            })
            if(resposta.status!=500){
                alert("Produto Cadastro com Sucesso")
                navigate("/")
            }
            else{
                const mensagem = await resposta.text()
                alert("Erro ao Cadastrar Produto - Error: "+mensagem)
            }
        }
        catch(e){
            alert("Servidor não está respondendo.")
        }
    }
    return (
        <>
          {/* Mensagem de boas-vindas */}
          <div className="mensagem">Bem-vindo de volta!</div>
    
          {/* Contêiner do formulário e imagem */}
          <div className="container">
            {/* Lado esquerdo */}
            <div className="left">
              <img
                src="https://www.castrabus.com.br/uploads/blog_posts/3/thumb-800-0/a67470ab30e987abc9e559231ac36389.png"
                alt="Ilustração"
              />
            </div>
    
            {/* Lado direito */}
            <div className="right">
              <div className="form-container">
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
                    type="date"
                    name="data_producao"
                    id="data_producao"
                    value={data_producao}
                    onChange={(e) => setData_producao(e.target.value)}
                    placeholder="Data Produção"
                  />
                
                  <input
                    placeholder="URL da Imagem"
                    type="text"
                    name="imagem"
                    id="imagem"
                    onChange={(e) => setImagem(e.target.value)}
                  />
                  <input type="submit" value="Cadastrar" />
                </form>
              </div>
            </div>
          </div>
        </>
      );
    }
    
    
    export default CadastroProduto;
    