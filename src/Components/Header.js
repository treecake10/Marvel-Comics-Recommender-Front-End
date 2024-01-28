import { Link, useNavigate } from 'react-router-dom';
import MarvelLogo from '../Images/Marvel_Logo.svg.png';

const Header = () => {

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };

    return(
        <div className="header">
            <div className="logo">
                <h1 onClick={navigateToHome}><img src={MarvelLogo} alt="Marvel" className='marvel-logo'/></h1>
                <h1 className='myplace' onClick={navigateToHome}>Myplace</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/explore">Explore</Link></li>
                    <li><a href="/">Battle Simulator</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </nav>
            <div className='btn'>
                <button type="button">Login</button>
            </div>
            
        </div>
    )
}
export default Header;