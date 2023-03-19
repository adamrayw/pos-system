import { useState } from "react"
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
    const [keywordSearch, setKeywordSearch] = useState('')

    const dispatch = useDispatch()
    const selector = useSelector((state) => state.menu.tab)
    const keyword = useSelector((state) => state.menu.keyword)

    useState(() => {
        const getKategori = async () => {
            setIsLoaded(false)
            const { response, err } = await useApiRequest("kategori")
            setKategori(response.data)
            setIsLoaded(true)
        }

        getKategori()
    }, [])

    const handleSearch = (e) => {
        setKeywordSearch(e.target.value)
        dispatch(setKeyword(e.target.value))
    }

    return (
        <div className="container mx-auto">
            <div className='leading-loose mb-6 flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>Welcome, Soto Mak Wiek👋</h1>
                    <p className='text-gray-400'>Discover what you need easily!</p>
                </div>
                <div className="relative">
                    <FiSearch className="absolute m-auto left-0 top-0 bottom-0 ml-2.5" />
                    <input type="text" name="search" className="w-full pl-8 pr-3 py-2.5 rounded font-medium focus:shadow-lg text-sm focus:ring focus:ring-orange-500 transition" value={keywordSearch} placeholder="Cari menu..." onChange={handleSearch} />
                    <IoMdClose className={`${keyword === '' ? 'hidden' : 'block'} absolute m-auto right-0 top-0 bottom-0 mr-2.5 hover:cursor-pointer`} onClick={() => {
                        dispatch(setKeyword(''))
                        setKeywordSearch('')
                    }} />
                </div>
            </div>
            <div className="flex space-x-6 mb-6">
                {isLoaded ?
                    <>
                        <button onClick={() => dispatch(kategoriIndex('semua'))}>
                            <div className={`w-full px-8 py-3 ${selector === 'semua' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-800 '} hover:bg-orange-500 hover:text-white active:bg-orange-700 transition rounded-lg shadow-sm flex items-center space-x-2`}>
                                <div className="text-sm font-medium truncate">
                                    Semua
                                </div>
                            </div>
                        </button>
                        {
                            kategori.items.map((e) => {
                                return (
                                    <button key={e.id} onClick={() => dispatch(kategoriIndex(e.id))}>
                                        <div className={`w-full px-8 py-3 ${selector === e.id ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-800 '} hover:bg-orange-500 hover:text-white active:bg-orange-700  transition rounded-lg shadow-sm flex items-center space-x-2`}>
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