import User from '../Icons/User';
import Envelope from '../Icons/Envelope';
import Lock from '../Icons/Lock';

const Register = () => {

    return(
        <div className="home">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-text">Sign Up</div>
                </div>
                <div className="auth-inputs">
                    <div className="auth-input">
                        <div className="auth-img">
                            <User/>
                        </div>
                        <input type="text" placeholder="Name"/>
                    </div>
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
                <div className="auth-submit-container">
                    <div className="auth-submit">Sign Up</div>
                </div>
            </div>
        </div>
    )
}
export default Register;