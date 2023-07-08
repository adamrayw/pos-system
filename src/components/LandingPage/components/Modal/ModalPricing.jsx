import { useSelector } from "react-redux"
import formatPrice from "../../../../utils/formatPrice.util"
import { useApiSubscribe } from "../../../../services/api.service"
import { useState } from "react"

function ModalPricing(props) {
    const [isLoading, setIsLoading] = useState(false)
    const selector = useSelector(state => state)

    const userId = JSON.parse(localStorage.getItem('user'))?.id ?? '';

    const handleSubscribe = async () => {
        if (userId === '') {
            alert('Anda harus login terlebih dahulu')
            return
        }

        const data = {
            userId: userId,
            nama_paket: selector.modal.value[0].nama_paket,
            price: selector.modal.value[0].harga,
        }

        try {
            setIsLoading(true)
            const response = await useApiSubscribe('transaksi/subscribe', data)

            if (response.err) {
                alert(response.response.data.message)
                setIsLoading(false)
                return
            } else {
                window.location.href = '/success-checkout?payment_link=' + response.response.data.data.redirect_url;
                setIsLoading(false)
            }

        } catch (error) {
            setIsLoading(false)
            console.log("err: " + error)
        }
    }

    const data = selector.modal.value[0]
    return (
        <div>
            <input type="checkbox" id="modal-pricing-confirm" className="modal-toggle" />
            <label htmlFor="modal-pricing-confirm" className="modal cursor-pointer">
                <label className="modal-box relative space-y-4" htmlFor="">
                    <h3 className="text-2xl font-bold text-blue-500a">Konfirmasi Order</h3>
                    {data && data.nama_paket ? (
                        <div>
                            <div className="flex justify-center items-center my-4 py-10 bg-blue-500 rounded-lg">
                                <p className="text-lg font-bold text-white">{data.nama_paket}</p>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="text-gray-500 font-medium">Nama Paket</td>
                                        <td className="text-blue-500 font-medium pr-2">:</td>
                                        <td className="font-medium text-blue-500">{data.nama_paket}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500 font-medium">Harga</td>
                                        <td className="text-blue-500 font-medium pr-2">:</td>
                                        <td className="font-medium text-blue-500">{formatPrice(data.harga)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-gray-500 font-medium">Berlangganan selama</td>
                                        <td className="text-blue-500 font-medium pr-2">:</td>
                                        <td className="font-medium text-blue-500">{data.duration}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Data not available</p>
                    )}
                    <div className="flex justify-end space-x-2">
                        <div className="modal-action">
                            <label
                                htmlFor="modal-pricing-confirm" className="btn btn-md text-xs btn-outline hover:bg-blue-500 border border-s-blue-500 text-blue-500">
                                Batal
                            </label>
                        </div>
                        <div className="modal-action">
                            {isLoading ? (
                                <label className="btn bg-blue-500 border-0 hover:bg-blue-600 active:bg-blue-500 loading">Mohon Tunggu</label>
                            ) : (
                                <label className="btn bg-blue-500 border-0 hover:bg-blue-600 active:bg-blue-500" onClick={handleSubscribe}>Checkout</label>
                            )}
                        </div>
                    </div>
                </label>
            </label>
        </div>
    )
}

export default ModalPricing