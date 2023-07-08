import { useEffect, useState } from 'react'
import { BiLineChart, BiLineChartDown } from 'react-icons/bi'
import { useApiRequest } from '../services/api.service'
import { BiLinkExternal } from 'react-icons/bi'
import convertToDateTimeFormat from '../utils/converToDateFormat.utils'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTrLMonth, calculateTrMonth, calculateTrToday, calculateTrYesterday, rincian } from '../features/menuSlice/menuSlice'
import convert from '../utils/convertToRupiah.utils'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { MdGroup, MdGroups2 } from 'react-icons/md'
import { CgSpinner } from 'react-icons/cg'
import Chart from '../components/Chart/Chart'
import ModalRincianPembayaran from '../components/Modal/ModalRincianPembayaran'
import { IoMdPaper } from 'react-icons/io'

function Laporan() {
    const [isLoading, setIsLoading] = useState(false)
    const [dataTransaksi, setDataTransaksi] = useState([])
    const [selisihPenHari, setSelisihPenHari] = useState('')
    const [selisihPenBulan, setSelisihPenBulan] = useState('')

    const dispatch = useDispatch()
    const getTotal = useSelector((state) => state.menu.total_pendapatan_today)
    const getMonth = useSelector((state) => state.menu.total_pendapatan_month)
    const getLastMonth = useSelector((state) => state.menu.total_pendapatan_last_month)
    const getYesterday = useSelector((state) => state.menu.total_pendapatan_yesterday)
    const jumlahOrderTd = useSelector((state) => state.menu.transaction_today)
    const jumlahOrderMh = useSelector((state) => state.menu.transaction_month)
    const rincianData = useSelector((state) => state.menu.rincian)

    console.log(rincianData)

    function hitungSelisihBulan() {
        const incomeThisMonth = getMonth
        const incomeLastMonth = getLastMonth

        const result = ((incomeThisMonth - incomeLastMonth) / incomeThisMonth * 100.0);
        if (result > 0) {
            setSelisihPenBulan(result.toFixed(2))
        } else if (result < 0) {
            setSelisihPenBulan(result.toFixed(2))
        } else {
            setSelisihPenHari(0)
        }
    }

    function hitungSelisih() {
        const incomeToday = getTotal
        const incomeYesterday = getYesterday

        const result = (incomeToday - incomeYesterday) / incomeToday * 100;

        if (result > 0) {
            setSelisihPenHari(result.toFixed(2))
        } else if (result < 0) {
            setSelisihPenHari(result.toFixed(2))
        } else {
            setSelisihPenHari(0)
        }
    }

    setTimeout(() => {
        hitungSelisih()
        hitungSelisihBulan()
    }, 1000);

    useEffect(() => {
        const fetchTransaksi = async () => {
            setIsLoading(true)
            await useApiRequest('transaksi/get/' + JSON.parse(localStorage.getItem('user')).id)
                .then((response) => {
                    setDataTransaksi(response.response.data.items.Transaksi)
                    dispatch(calculateTrToday(response.response.data.transaction_today.Transaksi))
                    dispatch(calculateTrMonth(response.response.data.transaction_month.Transaksi))
                    dispatch(calculateTrYesterday(response.response.data.transaction_yesterday.Transaksi))
                    dispatch(calculateTrLMonth(response.response.data.transaction_last_month.Transaksi))
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
        <div className='container relative px-4 md:ml-0 ml-1'>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Laporan</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 bg-blue-500 p-2 md:p-10 rounded-lg shadow'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 justify-between w-full">
                    <div className="card shadow-sm rounded-lg bg-white p-4 space-y-2">
                        <div className='flex items-center space-x-1'>
                            <h3 className="text-xs text-gray-400">Total Pendapatan Hari Ini</h3>
                            <BiLineChart className='text-sm text-blue-500' />
                        </div>
                        <div className='space-y-2'>
                            {isLoading ?
                                <CgSpinner className='animate-spin text-2xl text-blue-500' />
                                :
                                <p className="font-semibold whitespace-nowrap text-lg md:text-2xl">Rp {convert(getTotal)}</p>
                            }
                            {getYesterday === 0 || getTotal === 0 ?
                                null
                                :
                                <>
                                    {selisihPenHari === 0 || selisihPenHari === '' ?
                                        null
                                        :
                                        <>

                                            {selisihPenHari < 0 ?
                                                <p className={`text-xs ${selisihPenHari === 0 ? 'hidden' : 'block'} scroller text-red-500 flex items-center scrollbar-hide whitespace-nowrap overflow-x-scroll`}><span>Pendapatan hari ini lebih rendah {selisihPenHari + '% dari hari kemarin'}<BsArrowDown className='ml-1' /></span></p>
                                                :
                                                <p className={`text-xs ${selisihPenHari === 0 ? 'hidden' : 'block'} scroller text-green-500 flex items-center scrollbar-hide whitespace-nowrap overflow-x-scroll`}><span>Pendapatan hari ini lebih besar {selisihPenHari + '% dari hari kemarin'}<BsArrowUp className='ml-1' /></span></p>
                                            }
                                        </>
                                    }
                                </>
                            }
                            <p className='text-xs text-gray-400'>Pendapatan kemarin: Rp {convert(getYesterday)}</p>
                        </div>
                    </div>
                    <div className="card shadow-sm rounded-lg bg-white p-4 texce space-y-2">
                        <div className='flex items-center space-x-1'>
                            <h3 className="text-xs text-gray-400 truncate">Total Pendapatan Bulan Ini</h3>
                            <BiLineChart className='text-sm text-blue-500' />
                        </div>
                        <div className='space-y-2'>
                            {isLoading ?
                                <CgSpinner className='animate-spin text-2xl text-blue-500' />
                                :
                                <p className="font-semibold whitespace-nowrap text-lg md:text-2xl">Rp {convert(getMonth)}</p>
                            }
                            {getLastMonth === 0 || getMonth === 0 ?
                                null
                                :
                                <>
                                    {selisihPenBulan === 0 || selisihPenBulan === '' ?
                                        null
                                        :
                                        <>
                                            {selisihPenBulan < 0 ?
                                                <p className={`text-xs ${selisihPenBulan === 0 ? 'hidden' : 'block'} scroller text-red-500 flex items-center scrollbar-hide whitespace-nowrap overflow-x-scroll`}><span>Pendapatan bulan ini lebih rendah {selisihPenBulan + '% dari bulan kemarin'}<BsArrowDown className='ml-1' /></span></p>
                                                :
                                                <p className={`text-xs ${selisihPenBulan === 0 ? 'hidden' : 'block'} scroller text-green-500 flex items-center scrollbar-hide whitespace-nowrap overflow-x-scroll`}><span>Pendapatan bulan ini lebih besar {selisihPenBulan + '% dari bulan kemarin'}<BsArrowUp className='ml-1' /></span></p>
                                            }
                                        </>
                                    }
                                </>
                            }
                            <p className='text-xs text-gray-400'>Pendapatan Bulan kemarin: Rp {convert(getLastMonth)}</p>
                        </div>
                    </div>
                    <label htmlFor="modal_today" className="card shadow-sm rounded-lg bg-white p-4 space-y-2 hover:bg-gray-50 transition cursor-pointer active:bg-gray-100">
                        <div htmlFor="modal-daftar">
                            <div className='flex items-center space-x-1'>
                                <h3 className="text-xs text-gray-400 truncate">Jumlah Order Hari Ini</h3>
                                <MdGroup className='text-sm text-blue-500' />
                            </div>
                            {isLoading ?
                                <CgSpinner className='animate-spin text-2xl text-blue-500' />
                                :
                                <p className="font-semibold text-lg md:text-2xl">{jumlahOrderTd.length}</p>
                            }
                        </div>
                    </label>
                    <label htmlFor="modal_month" className="card shadow-sm rounded-lg bg-white p-4 space-y-2 hover:bg-gray-50 transition cursor-pointer active:bg-gray-100">
                        <div>
                            <div className='flex items-center space-x-1'>
                                <h3 className="text-xs text-gray-400 truncate">Jumlah Order Bulan Ini</h3>
                                <MdGroups2 className='text-sm text-blue-500' />
                            </div>
                            {isLoading ?
                                <CgSpinner className='animate-spin text-2xl text-blue-500' />
                                :
                                <p className="font-semibold text-lg md:text-2xl">{jumlahOrderMh.length}</p>
                            }
                        </div>
                    </label>
                </div>
                <Chart props={dataTransaksi} />
            </div>
            <div className='flex items-center justify-between mt-10 mb-4'>
                <h2 className='text-2xl font-bold'>5 Transaksi Terakhir</h2>
                <div className='space-x-4'>
                    <button className='btn btn-sm text-sm bg-gray-500 border-0 font-medium'>Transaksi Hari Ini</button>
                    <button className='btn btn-sm text-sm bg-gray-500 border-0 font-medium'>Transaksi Bulan Ini</button>
                </div>
            </div>
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
                                Rincian Pembayaran
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <>
                                <tr tr className="bg-white border-b whitespace-nowrap" >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                </tr>
                                <tr tr className="bg-white border-b whitespace-nowrap" >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className='w-20 h-5 bg-gray-200 animate-pulse'></div>
                                    </th>
                                </tr>
                            </>
                            :
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
                                                <p className={`${e.isPaid ? 'text-green-800 bg-green-300' : 'text-blue-500 bg-blue-200'} text-center text-sm py-2 px-3 rounded-xl font-semibold`}>{e.isPaid ? 'Sudah Dibayar' : 'Menunggu Pembayaran'}</p>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <label htmlFor="modal_rincian" className="flex items-center hover:text-blue-500 transition cursor-pointer" target="_blank" onClick={() => dispatch(rincian(e.rincian))}><IoMdPaper className='mr-2 text-lg' />Klik Disini</label>
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