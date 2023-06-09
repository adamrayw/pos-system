import { useDispatch, useSelector } from 'react-redux'
import { add, kategoriIndex } from '../../features/menuSlice/menuSlice'
import { useEffect, useState } from 'react'
import { getSubTotal } from '../../features/menuSlice/menuSlice'
import { useApiRequest } from '../../services/api.service'
import convert from '../../utils/convertToRupiah.utils'
import { TbMoodConfuzed } from 'react-icons/tb'

function Menu() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])
    const [isSearchMode, setIsSearchMode] = useState(false)

    const dispatch = useDispatch()

    const selector = useSelector((state) => state.menu.tab)
    const keyword = useSelector((state) => state.menu.keyword)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (keyword !== '') {
            const fetchSearch = async () => {
                setIsLoaded(false)
                const { response } = await useApiRequest("menu/search/" + JSON.parse(localStorage.getItem('user')).id + "/" + keyword)
                setData(response.data)
                setIsLoaded(true)
                setIsSearchMode(true)
            }
            fetchSearch()
        } else if (keyword === '') {
            const fetchAllMenu = async () => {
                setIsSearchMode(false)
                setIsLoaded(false)
                const { response, err } = await useApiRequest("menu/" + JSON.parse(localStorage.getItem('user')).id)
                setData(response.data)
                setIsLoaded(true)
            }
            fetchAllMenu()
        }
    }, [keyword])

    useEffect(() => {
        const fetchMenu = async () => {
            if (selector === "semua") {
                setIsLoaded(false)
                const { response, err } = await useApiRequest("menu/" + JSON.parse(localStorage.getItem('user')).id)
                setData(response.data)
                setIsLoaded(true)
            } else {
                setIsLoaded(false)
                const { response, err } = await useApiRequest('kategori/getbyid/' + selector)
                setData(response.data.items)
                setIsLoaded(true)
            }
        }

        fetchMenu()
    }, [selector])

    const valueMenu = useSelector((state) => state.menu.value)


    useEffect(() => {
        dispatch(getSubTotal());
    }, [dispatch, valueMenu])

    return (
        <>
            {isLoaded ?
                <>
                    {data.items.length === 0 && isSearchMode ?
                        <div div className='flex flex-col items-center justify-center mt-10 bg-white max-w-md mx-auto p-10'>
                            <TbMoodConfuzed className='text-6xl text-blue-500' />
                            <p className='text-center font-semibold text-lg mt-2'>Menu yang anda cari tidak ditemukan</p>
                            <p className='text-center text-gray-500 font-normal mt-2'>Coba dengan  keyword lain</p>
                        </div>
                        : null}
                    {data.items.length === 0 && !isSearchMode ? (
                        <div className="flex flex-col items-center justify-center mt-10">
                            <div className="bg-white p-5 md:p-10 rounded">
                                <h1 className="text-base md:text-2xl font-bold mb-4 text-gray-700">👋 Selamat Datang, {user.nama_usaha}!</h1>
                                <p className="text-base md:text-lg mb-4 text-gray-500">Terima Kasih telah memilih aplikasi <span className='text-blue-500 font-semibold'>POSKU</span>.</p>
                                <h2 className="text-base md:text-lg font-medium mb-2 text-gray-700">Untuk memulai dengan cepat, ikuti langkah-langkah berikut:</h2>
                                <div className="flex items-center mb-2 text-gray-500">
                                    <div className="text-base md:text-lg mr-4">1.</div>
                                    <div>
                                        <span className='md:flex'>Buka menu dengan mengklik ikon
                                            <svg
                                                class='w-6 h-6 mx-1 text-black'
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                />
                                            </svg>
                                            di pojok kiri atas layar.
                                        </span>

                                    </div>
                                </div>
                                <div className="flex items-center mb-2 text-gray-500">
                                    <div className="text-base md:text-lg mr-4">2.</div>
                                    <div>
                                        <p className='md:text-base text-sm'>Pilih menu <span className='text-gray-700 font-semibold'>"Kategori"</span>.</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-2 text-gray-500">
                                    <div className="text-base md:text-lg mr-4">3.</div>
                                    <div>
                                        <p className='md:text-base text-sm'>Klik tombol <span className='text-gray-700 font-semibold'>"Tambah Kategori"</span> dan isi informasi yang dibutuhkan.</p>
                                    </div>
                                </div>
                                <p className="text-base md:text-lg mt-4 font-semibold text-gray-700">Anda siap untuk memasukkan menu-menu anda ke dalam kategori-kategori dan siap berjualan!</p>
                            </div>
                        </div>

                    ) : null}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4' >
                        {data.items.map((e) => {
                            return (
                                <button className='p-4 bg-white rounded-lg items-center space-y-2 shadow-sm active:bg-gray-100' key={e.id} onClick={() => dispatch(add(e))}>
                                    <div className="flex justify-center items-center">
                                        <img src={e.image} className="w-[3rem] md:w-[5rem]" priority="true" alt='menu' />
                                    </div>

                                    <div className="text-left">
                                        <h3 className='text-base md:text-xl font-bold whitespace-nowrap truncate text-gray-800'>{e.name}</h3>
                                        <p className='text-base font-medium text-gray-500'>
                                            Rp {convert(e.price)}
                                        </p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </>

                :
                <div className='flex space-x-4'>
                    <div className="mx-auto bg-white shadow-sm w-full rounded-2xl">
                        <div className="h-48 p-3 overflow-hidden bg-gray-200 animate-pulse">
                        </div>
                        <div className="p-3 h-">
                            <div className="grid grid-row-2 gap-4 mt-2">
                                <div className="h-8 bg-gray-200 rounded animate-pulse">
                                </div>
                                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
                                </div>

                                <div className="...">
                                </div>
                                <div className="col-span-2 ...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto bg-white shadow-sm w-full rounded-2xl">
                        <div className="h-48 p-3 overflow-hidden bg-gray-200 animate-pulse">
                        </div>
                        <div className="p-3 h-">
                            <div className="grid grid-row-2 gap-4 mt-2">
                                <div className="h-8 bg-gray-200 rounded animate-pulse">
                                </div>
                                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
                                </div>

                                <div className="...">
                                </div>
                                <div className="col-span-2 ...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto bg-white shadow-sm w-full rounded-2xl">
                        <div className="h-48 p-3 overflow-hidden bg-gray-200 animate-pulse">
                        </div>
                        <div className="p-3 h-">
                            <div className="grid grid-row-2 gap-4 mt-2">
                                <div className="h-8 bg-gray-200 rounded animate-pulse">
                                </div>
                                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
                                </div>

                                <div className="...">
                                </div>
                                <div className="col-span-2 ...">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </ >
    )
}

export default Menu