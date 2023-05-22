import { useState } from 'react';
import posku from '../../../assets/posku-logo.png';
import { useApiLogin } from '../../../services/api.service';
import AlertError from '../../../components/Alert/AlertError';
import ModalSubscription from '../../../components/Modal/ModalSubscription';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errResponse, setErrResponse] = useState({});
    const [modal, setModal] = useState(false);

    const handleUsernameChange = event => setUsername(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);


    // handle login logic here
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            setErrResponse({
                status_text: "warning",
                message: "Please fill all the fields!"
            })
            return
        }

        const data = {
            email,
            password
        }

        try {
            setIsLoading(true)
            setErrResponse({})
            const response = await useApiLogin('auth/login', data)
            if (response.err) {
                setErrResponse(response.response.data)
                setIsLoading(false)
                return
            }

            if (response.response.data.data.isHaveActiveSubscription) {
                localStorage.setItem('user', JSON.stringify(response.response.data.data))
                localStorage.setItem('token', response.response.data.data.token)
                // Refresh the current page and force a server refresh
                window.location.href = '/'
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setModal(true)
            }
        } catch (error) {
            setIsLoading(false)
        }
    };

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const subscriptionProps = {
        isExpired: false,
        onClose: closeModal,
        buttonText: 'Subscribe Now',
    };

    return (
        <div className="md:px-12 px-4">
            <div className="flex flex-col w-full max-w-md mx-auto mt-8 px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-6 text-xl font-light text-gray-500 sm:text-2xl">
                    <img src={posku} alt="logo" className='w-auto h-10' />
                </div>
                <div>
                    {errResponse.status_text && <AlertError message={errResponse} />}
                </div>
                <div>
                    {modal && <ModalSubscription {...subscriptionProps} />}
                </div>
                <div className="mt-8">
                    <form action="#" autoComplete="off" onSubmit={handleLogin}>
                        <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                        </path>
                                    </svg>
                                </span>
                                <input type="text" id="sign-in-email" className={`rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${isLoading ? 'hover:cursor-not-allowed' : ''}`} disabled={`${isLoading ? 'true' : ''}`} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                        </path>
                                    </svg>
                                </span>
                                <input type="password" id="sign-in-email" className={`rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparen ${isLoading ? 'hover:cursor-not-allowed' : ''}`} disabled={`${isLoading ? 'true' : ''}`} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex items-center mb-6 -mt-4">
                            <div className="flex ml-auto">
                                <a href="#" className="inline-flex text-xs font-normal text-gray-500 sm:text-sm hover:text-gray-700">
                                    Lupa Password?
                                </a>
                            </div>
                        </div>
                        <div className="flex w-full">
                            {isLoading ?
                                (
                                    <button className="py-2 px-4  bg-orange-700 hover:cursor-not-allowed text-white w-full transition ease-in text-center text-base font-semibold shadow-md rounded-lg ">
                                        Loggin in...
                                    </button>
                                ) : (
                                    <button type="submit" className="py-2 px-4  bg-orange-500 hover:bg-orange-500 active:bg-orange-700 text-white w-full transition ease-in text-center text-base font-semibold shadow-md rounded-lg ">
                                        Login
                                    </button>
                                )}
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <a href="https://posku-main.vercel.app/" target="_blank" className="inline-flex items-center tracking-wide text-sm font-normal text-center text-gray-500 hover:text-gray-700 ">
                        <span className="ml-2">
                            Belum berlangganan?
                        </span>
                    </a>
                </div>
            </div>
        </div>

    );
};

export default Login;
