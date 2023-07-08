import { useDispatch, useSelector } from "react-redux"
import { removeRincian } from "../../features/menuSlice/menuSlice"

function ModalRincianPembayaran() {
    const dispatch = useDispatch()

    const rincian = useSelector((state) => state.menu.rincian)

    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="modal_rincian" className="modal-toggle" />
            <div className="modal fixed inset-0 flex items-center justify-center z-20">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Rincian Pembayaran</h3>
                    <tabel>
                        <tr>
                            <td>Waktu Transaksi</td>
                            <td className="px-2">:</td>
                            <td>{rincian.transaction_time}</td>
                        </tr>
                        <tr>
                            <td>Tipe Pembayaran</td>
                            <td className="px-2">:</td>
                            <td>{rincian.payment_type}</td>
                        </tr>
                        <tr>
                            <td>Order id</td>
                            <td className="px-2">:</td>
                            <td>{rincian.order_id}</td>
                        </tr>
                        <tr>
                            <td>Status Transaksi</td>
                            <td className="px-2">:</td>
                            <td>{rincian.transaction_status ?
                                (
                                    <>
                                        <span className="bg-green-300 text-green-500 px-2 rounded font-bold">Success</span>
                                    </>
                                )
                                :
                                <>
                                    <span className="text-red-500">Failed</span>
                                </>
                            }
                            </td>
                        </tr>
                    </tabel>
                    <div className="modal-action">
                        <label htmlFor="modal_rincian" className="btn" onClick={() => dispatch(removeRincian())}>Close</label>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ModalRincianPembayaran