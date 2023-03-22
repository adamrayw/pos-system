import { useEffect, useState } from 'react'
import { BiLineChart, BiLineChartDown } from 'react-icons/bi'
import { useApiRequest } from '../services/api.service'
import convert from '../utils/convertToRupiah.utils'
import { BiLinkExternal } from 'react-icons/bi'

function Laporan() {
    const [isLoading, setIsLoading] = useState(false)
    const [dataTransaksi, setDataTransaksi] = useState([])

    useEffect(() => {
        const fetchTransaksi = async () => {
            setIsLoading(true)
            await useApiRequest('transaksi/get')
                .then((response) => {
                    setDataTransaksi(response.response.data.items)
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
        <div>
            <h1 className="text-4xl font-semibold mb-6">Laporan</h1>
            <div className="grid grid-cols-2 gap-2 justify-between">
                <div className="card bg-white p-4 space-y-2">
                    <div className='flex items-center space-x-1'>
                        <h3 className="text-sm text-gray-400">Total Pendapatan Hari Ini</h3>
                        <BiLineChart className='text-sm text-orange-500' />
                    </div>
                    <p className="font-semibold text-2xl">Rp 0</p>
                </div>
                <div className="card bg-white p-4 space-y-2">
                    <div className='flex items-center space-x-1'>
                        <h3 className="text-sm text-gray-400">Total Pengeluaran</h3>
                        <BiLineChartDown className='text-sm text-orange-500' />
                    </div>
                    <p className="font-semibold text-2xl">- Rp 0</p>
                </div>
                <div className="card bg-white p-4 space-y-2">
                    <div className='flex items-center space-x-1'>
                        <h3 className="text-sm text-gray-400">Total Pendapatan Bulan Ini</h3>
                        <BiLineChart className='text-sm text-orange-500' />
                    </div>
                    <p className="font-semibold text-2xl">Rp 0</p>
                </div>
                <div className="card bg-white p-4 space-y-2">
                    <div className='flex items-center space-x-1'>
                        <h3 className="text-sm text-gray-400">Total Pengeluaran Bulan ini</h3>
                        <BiLineChartDown className='text-sm text-orange-500' />
                    </div>
                    <p className="font-semibold text-2xl">- Rp 0</p>
                </div>
            </div>
            <h2 className='mt-4 font-semibold mb-2'>Transaksi Terakhir</h2>
            <div class="relative overflow-x-auto" >
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-white whitespace-nowrap">
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
                                Tgl Beli
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
                                                <p className={`${e.isPaid ? 'text-green-800 bg-green-300' : 'text-yellow-800 bg-yellow-300'} text-center text-sm py-2 px-3 rounded-xl font-semibold`}>{e.isPaid ? 'Sudah Dibayar' : 'Menunggu Pembayaran'}</p>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <a href={e.redirect_url} className="flex items-center hover:text-blue-500" target="_blank"><BiLinkExternal className='mr-2 text-lg' />Klik Disini</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(e.createdAt).toLocaleDateString()}
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
                    : null}
            </div>
        </div >
    )
}

export default Laporan