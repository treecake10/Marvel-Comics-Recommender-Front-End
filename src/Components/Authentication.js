import { useState, useEffect } from 'react';
import User from './Icons/User';
import Envelope from './Icons/Envelope';
import Lock from './Icons/Lock';
import { useLocation } from 'react-router-dom';

const Authentication = () => {
    const location = useLocation();
    const [action, setAction] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const type = searchParams.get('type');
        if (type) {
            setAction(type === 'getStarted' ? 'Sign Up' : 'Login');
            setAction(type === 'homeAuth' ? 'Login' : 'Sign Up');
        }
    }, [location.search]);

    return(
        <div className="home">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-text">{action}</div>
                </div>
                <div className="auth-inputs">
                    {action==="Login"?<div></div>:<div className="auth-input">
                        <div className="auth-img">
                            <User/>
                        </div>
                        <input type="text" placeholder="Name"/>
                    </div>}
                    
                    <div className="auth-input">
                        <div className="auth-img">
                            <Envelope/>
                        </div>
                        <input type="email" placeholder="Email"/>
                    </div>
                    <div className="auth-input">
                        <div className="auth-img">
                            <Lock/>
                        </div>
                        <input type="password" placeholder="Password"/>
                    </div>
                </div>
                {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
                <div className="auth-submit-container">
                    <div className={action==="Login"?"auth-submit gray":"auth-submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Sign Up"?"auth-submit gray":"auth-submit"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
            </div>
        </div>
    )
}
export default Authentication;