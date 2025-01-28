import {Link} from 'react-router-dom';
function Header(){
    return(
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
    )
}

export default Header;