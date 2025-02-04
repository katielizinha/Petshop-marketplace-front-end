import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./AlterarDonos.css";

function AlterarDonos() {
    const { id } = useParams();
    
    // Carregando os dados ao montar o componente
    useEffect(() => {
        fetch(`https://petshop-marketplace.onrender.com/donos/${id}`)
        .then(resposta => resposta.json())
        .then(dados => {
            setNomeDono(dados.nomeDono);
            setNomeAnimal(dados.nomeAnimal);
            setCPF(dados.CPF);
            setTelefone(dados.telefone);
            // Formatar a data para 'yyyy-mm-dd'
            const dataFormatada = new Date(dados.dataCadastro).toISOString().split('T')[0];
            setDataCadastro(dataFormatada)
            setImagem(dados.imagem);
 
        })
    }, [id]); // Adicionando dependência de id para recarregar quando necessário

    const navigate = useNavigate();

    // Estado para armazenar os dados do formulário
    const [nomeDono, setNomeDono] = useState("");
    const [nomeAnimal, setNomeAnimal] = useState("");
    const [CPF, setCPF] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataCadastro, setDataCadastro] = useState("");
    const [imagem, setImagem] = useState("");

    // Função de envio do formulário
    async function handleForm(event: FormEvent) {
        event.preventDefault();
        
        // Aqui estamos mandando a data no formato 'yyyy-mm-dd', se necessário.
        const dataFormatada = new Date(dataCadastro).toISOString().split('T')[0]; // 'yyyy-mm-dd'

        try {
            const resposta = await fetch(`https://petshop-marketplace.onrender.com/donos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nomeDono: nomeDono,
                    nomeAnimal: nomeAnimal,
                    CPF: CPF,
                    telefone: telefone,
                    dataCadastro: dataFormatada, // Enviando a data formatada
                    imagem: imagem
                })
            });

            if (resposta.status !== 500) {
                alert("Dono Alterado com Sucesso");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao Alterar Dono - Error: " + mensagem);
            }
        } catch (e) {
            alert("Servidor não está respondendo.");
        }
    }

    // Funções para manipular as alterações nos campos de entrada
    function handleNomeDono(event: ChangeEvent<HTMLInputElement>) {
        setNomeDono(event.target.value);
    }

    function handleNomeAnimal(event: ChangeEvent<HTMLInputElement>) {
        setNomeAnimal(event.target.value);
    }

    function handleCPF(event: ChangeEvent<HTMLInputElement>) {
        setCPF(event.target.value);
    }

    function handleTelefone(event: ChangeEvent<HTMLInputElement>) {
        setTelefone(event.target.value);
    }

    function handleDataCadastro(event: ChangeEvent<HTMLInputElement>) {
        setDataCadastro(event.target.value);
    }

    function handleImagem(event: ChangeEvent<HTMLInputElement>) {
        setImagem(event.target.value);
    }

    return (
        <>
            <div className="container-alterar-dono">
                <h1>Alterar Dono</h1>
                <div className="alterar-dono-list">
                    <div className="form-container-dono-alterar">
                        <form onSubmit={handleForm}>
                            <div>
                                <label htmlFor="id"></label>
                                <input placeholder="Id" type="text" name="id" id="id" value={id} readOnly />
                            </div>
                            <div>
                                <label htmlFor="imagem">URL Imagem</label>
                                <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" value={imagem} onChange={handleImagem} />
                                {imagem && <img className="imagem-donos-alterar" src={imagem} alt="Imagem do Dono" />}
                            </div>
                            <div>
                                <label htmlFor="nomeDono">Nome Dono</label>
                                <input placeholder="Nome Dono" type="text" name="nomeDono" id="nomeDono" value={nomeDono} onChange={handleNomeDono} />
                            </div>
                            <div>
                                <label htmlFor="nomeAnimal">Nome Animal</label>
                                <input placeholder="Nome Animal" type="text" name="nomeAnimal" id="nomeAnimal" value={nomeAnimal} onChange={handleNomeAnimal} />
                            </div>
                            <div>
                                <label htmlFor="cpf">CPF</label>
                                <input placeholder="CPF" type="text" name="cpf" id="cpf" value={CPF} onChange={handleCPF} />
                            </div>
                            <div>
                                <label htmlFor="telefone">Telefone</label>
                                <input placeholder="Telefone" type="text" name="telefone" id="telefone" value={telefone} onChange={handleTelefone} />
                            </div>
                            <div>
                                <label htmlFor="datacadastro">Data Cadastro</label>
                                <input placeholder="Data Cadastro" type="date" name="datacadastro" id="datacadastro" value={dataCadastro} onChange={handleDataCadastro} />
                            </div>
                            <div>
                                <input type="submit" value="Alterar" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlterarDonos;
