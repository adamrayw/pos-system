import axios from "axios"
import { useState } from "react"
import { useApiDaftar } from "../../../../../services/api.service"
import AlertError from "../../Alert/AlertError"
import { validatePassword } from "../../../../../utils/validatePassword.util"

function Daftar() {
    const [isLoginOpened, setIsLoginOpened] = useState(false)
    const [nama_usaha, setNamaUsaha] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errResponse, setErrResponse] = useState([])
    const [passwordValidation, setPasswordValidation] = useState('')

    console.log(errResponse)

    const handleDaftar = async (e) => {
        e.preventDefault()

        const data = {
            nama_usaha,
            email,
            password
        }

        if (!nama_usaha || !email || !password) {
            setErrResponse({
                status_text: "warning",
                message: "Please fill all the fields!"
            })
            return
        }

        try {
            setIsLoading(true)
            const response = await useApiDaftar('auth/daftar', data)
            if (response.err) {
                setErrResponse(response.response.data)
                setIsLoading(false)
                return
            }
            localStorage.setItem('user', JSON.stringify(response.response.data.data))
            localStorage.setItem('token', response.response.data.data.token)
            location.reload(true);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log("err" + error)
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        const errResponse = validatePassword(value);
        setPassword(value);
        setPasswordValidation(errResponse);
    };

    return (
        <>
            <input type="checkbox" id="modal-daftar" className="modal-toggle" onClick={() => setIsLoginOpened(!isLoginOpened)} checked={isLoginOpened} />
            <label htmlFor="modal-daftar" className="modal cursor-pointer">
                <label className="modal-box relative max-w-sm flex flex-col justify-center" >
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">Daftar Akun <span className='text-orange-500'>POSKU</span></h3>
                        <div className="flex items-center space-x-1 hover:cursor-pointer">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                className="text-orange-500"
                            >
                                <path d="M10 17v-3H3v-4h7V7l5 5-5 5m0-15h9a2 2 0 012 2v16a2 2 0 01-2 2h-9a2 2 0 01-2-2v-2h2v2h9V4h-9v2H8V4a2 2 0 012-2z" />
                            </svg>
                            <label htmlFor="modal-login" className="font-medium hover:cursor-pointer" onClick={() => setIsLoginOpened(!isLoginOpened)}>
                                Login
                            </label>
                        </div>
                    </div>
                    <hr className="w-10 mb-4" />
                    {errResponse !== null && (
                        <AlertError message={errResponse} />
                    )}
                    <form action="" className='space-y-2' onSubmit={handleDaftar}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Nama Usaha</span>
                            </label>
                            <input type="text" placeholder="Masukkan Nama Toko/Perusahaan/Kedai" className="input input-md input-bordered w-full" onChange={(e) => setNamaUsaha(e.target.value)} value={nama_usaha} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input type="email" placeholder="Masukkan Email" className="input input-md input-bordered w-full" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input type="password" placeholder="Masukkan Password" className={`input input-md input-bordered w-full ${passwordValidation ? "border border-red-400  focus:outline-red-200" : ""}`} onChange={handlePasswordChange} value={password} />
                            {passwordValidation && (
                                <div className="text-xs text-red-400 mt-2">{passwordValidation}</div>
                            )}
                        </div>
                        <div className='flex justify-end space-x-2'>
                            <div className="modal-action">
                                <label
                                    htmlFor="modal-daftar" className="btn btn-md text-xs btn-outline hover:bg-slate-800 border border-s-slate-800 text-slate-800"
                                    onClick={() => {
                                        setEmail('')
                                        setPassword('')
                                        setNamaUsaha('')
                                        setErrResponse(null)
                                    }}
                                >
                                    Batal
                                </label>
                            </div>
                            <div className="modal-action">
                                {isLoading ?
                                    (
                                        <button className="btn bg-slate-200 text-slate-800 loading border-0" >Sedang Mendaftar</button>
                                    ) : (
                                        <button type='submit' className="btn text-xs bg-orange-500 border-0 hover:bg-orange-600">Daftar</button>
                                    )}
                            </div>
                        </div>
                    </form>
                </label >
            </label >
        </>

    )
}

export default Daftar