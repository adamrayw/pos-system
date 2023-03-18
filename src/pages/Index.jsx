import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Menu from "../components/Menu/Menu"
import Sidebar from "../components/Sidebar/Sidebar"
import { kategoriIndex } from "../features/menuSlice/menuSlice"
import { useApiRequest } from "../services/api.service"

function Index() {
    const [kategori, setKategori] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch()
    const selector = useSelector((state) => state.menu.tab)

    useState(() => {
        const getKategori = async () => {
            setIsLoaded(false)
            const { response, err } = await useApiRequest("kategori")
            setKategori(response.data)
            setIsLoaded(true)
        }

        getKategori()
    }, [])

    return (
        <div className="container mx-auto">
            <div className='leading-loose mb-6'>
                <h1 className='text-3xl font-bold'>Welcome, Soto Mak Wiek👋</h1>
                <p className='text-gray-400'>Discover what you need easily!</p>
            </div>
            <div className="flex space-x-6 mb-6">
                {isLoaded ?
                    <>
                        <button onClick={() => dispatch(kategoriIndex('semua'))}>
                            <div className={`w-full px-8 py-3 ${selector === 'semua' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800 '} hover:bg-orange-500 hover:text-white active:bg-orange-700 transition rounded-lg shadow-sm flex items-center space-x-2`}>
                                <div className="text-sm font-medium truncate">
                                    Semua
                                </div>
                            </div>
                        </button>
                        {
                            kategori.items.map((e) => {
                                return (
                                    <button key={e.id} onClick={() => dispatch(kategoriIndex(e.id))}>
                                        <div className={`w-full px-8 py-3 ${selector === e.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-800 '} hover:bg-orange-500 hover:text-white active:bg-orange-700  transition rounded-lg shadow-sm flex items-center space-x-2`}>
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