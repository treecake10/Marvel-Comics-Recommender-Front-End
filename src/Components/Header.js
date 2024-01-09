import MarvelLogo from '../Images/Marvel_Logo.svg.png';

const Header = () => {

    return(
        <div className="header">
            <div className="logo">
                <h1><img src={MarvelLogo} alt="Marvel" className='marvel-logo'/></h1>
                <h1 className='myplace'>Myplace</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="/">Explore</a></li>
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