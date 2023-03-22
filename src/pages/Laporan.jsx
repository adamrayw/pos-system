import { BiLineChart, BiLineChartDown } from 'react-icons/bi'
function Laporan() {
    return (
        <div>
            <h1 className="text-4xl font-semibold mb-6">Laporan</h1>
            <div className="grid grid-cols-2 gap-2 justify-between">
                <div className="card bg-white p-4 space-y-2">
                    <div className='flex items-center space-x-1'>
                        <h3 className="text-sm text-gray-400">Total Pendapatan Hari Ini</h3>
                        <BiLineChart className='text-sm text-orange-500' />
                    </div>
                    <p className="font-semibold text-2xl">Rp 3.231.919</p>
                </div>
                <div className="card bg-white p-4 space-y-2">
                    <div className='flex items-center space-x-1'>
                        <h3 className="text-sm text-gray-400">Total Pengeluaran</h3>
                        <BiLineChartDown className='text-sm text-orange-500' />
                    </div>
                    <p className="font-semibold text-2xl">- Rp 3.231.919</p>
                </div>
                <div className="card bg-white p-4 space-y-2">
                    <div className='flex items-center space-x-1'>
                        <h3 className="text-sm text-gray-400">Total Pendapatan Bulan Ini</h3>
                        <BiLineChart className='text-sm text-orange-500' />
                    </div>
                    <p className="font-semibold text-2xl">Rp 3.231.919</p>
                </div>
                <div className="card bg-white p-4 space-y-2">
                    <div className='flex items-center space-x-1'>
                        <h3 className="text-sm text-gray-400">Total Pengeluaran Bulan ini</h3>
                        <BiLineChartDown className='text-sm text-orange-500' />
                    </div>
                    <p className="font-semibold text-2xl">- Rp 3.231.919</p>
                </div>
            </div>
            <h2 className='mt-4 font-semibold mb-2'>Transaksi Terakhir</h2>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-white">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Menu
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tgl Beli
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                #TR212
                            </th>
                            <td class="px-6 py-4">
                                Soto, Es Teh
                            </td>
                            <td class="px-6 py-4">
                                Rp 16.500
                            </td>
                            <td class="px-6 py-4">
                                13/03/2023
                            </td>
                        </tr>
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                #TR190
                            </th>
                            <td class="px-6 py-4">
                                Coca - lala
                            </td>
                            <td class="px-6 py-4">
                                Rp 5.000
                            </td>
                            <td class="px-6 py-4">
                                22/01/2023
                            </td>
                        </tr>
                        <tr class="bg-white">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                #TR188
                            </th>
                            <td class="px-6 py-4">
                                Burger, Kentang, Lemon Tea
                            </td>
                            <td class="px-6 py-4">
                                Rp 48.500
                            </td>
                            <td class="px-6 py-4">
                                12/03/2023
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Laporan