import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Menu from "../components/Menu/Menu"
import Sidebar from "../components/Sidebar/Sidebar"
import { kategoriIndex, setKeyword } from "../features/menuSlice/menuSlice"
import { useApiRequest } from "../services/api.service"
import { FiSearch } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'

function Index() {
    const [kategori, setKategori] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [date, setDate] = useState(new Date());
    const [keywordSearch, setKeywordSearch] = useState('')

    const dispatch = useDispatch()
    const selector = useSelector((state) => state.menu.tab)
    const keyword = useSelector((state) => state.menu.keyword)
    const user = JSON.parse(localStorage.getItem('user'))

    useState(() => {
        localStorage.setItem('incomePast', 0)

        const getKategori = async () => {
            setIsLoaded(false)
            const { response, err } = await useApiRequest("kategori/" + JSON.parse(localStorage.getItem('user')).id)
            setKategori(response.data)
            setIsLoaded(true)
        }

        getKategori()
    }, [])

    const handleSearch = (e) => {
        setKeywordSearch(e.target.value)
        dispatch(setKeyword(e.target.value))
    }


    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return (
        <div className="container mx-auto px-6">
            <div className='leading-loose mb-6 flex md:flex-row flex-col items-center justify-between'>
                <div className="text-left space-y-1 mb-4 md:mb-0 w-full">
                    <p className="text-gray-400 text-sm">{formattedTime} - {formattedDate} </p>
                    <h1 className='text-xl md:text-2xl font-bold uppercase'>{user.nama_usaha}</h1>
                    <p className='text-xs md:text-base text-gray-400'>Effortless sales, anytime, anywhere.</p>
                </div>
                <div className="relative md:w-auto w-full">
                    <FiSearch className="absolute m-auto left-0 top-0 bottom-0 ml-4" />
                    <input
                        type="text"
                        name="search"
                        value={keywordSearch}
                        onChange={handleSearch}
                        placeholder="Cari menu..."
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <IoMdClose className={`${keyword === '' ? 'hidden' : 'block'} absolute m-auto right-0 bottom-0 top-0 mr-2.5 hover:cursor-pointer`} onClick={() => {
                        dispatch(setKeyword(''))
                        setKeywordSearch('')
                    }} />
                </div>
            </div>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-6 mb-6">
                {isLoaded ?
                    <>
                        {kategori.items.length < 1 ? ('') : (
                            <button onClick={() => dispatch(kategoriIndex('semua'))}>
                                <div className={`w-full px-8 py-3 ${selector === 'semua' ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-800 '} hover:bg-blue-500 hover:text-white active:bg-blue-500 transition rounded-lg shadow-sm flex items-center space-x-2`}>
                                    <div className="text-sm font-medium truncate">
                                        Semua
                                    </div>
                                </div>
                            </button>
                        )}
                        {
                            kategori.items.map((e) => {
                                return (
                                    <button key={e.id} onClick={() => dispatch(kategoriIndex(e.id))}>
                                        <div className={`w-full px-8 py-3 ${selector === e.id ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-800 '} hover:bg-blue-500 hover:text-white active:bg-blue-500  transition rounded-lg shadow-sm flex items-center space-x-2`}>
                                            <div className="text-sm font-medium truncate">
                                                {e.name}
                                            </div>
                                        </div>
                                    </button>
                                )
                            })
                        }
                    </>
                    :
                    <>

                        <button>
                            <div className="w-full px-8 py-3 bg-white hover:bg-gray-50 active:bg-gray-100 transition rounded-lg shadow-sm flex items-center space-x-2">
                                <div className="h-4 rounded w-10 animate-pulse bg-gray-200">
                                </div>
                            </div>
                        </button>
                        <button>
                            <div className="w-full px-8 py-3 bg-white hover:bg-gray-50 active:bg-gray-100 transition rounded-lg shadow-sm flex items-center space-x-2">
                                <div className="h-4 rounded w-10 animate-pulse bg-gray-200">
                                </div>
                            </div>
                        </button>
                        <button>
                            <div className="w-full px-8 py-3 bg-white hover:bg-gray-50 active:bg-gray-100 transition rounded-lg shadow-sm flex items-center space-x-2">
                                <div className="h-4 rounded w-10 animate-pulse bg-gray-200">
                                </div>
                            </div>
                        </button>
                        <button>
                            <div className="w-full px-8 py-3 bg-white hover:bg-gray-50 active:bg-gray-100 transition rounded-lg shadow-sm flex items-center space-x-2">
                                <div className="h-4 rounded w-10 animate-pulse bg-gray-200">
                                </div>
                            </div>
                        </button>
                        <button>
                            <div className="w-full px-8 py-3 bg-white hover:bg-gray-50 active:bg-gray-100 transition rounded-lg shadow-sm flex items-center space-x-2">
                                <div className="h-4 rounded w-10 animate-pulse bg-gray-200">
                                </div>
                            </div>
                        </button>
                    </>
                }
            </div>
            <Menu />
        </div>
    )
}

export default Index