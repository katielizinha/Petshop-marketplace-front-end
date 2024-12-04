import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';


function CadastroDonos() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [data_cadastro, setData_cadastro] = useState("");
    const [imagem, setImagem] = useState("");


    async function handleForm(event: FormEvent) {
        event.preventDefault();
        try {
            const resposta = await fetch("http://localhost:8000/donos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    nome: nome,
                    cpf: cpf,
                    telefone: telefone,
                    data_cadastro: data_cadastro,
                    imagem: imagem,
                })
            });


            if (resposta.status !== 500) {
                alert("Dono cadastrado com sucesso!");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao cadastrar dono - Erro: " + mensagem);
            }
        } catch (e) {
            alert("Servidor não está respondendo.");
        }
    }


    return (
        <>
            {/* Mensagem de boas-vindas */}
            <div className="mensagem">Bem-vindo ao cadastro de Donos!</div>


            {/* Contêiner do formulário e imagem */}
            <div className="container">
                {/* Lado esquerdo */}
                <div className="left">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/037/749/711/small_2x/ai-generated-dog-and-cat-on-transparent-background-free-png.png"
                        alt="Ilustração"
                    />
                </div>

                {/* Lado direito */}
                <div className="right">
                    <div className="form-container">
                        <h1>Cadastro de Donos</h1>
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
                                placeholder="CPF"
                                type="text"
                                name="cpf"
                                id="cpf"
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <input
                                placeholder="Telefone"
                                type="text"
                                name="telefone"
                                id="telefone"
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                            <input
                                type="date"
                                name="data_cadastro"
                                id="data_cadastro"
                                value={data_cadastro}
                                onChange={(e) => setData_cadastro(e.target.value)}
                                placeholder="Data de Cadastro"
                            />
                            <input
                               placeholder="Foto do Dono"
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


export default CadastroDonos;