
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';
import cover from "../../assets/image.jpg"
import "./Auth.scss"

const SignupPage = (): JSX.Element => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [, setError] = useState<string>('');
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await userContext?.createUser(email, password);
            navigate('/home');
        } catch (e) {
            setError((e as Error).message);
            console.log((e as Error).message);
        }
    };

    return (
<div className="auth">
<div className="imgBx">
    <img src={cover} alt="Login background image" />
</div>
<div className="contentBx">
    <div className="formBx">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="inputBx">
                <span>Email</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="inputBx">
                <span>Password</span>
                <input onChange={(e) => setPassword(e.target.value)} type='password' />
            </div>

                <button>
                    Sign In
                </button>
            <div className="inputBx">
                <p>Don't have an account yet? <Link to="/signin">Sign Up</Link></p>
            </div>
        </form>
    </div>
</div>
</div>
    )
}

export { SignupPage }