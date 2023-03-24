import { useEffect, useState } from 'react'
import { BiLineChart, BiLineChartDown } from 'react-icons/bi'
import { useApiRequest } from '../services/api.service'
import { BiLinkExternal } from 'react-icons/bi'
import convertToDateTimeFormat from '../utils/converToDateFormat.utils'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTrMonth, calculateTrToday } from '../features/menuSlice/menuSlice'
import convert from '../utils/convertToRupiah.utils'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { MdGroup, MdGroups2 } from 'react-icons/md'

function Laporan() {
    const [isLoading, setIsLoading] = useState(false)
    const [dataTransaksi, setDataTransaksi] = useState([])
    const [selisihPenHari, setSelisihPenHari] = useState('0%')
    const [selisihPenBulan, setSelisihPenBulan] = useState('')

    const dispatch = useDispatch()
    const getTotal = useSelector((state) => state.menu.total_pendapatan_today)
    const getMonth = useSelector((state) => state.menu.total_pendapatan_month)
    const jumlahOrderTd = useSelector((state) => state.menu.transaction_today)
    const jumlahOrderMh = useSelector((state) => state.menu.transaction_month)

    function hitungSelisih() {
        const incomeNow = getTotal
        const incomePast = localStorage.getItem('incomePast')

        localStorage.setItem('incomePast', getTotal)

        const difference = incomeNow - incomePast;
        const percentage = (difference / incomeNow) * 100;

        if (difference > 0) {
            setSelisihPenHari(percentage.toFixed(2))
        } else if (difference < 0) {
            setSelisihPenHari(percentage.toFixed(2))
        } else {
            setSelisihPenHari(0)
        }
    }

    setTimeout(() => {
        hitungSelisih()
    }, 1000);

    useEffect(() => {
        const fetchTransaksi = async () => {
            setIsLoading(true)
            await useApiRequest('transaksi/get')
                .then((response) => {
                    setDataTransaksi(response.response.data.items)
                    dispatch(calculateTrToday(response.response.data.transaction_today))
                    dispatch(calculateTrMonth(response.response.data.transaction_month))
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false)
                })
        }

        fetchTransaksi()
    }, [])

    return (
        <div className='container'>
            <h1 className="text-2xl md:text-4xl font-semibold mb-6">Laporan</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 justify-between w-full">
                    <div className="card bg-white p-4 space-y-2">
                        <div className='flex items-center space-x-1'>
                            <h3 className="text-xs text-gray-400">Total Pendapatan Hari Ini</h3>
                            <BiLineChart className='text-sm text-orange-500' />
                        </div>
                        <div className='space-y-2 flex space-x-2'>
                            <p className="font-semibold whitespace-nowrap md:text-2xl">Rp {convert(getTotal)}</p>
                            {/* {selisihPenHari === 0 ?
                                <p className='text-xs text-black flex items-center'>{selisihPenHari + '% '}</p>
                                :
                                null
                            }
                            {selisihPenHari < 0 ?
                                <p className='text-xs text-red-500 flex items-center'>{selisihPenHari + '% '}<BsArrowDown className='ml-1' /></p>
                                :
                                <p className={`text-xs ${selisihPenHari === 0 ? 'hidden' : 'block'} text-green-500 flex items-center`}>{selisihPenHari + '% '}<BsArrowUp className='ml-1' /></p>
                            } */}
                        </div>
                    </div>
                    <div className="card bg-white p-4 space-y-2">
                        <div className='flex items-center space-x-1'>
                            <h3 className="text-xs text-gray-400 truncate">Total Pendapatan Bulan Ini</h3>
                            <BiLineChart className='text-sm text-orange-500' />
                        </div>
                        <p className="font-semibold whitespace-nowrap md:text-2xl">Rp {convert(getMonth)}</p>
                    </div>
                    <div className="card bg-white p-4 space-y-2">
                        <div className='flex items-center space-x-1'>
                            <h3 className="text-xs text-gray-400 truncate">Jumlah Order Hari Ini</h3>
                            <MdGroup className='text-sm text-orange-500' />
                        </div>
                        <p className="font-semibold md:text-2xl">{jumlahOrderTd.length}</p>
                    </div>
                    <div className="card bg-white p-4 space-y-2">
                        <div className='flex items-center space-x-1'>
                            <h3 className="text-xs text-gray-400 truncate">Jumlah Order Bulan Ini</h3>
                            <MdGroups2 className='text-sm text-orange-500' />
                        </div>
                        <p className="font-semibold md:text-2xl">{jumlahOrderMh.length}</p>
                    </div>
                </div>
                <div className='w-[w-12] px-10 py-4 bg-white text-center'>
                    {/* <h2 className='font-semibold text-xl md:text-2xl'>Total Pendapatan</h2>
                    <p className='my-4 md:my-10 text-xl md:text-4xl font-bold'>Rp. 10</p> */}
                </div>
            </div>

            <h2 className='mt-4 font-semibold mb-2'>Transaksi Terakhir</h2>
            <div className='relative space-x-4 max-h-screen w-full overflow-auto'>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-white whitespace-nowrap">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Menu
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Link Pembayaran
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? 'Loading...' :
                            <>
                                {dataTransaksi.map((e) => {
                                    return (
                                        <tr key={e.id} tr className="bg-white border-b whitespace-nowrap" >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {e.transaksiId}
                                            </th>
                                            <td className="px-6 py-4">
                                                {e.menu.set.map(e => e.name).join(', ')}
                                            </td>
                                            <td className="px-6 py-4">
                                                Rp {convert(e.total)}
                                            </td>
                                            <td className='px-6 py-4'>
                                                <p className={`${e.isPaid ? 'text-green-800 bg-green-300' : 'text-yellow-700 bg-yellow-200'} text-center text-sm py-2 px-3 rounded-xl font-semibold`}>{e.isPaid ? 'Sudah Dibayar' : 'Menunggu Pembayaran'}</p>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <a href={e.redirect_url} className="flex items-center hover:text-blue-500" target="_blank"><BiLinkExternal className='mr-2 text-lg' />Klik Disini</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                {convertToDateTimeFormat(e.createdAt)}
                                            </td>
                                        </tr>

                                    )
                                })}
                            </>
                        }

                    </tbody>
                </table>
                {dataTransaksi.length === 0 ?
                    <p className='text-center mt-6'>
                        Anda belum melakukan transaksi
                    </p>
                    : null
                }
            </div>
        </div>
    )
}

export default Laporan