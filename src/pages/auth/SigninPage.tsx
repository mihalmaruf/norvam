import { useContext, useState } from "react";
import { UserContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router";



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

    const goToRegister = (): void => {
        navigate('/register');
    }


    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl font-bold py-2'>Login</h1>
                <p className='py-2'>
                    Do not have an account yet?{' '}
                    <button onClick={goToRegister} >
                        Sign up.
                    </button>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Email Address</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className='border p-3'
                        type='email'
                    />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className='border p-3'
                        type='password'
                    />
                </div>
                <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                    Sign In
                </button>
            </form>
        </div>
    )
}

export { SigninPage }