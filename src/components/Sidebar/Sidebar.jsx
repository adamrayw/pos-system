import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            <div
                className={` ${open ? "w-60" : "w-20 "
                    } flex flex-col h-screen p-3 bg-white shadow duration-300`}
            >
                <div className="space-y-3">
                    <div className={`flex items-center ${open ? 'justify-between' : 'justify-center'}`}>
                        {open ?
                            <h2 className="text-xl font-bold text-black truncate">
                                Soto Mak Wiek
                            </h2>
                            : ""}
                        <button onClick={() => setOpen(!open)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <Link
                                    to="/"
                                    className={`flex items-center ${open ? '' : 'justify-center'} p-2 space-x-3 rounded-md active:bg-gray-200 transition hover:bg-gray-50`}
                                    onClick={() => setOpen(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    {open ?
                                        <span className='text-gray-400 font-semibold'>Home</span>
                                        : ''
                                    }
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="#"
                                    className={`flex items-center ${open ? '' : 'justify-center'} p-2 space-x-3 rounded-md hover:bg-gray-50 active:bg-gray-200 transition`}
                                    onClick={() => setOpen(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    {open ?
                                        <span className="text-gray-400 font-semibold">Inbox</span>
                                        : ''}
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="/laporan"
                                    className={`flex items-center ${open ? '' : 'justify-center'} p-2 space-x-3 rounded-md hover:bg-gray-50 active:bg-gray-200 transition`}
                                    onClick={() => setOpen(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    {open ?
                                        <span className="text-gray-400 font-semibold">
                                            Laporan
                                        </span>
                                        : ''}
                                </Link>
                            </li>

                            <li className="rounded-sm">
                                <Link
                                    to="#"
                                    className={`flex items-center ${open ? '' : 'justify-center'} p-2 space-x-3 rounded-md hover:bg-gray-50 active:bg-gray-200 transition`}
                                    onClick={() => setOpen(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    {open ?
                                        <span className="text-gray-400 font-semibold">
                                            Logout
                                        </span>
                                        : ''}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Sidebar