import { useContext } from "react";
import { UserContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router";



const SignOutPage = (): JSX.Element => {

    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await userContext?.logout();
            navigate('/signin');
        } catch (e) {
            console.log((e as Error).message);
        }
    };


    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl font-bold py-2'>Signout</h1>
                <p className='py-2'>
                    To Singn Out click on the button.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                    Sign Out
                </button>
            </form>
        </div>
    )
}

export { SignOutPage }