import { useState, useEffect } from 'react';
import User from './Icons/User';
import Envelope from './Icons/Envelope';
import Lock from './Icons/Lock';
import Button from './Button'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from './State/Auth/Action'

const Authentication = () => {
    const location = useLocation();
    const [action, setAction] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        dispatch(loginUser({userData:userData, navigate}))
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const type = searchParams.get('type');
        if (type) {
            if (type === 'getStarted') {
                setAction('Sign Up');
            } else if (type === 'homeAuth' || type === 'detailsPage') {
                setAction('Login');
            }
        }
    }, [location.search]);

    return(
        <div className="home">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-text">{action}</div>
                </div>
                <div className="auth-inputs">
                    {action==="Login"? null : <div className="auth-input">
                        <div className="auth-img">
                            <User/>
                        </div>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>}
                    
                    <div className="auth-input">
                        <div className="auth-img">
                            <Envelope/>
                        </div>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="auth-input">
                        <div className="auth-img">
                            <Lock/>
                        </div>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {action==="Sign Up"?<Button className={"auth-submit"} text={"Submit"}></Button>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
                {action==="Login"?<Button className={"auth-submit"} text={"Submit"} handleClick={handleSubmit}></Button> : null}
                <div className="auth-switch-container">
                    <div className={action==="Login"?"auth-switch gray":"auth-switch"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Sign Up"?"auth-switch gray":"auth-switch"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
            </div>
        </div>
    )
}
export default Authentication;