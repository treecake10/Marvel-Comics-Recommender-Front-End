import Envelope from '../Icons/Envelope';
import Lock from '../Icons/Lock';

const Login = () => {

    return(
        <div className="home">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-text">Login</div>
                </div>
                <div className="auth-inputs">
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
                <div className="forgot-password">Lost Password? <span>click Here</span></div>
                <div className="auth-submit-container">
                    <div className="auth-submit">Login</div>
                </div>
            </div>
        </div>
    )
}
export default Login;