
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';

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

    const backToSignin = (): void => {
        navigate('/signin');
    }


    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
                <p className='py-2'>
                    Already have an account yet?{' '}
                    <button onClick={backToSignin} >
                        Sign in.
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
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export { SignupPage }