import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


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
    
        setData_cadastro(value);
      };


return (
    <>
    <header className="site-header">
        <div className="cabecalho">
          <div className="logo">CatShop</div>
          <nav className="navigation">
            <ul>
              <li><a href="#produtos">Produtos</a></li>
              <li>
                <Link to="/funcionarios">Funcionários</Link>
              </li>
              <li><a href="#contato">Marcar consultas</a></li>
              <li><Link to="/donos">Donos</Link></li>
              <li><Link to="/animais">Animais</Link></li>
            </ul>
          </nav>
        </div>
    </header>


        {/* Mensagem de boas-vindas */}
        <div className="container-cadastro-dono">
            <h1 className="titulo-donos">Bem-vindo ao cadastro de Donos!</h1> 

            {/* Contêiner do formulário e imagem */}
            <div className="container-dono-list">
                {/* Lado esquerdo */}
                <div className="left-cadastro-dono">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/037/749/711/small_2x/ai-generated-dog-and-cat-on-transparent-background-free-png.png"
                        alt="Ilustração"
                    />
                </div>

                {/* Lado direito */}
                <div className="right-cadastro-dono">
                    <div className="form-container-dono">
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
                                placeholder="Data de Produção"
                                type="text"
                                name="data_cadastro"
                                id="data_cadastro"
                                value={data_cadastro}
                                onChange={handleDataChange}
                                maxLength={10} // Limita a 10 caracteres
                                pattern="\d{2}/\d{2}/\d{4}" // Avisa que o formato é dd/mm/yyyy
                                required
                                />
                            <input
                                placeholder="Nome do PET"
                                type="text"
                                name="nomeAnimal"
                                id="nomeAnimal"
                                onChange={(e) => setNome(e.target.value)}
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
        </div>
    </>
);
}


export default CadastroDonos;