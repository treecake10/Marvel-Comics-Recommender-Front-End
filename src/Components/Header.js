import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from "./Button";
import MarvelLogo from '../Images/Marvel_Logo.svg.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Components/State/Auth/Action';

const Header = ({ isAuthenticated }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { auth } = useSelector(store => store);

    const navigateToHome = () => {
        navigate('/');
    };

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
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
                    <li><Link to="/recommend">Recommend</Link></li>
                    <li><a href="/">Battle Simulator</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </nav>
            <div className='btn'>
                {isAuthenticated ? (
                    <Button
                        className="button"
                        text="Logout"
                        handleClick={handleLogout}
                    />
                ) : (
                    <Link to="/authentication?type=homeAuth">
                        <Button
                            className="button"
                            text="Login"
                        />
                    </Link>
                )}
            </div>
        </div>
    )
}
export default Header;