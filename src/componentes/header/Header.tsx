import {Link} from 'react-router-dom';
function Header(){
    return(
        <header className="site-header">
        
        
                <nav className="navigation">
                  <ul>
                    <Link to="/">Home</Link>
                    <Link to="/cadastro-produto">Cadastro de Produto</Link>
                  </ul>
                </nav>
        
                <div className="header-actions">
                  <button className="login-button">Login</button>
                </div>
              </header>
    )
}

export default Header;