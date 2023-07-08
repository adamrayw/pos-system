import { useEffect, useState } from "react"
import { useApiGetDashboard } from "../../../services/api.service"
import formatPrice from "../../../utils/formatPrice.util"
import { formatDate } from "../../../utils/formatDate.util"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const userId = JSON.parse(localStorage.getItem('user'))?.id ?? ''

    const getDashboardData = async () => {

        try {
            const response = await useApiGetDashboard(`user/dashboard/${userId}`)
            if (response.err) {
                console.log(response.err)

            }

            setData(response.response.data.response.subscriptions)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDashboardData()
        if (userId === '') {
            window.location.href = '/';
        }
    }, [])

    // Get the current URL
    const url = window.location.href;

    // Create a URL object
    const urlObject = new URL(url);

    // Get the value of the payment_link parameter
    const paymentLink = urlObject.searchParams.get('isSubscribed');

    useEffect(() => {
        if (paymentLink === 'false') {
            toast.error('Anda harus berlangganan terlebih dahulu')
        }
    }, [])


    return (
        <div className="md:px-12 px-4 py-10 leading-loose">
            <div className="flex items-center justify-between mb-4">
                <Link to='/' className="rounded-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition duration-300">
                    <svg
                        className="h-10 w-10 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 8a.5.5 0 01-.5.5H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5a.5.5 0 01.5.5z"
                        />
                    </svg>
                </Link>
                <div>
                    <Link to="/app" class="btn  border-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 transition-all text-white text-xs rounded-full font-bold shadow-lg focus:outline-none" target="_blank">Go to App</Link>
                </div>
            </div>
            <div>
                <h1 className="font-bold md:text-4xl text-2xl">Dashboard</h1>
                <p className="text-gray-500 font-light">Kelola berlangganan kamu disini</p>
            </div>
            <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Paket</th>
                            <th>Harga</th>
                            <th>Aktif Sampai</th>
                            <th>Tanggal Checkout</th>
                            <th>Status Pembayaran</th>
                            <th>Status Aktif</th>
                            <th>Status Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={index} className="font-semibold">
                                    <th>{index + 1}</th>
                                    <td className="font-semibold">{item.type}</td>
                                    <td className="font-semibold">{formatPrice(item.price)}</td>
                                    {item.expired === null ? (
                                        <td> - </td>
                                    ) : (
                                        <td>{formatDate(item.expired)}</td>
                                    )}
                                    <td>{formatDate(item.createdAt)}</td>
                                    <td>
                                        {item.isPaid ? (
                                            <span className="bg-green-500 text-white px-4 text-sm py-2 rounded-full font-bold">Sudah Dibayar</span>
                                        ) : (
                                            <span className="bg-red-500 text-white px-4 text-sm py-2 rounded-full font-bold">Belum Dibayar</span>
                                        )}
                                    </td>
                                    <td>
                                        {item.isActived ? (
                                            <span className="bg-green-500 text-white px-4 text-sm py-2 rounded-full font-bold">Aktif</span>
                                        ) : (
                                            <span className="bg-red-500 text-white px-4 text-sm py-2 rounded-full font-bold">Tidak Aktif</span>
                                        )}
                                    </td>
                                    <td>
                                        <button class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 transition-all text-white text-base rounded-full font-bold shadow-lg focus:outline-none">
                                            <a href={item.redirect_url} class="flex items-center justify-center px-8 py-3">
                                                <svg
                                                    viewBox="0 0 576 512"
                                                    fill="currentColor"
                                                    class="w-6 h-6 mr-2"
                                                >
                                                    <path d="M64 64C28.7 64 0 92.7 0 128v256c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm48 160h160c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 336c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zm280-176h80c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24h-80c-13.3 0-24-10.7-24-24v-48c0-13.3 10.7-24 24-24z" />
                                                </svg>
                                                <span>Lihat</span>
                                            </a>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {data.length === 0 && (
                    <div className="flex justify-center items-center h-44">
                        <p className="text-gray-500 font-light">Anda belum berlangganan</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard