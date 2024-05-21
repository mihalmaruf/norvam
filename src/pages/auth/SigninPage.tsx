import { useContext, useState } from "react";
import { UserContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import cover from "../../assets/image.jpg"
import "./Auth.scss"

const SigninPage = (): JSX.Element => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [, setError] = useState<string>('');
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await userContext?.signIn(email, password);
            navigate('/');
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
        <h2>Login</h2>
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
                <p>Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
            </div>
        </form>
    </div>
</div>
</div>
    )
}

export { SigninPage }