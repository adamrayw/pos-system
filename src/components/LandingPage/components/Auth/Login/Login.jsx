import { useState } from "react"
import AlertError from "../../Alert/AlertError"
import { useApiLogin } from "../../../../../services/api.service"

function Login() {
    const [isLoginOpened, setIsLoginOpened] = useState(false)
    const [passwordValidation, setPasswordValidation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errResponse, setErrResponse] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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
            const response = await useApiLogin('auth/login', data)
            console.log(response.response.data)
            if (response.err) {
                setErrResponse(response.response.data)
                setIsLoading(false)
                return
            }
            localStorage.setItem('user', JSON.stringify(response.response.data.data))
            localStorage.setItem('token', response.response.data.data.token)
            // Refresh the current page and force a server refresh
            location.reload(true);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log("err: " + error)
        }
    }

    return (
        <>
            <input type="checkbox" id="modal-login" className="modal-toggle" onClick={() => setIsLoginOpened(!isLoginOpened)} checked={isLoginOpened} />
            <label htmlFor="modal-login" className="modal cursor-pointer">
                <label className="modal-box relative max-w-sm flex flex-col justify-center" htmlFor="">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">Login Akun <span className='text-orange-500'>POSKU</span></h3>
                        <div className="flex items-center space-x-1 hover:cursor-pointer">
                            <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                className="text-orange-500"
                            >
                                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
                            </svg>
                            <label htmlFor="modal-daftar" className="font-medium hover:cursor-pointer" onClick={() => setIsLoginOpened(!isLoginOpened)}>
                                Daftar
                            </label>
                        </div>
                    </div>
                    <hr className="w-10 mb-4" />
                    {errResponse !== null && (
                        <AlertError message={errResponse} />
                    )}
                    <form action="" className='space-y-2' onSubmit={handleLogin}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input type="email" placeholder="Masukkan Email" className="input input-md input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input type="password" placeholder="Masukkan Password" className="input input-md input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {passwordValidation && (
                            <div className="text-xs text-red-400 mt-2">{passwordValidation}</div>
                        )}
                        <div className="text-right mt-2">
                            <label htmlFor="modal-login" className="font-medium hover:cursor-pointer">
                                Lupa Password?
                            </label>
                        </div>
                        <div className='flex justify-end space-x-2'>
                            <div className="modal-action">
                                <label htmlFor="modal-login" className="btn btn-md text-xs btn-outline hover:bg-slate-800 border border-s-slate-800 text-slate-800">Batal</label>
                            </div>
                            <div className="modal-action">
                                {isLoading ?
                                    (
                                        <button className="btn bg-slate-200 text-slate-800 loading border-0" >Sedang Login</button>
                                    ) : (
                                        <button type='submit' className="btn text-xs bg-orange-500 border-0 hover:bg-orange-600">Login</button>
                                    )}
                            </div>
                        </div>
                    </form>


                </label>
            </label>
        </>

    )
}

export default Login