import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./AlterarDonos.css"
function AlterarDonos(){
    const { id } = useParams()
    useEffect(()=>{
        fetch(`https://petshop-marketplace.onrender.com/donos/${id}`)
        .then(resposta=>resposta.json())
        .then(dados=>{
            setNomeDono(dados.nomedono)
            setNomeAnimal(dados.nomeanimal)
            setCPF(dados.cpf)
            setTelefone(dados.telefone)
            setDataCadastro(dados.datacadastro )
            setImagem(dados.imagem)
        })
    },[])
    const navigate = useNavigate()
    const [nomedono,setNomeDono] = useState("")
    const [nomeanimal,setNomeAnimal] = useState("")
    const [cpf,setCPF] = useState("")
    const [telefone,setTelefone] = useState("")
    const [datacadastro, setDataCadastro] = useState("")
    const [imagem,setImagem] = useState("")
    async function handleForm(event:FormEvent){
        event.preventDefault()
        try{
            const resposta = await fetch(`https://petshop-marketplace.onrender.com/donos/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    nome:nomedono,
                    nomeanimal:nomeanimal,
                    cpf:cpf,
                    telefone:telefone,
                    dataCadastro:datacadastro,
                    imagem:imagem
                })
            })
            if(resposta.status!=500){
                alert("Dono Alterado com Sucesso")
                navigate("/")
            }
            else{
                const mensagem = await resposta.text()
                alert("Erro ao Alterar Dono - Error: "+mensagem)
            }
        }
        catch(e){
            alert("Servidor não está respondendo.")
        }
       
    }
    function handleNomeDono(event:ChangeEvent<HTMLInputElement>){
        setNomeDono(event.target.value)
    }
    function handleNomeAnimal(event:ChangeEvent<HTMLInputElement>){
        setNomeAnimal(event.target.value)
    }
    function handleCPF(event:ChangeEvent<HTMLInputElement>){
        setCPF(event.target.value)
    }
    function handleTelefone(event:ChangeEvent<HTMLInputElement>){
        setTelefone(event.target.value)
    }
    function handleDataCadastro(event:ChangeEvent<HTMLInputElement>){
        setDataCadastro(event.target.value)
    }
    function handleImagem(event:ChangeEvent<HTMLInputElement>){
        setImagem(event.target.value)
    }
   
    return(
        <>
            <div className="container-alterar-dono"> 
                <h1>Alterar Dono</h1>
                <div className="alterar-dono-list">
                    <div className="form-container-dono-alterar">
                        <form onSubmit={handleForm}>
                            <div>
                                <label htmlFor="id"></label>
                                <input placeholder="Id" type="text" name="id" id="id" value={id} readOnly/>
                            </div>
                            <div>
                                <label htmlFor="imagem">URL Imagem</label>
                                <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" value={imagem} onChange={handleImagem} />
                                {imagem && <img className="imagem-donos-alterar" src={imagem} alt="Imagem do Dono" />}
                            </div>
                            <div>
                                <label htmlFor="nomedono">Nome Dono</label>
                                <input placeholder="Nome Dono" type="text" name="nomedono" id="nomedono" value={nomedono} onChange={handleNomeDono} />
                            </div>
                            <div>
                                <label htmlFor="nomeanimal">Nome Animal</label>
                                <input placeholder="Nome Animal" type="text" name="nomeanimal" id="nomeanimal" value={nomeanimal} onChange={handleNomeAnimal} />
                            </div>
                            <div>
                                <label htmlFor="cpf">CPF</label>
                                <input placeholder="CPF" type="text" name="cpf" id="cpf" value={cpf} onChange={handleCPF} />
                            </div>
                            <div>
                                <label htmlFor="telefone">Telefone</label>
                                <input placeholder="Telefone" type="text" name="telefone" id="telefone" value={telefone} onChange={handleTelefone} />
                            </div>
                            <div>
                                <label htmlFor="datacadastro">Data Cadastro</label>
                                <input placeholder="Data Cadastro" type="text" name="datacadastro" id="datacadastro" value={datacadastro} onChange={handleDataCadastro} />
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


export default AlterarDonos;
