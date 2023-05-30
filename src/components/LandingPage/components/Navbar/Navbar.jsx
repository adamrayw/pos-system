import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function Navbar(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            setIsLoggedIn(true);
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser({});
        window.location.href = '/';
    }

    const baseUrl = window.location.origin;
    return (
        <div className="navbar bg-base-100 md:px-10 py-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow-md bg-base-100 rounded w-52 space-y-2">
                        <li>
                            <a href={baseUrl + '/#fitur'} className="active:bg-gray-100 active:text-gray-700 text-gray-500 hover:text-gray-600 font-medium">Fitur</a>
                        </li>
                        <li><a href={baseUrl + '/#harga'} className="active:bg-gray-100 active:text-gray-700 text-gray-500 hover:text-gray-600 font-medium">Harga</a></li>
                        {isLoggedIn === false && (
                            <li>
                                <label htmlFor="modal-daftar" className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-0 md:px-4 py-0 flex justify-center items-center text-white md:text-sm text-xs font-medium">Daftar</label>
                            </li>
                        )}

                    </ul>
                </div>
                <Link to="/" className="flex items-center space-x-2">
                    <h1 className="px-2 normal-case text-2xl text-orange-500">
                        POSKU
                    </h1>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a href='#fitur' className="active:bg-gray-100 active:text-gray-700 text-gray-500 hover:text-gray-600 font-medium">Fitur</a>
                    </li>
                    <li>
                        <a href={baseUrl + '/#harga'} className="active:bg-gray-100 active:text-gray-700 text-gray-500 hover:text-gray-600 font-medium">Harga</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {isLoggedIn ?
                    (
                        <div className="dropdown dropdown-bottom dropdown-end ">
                            <div tabIndex={0} className="flex items-center active:bg-gray-50 rounded-full transition hover:cursor-pointer">
                                <div className="avatar placeholder rounded-full">
                                    <div className="bg-slate-900  text-neutral-content rounded-full w-12 mr-2">
                                        <span>{user.nama_usaha[0] + user.nama_usaha[1]}</span>
                                    </div>
                                </div>
                                <svg
                                    viewBox="0 0 512 512"
                                    fill="currentColor"
                                    height="1em"
                                    width="1em"
                                >
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={48}
                                        d="M112 184l144 144 144-144"
                                    />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu p-2 text-slate-800 shadow bg-base-100 rounded-box w-52">
                                <li className="px-4 py-2 font-medium text-sm">
                                    👋 Hallo, {user.nama_usaha}
                                </li>
                                <li>
                                    <Link to='/dashboard' className="active:bg-orange-500">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M4 13h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1zm-1 7a1 1 0 001 1h6a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4zm10 0a1 1 0 001 1h6a1 1 0 001-1v-7a1 1 0 00-1-1h-6a1 1 0 00-1 1v7zm1-10h6a1 1 0 001-1V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v5a1 1 0 001 1z" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <a className="active:bg-orange-500" onClick={logout}>
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                                        </svg>
                                        Log out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <label htmlFor="modal-daftar" className="btn bg-orange-500 hover:bg-orange-600 border-0 md:visible invisible md:px-4 py-1 md:text-sm text-xs">Daftar</label>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar