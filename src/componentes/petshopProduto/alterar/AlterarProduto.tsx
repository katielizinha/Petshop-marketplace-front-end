import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './AlterarProdutos.css'

function AlterarProduto(){
    const { id } = useParams()
    useEffect(() => {
        fetch(`https://petshop-marketplace.onrender.com/produtos/${id}`)
            .then(resposta => resposta.json())
            .then(dados => {
                setNome(dados.nome)
                setPreco(dados.preco)
                setDescricao(dados.descricao)
                
                // Formatar a data para 'yyyy-mm-dd'
                const dataFormatada = new Date(dados.data_producao).toISOString().split('T')[0];
                setDataproducao(dataFormatada)
    
                setImagem(dados.imagem)
            })
    }, [])  // Adicionei id como dependência para garantir que o efeito seja executado toda vez que o id mudar
    
    const navigate = useNavigate()
    const [nome,setNome] = useState("")
    const [descricao,setDescricao] = useState("")
    const [preco,setPreco] = useState("")
    const [data_producao, setDataproducao] = useState("")
    const [imagem,setImagem] = useState("")

    async function handleForm(event:FormEvent){
        event.preventDefault()
        try{
            const resposta = await fetch(`https://petshop-marketplace.onrender.com/produtos/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    nome:nome,
                    descricao:descricao,
                    preco:preco,
                    data_producao:data_producao,
                    imagem:imagem
                })
            })
            if(resposta.status!=500){
                alert("Produto Alterado com Sucesso")
                navigate("/")
            }
            else{
                const mensagem = await resposta.text()
                alert("Erro ao Alterar Produto - Error: "+mensagem)
            }
        }
        catch(e){
            alert("Servidor não está respondendo.")
        }
       
    }
    function handleNome(event:ChangeEvent<HTMLInputElement>){
        setNome(event.target.value)
    }
    function handleDescricao(event:ChangeEvent<HTMLInputElement>){
        setDescricao(event.target.value)
    }
    function handlePreco(event:ChangeEvent<HTMLInputElement>){
        setPreco(event.target.value)
    }
    function handleImagem(event:ChangeEvent<HTMLInputElement>){
        setImagem(event.target.value)
    }
    function handleDataproducao(event:ChangeEvent<HTMLInputElement>){
        setDataproducao(event.target.value)
    }
    return(
        <>
         <div className="container-alterar-produto">
            <h1>Alterar Produto</h1>
            <div className="alterar-produto-list">
             <div className="form-container-produto-alterar">
                    <form onSubmit={handleForm}>
                            <label htmlFor="id"></label>
                            <input placeholder="Id" type="text" name="id" id="id" value={id} readOnly/>
                            <div>
                                <label htmlFor="imagem">URL Imagem</label>
                                <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" value={imagem} onChange={handleImagem} />
                                {imagem && <img className="imagem-produto-alterar" src={imagem} alt="Imagem do Produto" />}
                            </div>


                            <div>
                                <label htmlFor="nome">Nome</label>
                                <input placeholder="Nome" type="text" name="nome" id="nome" value={nome} onChange={handleNome} />
                            </div>
                            <div>
                                <label htmlFor="preco">Preço</label>
                                <input placeholder="Preço" type="text" name="preco" id="preco" value={preco} onChange={handlePreco} />
                            </div>
                            <div>
                                <label htmlFor="descricao">Descrição</label>
                                <input placeholder="Descrição" type="text" name="descricao" id="descricao" value={descricao} onChange={handleDescricao} />
                            </div>
                            <div>
                                <label htmlFor="data_producao">Data de Produção</label>
                                <input placeholder="Data Produção" type="date" name="data_producao" id="data_producao" value={data_producao} onChange={handleDataproducao} />
                            </div>
                           
                        <div>
                            <input type="submit" value="Alterar" />
                        </div>
                   
                    </form>
              </div>
            </div>  
          </div>
           
        </>
    )
}


export default AlterarProduto;