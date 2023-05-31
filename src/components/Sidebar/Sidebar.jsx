import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CgChevronDown, CgChevronUp } from 'react-icons/cg'
import posku from '../../assets/posku-logo.png'

function Sidebar() {
    const [open, setOpen] = useState(false);
    const [stateManage, setStateManage] = useState(false)

    const { pathname } = useLocation()

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
        <div className="flex">
            <div
                className={` ${open ? "w-60" : "w-18 md:w-20 "
                    } flex flex-col h-screen py-3 bg-white shadow duration-300`}
            >
                <div className="space-y-3">
                    <div className={`flex items-center mx-4 ${open ? 'justify-between' : 'justify-center'}`}>
                        {open ?
                            <img src={posku} alt="posku" className="w-20 h-7" />
                            // <h2 className="text-xl font-bold text-black truncate">
                            //     POSKU
                            // </h2>
                            : ""}
                        <button onClick={() => {
                            setOpen(!open)
                            setStateManage(false)
                        }
                        }>
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
                    <div className="flex-1 mx-4">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li>
                                <Link
                                    to="/app"
                                    className={`flex items-center ${open ? '' : 'justify-center'} group p-2 space-x-3 rounded-md hover:bg-gray-50 transition`}
                                    onClick={() => {
                                        setOpen(false)
                                        setStateManage(false)
                                    }
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-6 h-6 group-hover:text-orange-400 transition group-active:text-orange-500 ${pathname === '/app' ? 'text-orange-500' : 'text-gray-500'}`}
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
                                        <span className=' text-gray-400 font-semibold'>Home</span>
                                        : ''
                                    }
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    className={`flex items-center ${open ? '' : 'justify-center'} group p-2 space-x-3 rounded-md hover:bg-gray-50 transition`}
                                    onClick={() => {
                                        if (open === false) {
                                            setStateManage(!stateManage)
                                            setOpen(true)
                                        } else {
                                            setStateManage(!stateManage)
                                        }

                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-6 h-6 group-hover:text-orange-400 transition group-active:text-orange-500 ${pathname === '/app/manage/menu' || pathname === '/app/manage/kategori' ? 'text-orange-500' : 'text-gray-500'}`}
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
                                        <>
                                            <span className="text-gray-400 font-semibold">Manage</span>
                                            {stateManage ? <CgChevronUp className='text-gray-500 text-xl ml-12' /> : <CgChevronDown className=' text-gray-500 text-xl ml-12' />}
                                        </>
                                        : ''}

                                </Link>
                                <ul className={`${stateManage ? 'block' : 'hidden'} px-8 pb-4 pt-2 mx-3`}>
                                    <li>
                                        <Link to='app/manage/menu' className='hover:underline transition text-gray-400 py-2.5 font-semibold block' onClick={() => {
                                            setOpen(false)
                                            setStateManage(false)
                                        }}>
                                            Menu
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="app/manage/kategori" className='hover:underline transition text-gray-400 py-2.5 font-semibold block' onClick={() => {
                                            setOpen(false)
                                            setStateManage(false)
                                        }}>
                                            Kategori
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='hover:underline transition text-gray-400 py-2.5 font-semibold block' onClick={() => {
                                            setOpen(false)
                                            setStateManage(false)
                                        }}>
                                            Diskon
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="app/laporan"
                                    className={`flex items-center ${open ? '' : 'justify-center'} group p-2 space-x-3 rounded-md hover:bg-gray-50 transition`}
                                    onClick={() => {
                                        setOpen(false)
                                        setStateManage(false)
                                    }
                                    }
                                >
                                    <svg
                                        viewBox="0 0 1024 1024"
                                        fill="currentColor"
                                        className={`w-6 h-6 group-hover:text-orange-400 transition group-active:text-orange-500 ${pathname === '/app/laporan' ? 'text-orange-500' : 'text-gray-500'}`}
                                    >
                                        <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-600-80h56c4.4 0 8-3.6 8-8V560c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V384c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v320c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V462c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v242c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v400c0 4.4 3.6 8 8 8z" />
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
                                    className={`flex items-center ${open ? '' : 'justify-center'} p-2 group space-x-3 rounded-md hover:bg-gray-50 transition`}
                                    onClick={() => {
                                        setOpen(false)
                                        setStateManage(false)
                                        handleLogout()
                                    }
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-red-400 group-hover:text-red-500 transition "
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