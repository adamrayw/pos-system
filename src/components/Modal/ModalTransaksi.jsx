import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import convert from "../../utils/convertToRupiah.utils"
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useApiPost } from "../../services/api.service"
import { CgSpinner } from "react-icons/cg"
import { reset } from "../../features/menuSlice/menuSlice"
import { TbUnlink } from 'react-icons/tb'

function ModalTransaksi(props) {
    const [isLoading, setIsLoading] = useState(false)
    const menus = useSelector((state) => state.menu.value)
    const [isToggleModalOpen, setIsToggleModalOpen] = useState(true)
    const [paymentMethod, setPaymentMethod] = useState('midtrans')
    const [paymentLink, setPaymentLink] = useState([])

    const dispatch = useDispatch()

    const triggerToRightBarComponent = () => {
        props.toggleModal(false)
    }

    function handlePayment() {
        setIsLoading(true)
        useApiPost("transaksi/post", { data: { menu: menus, total: props.dataPrice[0].total } })
            .then((response) => {
                setPaymentLink(response.response.data.data.redirect_url)
                setIsLoading(false)
                dispatch(reset())
                redirect(paymentLink)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })

    }

    return (
        <div>
            <div className={`fixed flex justify-center items-center ${isToggleModalOpen ? 'block' : 'hidden'} bg-black bg-opacity-60 top-0 left-0 right-0 w-full z-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`} >
                {paymentLink.length === 0 ?
                    <div className="relative w-full h-full max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow px-6 pb-6 my-10">
                            {isLoading ?
                                <div className="absolute h-full flex justify-center items-center w-full left-0 bg-gray-500 opacity-30">
                                    <div className="bg-white rounded p-2">
                                        <CgSpinner className="text-4xl text-orange-500 animate-spin" />
                                    </div>
                                </div>
                                :
                                null
                            }
                            <h1 className="py-3 font-semibold text-2xl">Konfirmasi Pesanan</h1>
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal" onClick={triggerToRightBarComponent}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <h2 className="text-gray-500 mb-2">Menu yang dipesan</h2>
                            <div className="h-32 scrollbar-hide overflow-x-scroll">
                                <div className="grid grid-cols-4 justify-between">
                                    {menus.map((e) => {
                                        return (
                                            <>
                                                <div key={e.id} className="card flex flex-col items-center justify-center space-y-4 my-1">
                                                    <img src={e.image} alt="icon" className='w-10' />
                                                    <div className='flex flex-col justify-between items-center w-full'>
                                                        <div>
                                                            <h2 className='font-medium text-sm'>{e.name}</h2>
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <p className='text-sm font-semibold'>
                                                                {e.qty}x
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="bg-gray-100 text-gray-800 px-5 py-4 space-y-2 mt-5">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold">
                                        Subtotal
                                    </h4>
                                    <p className="text-sm font-medium">
                                        Rp. {convert(props.dataPrice[0].subTotal)}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold">
                                        Diskon
                                    </h4>
                                    <p className="text-sm font-medium">
                                        -
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold">
                                        Pajak
                                    </h4>
                                    <p className="text-sm font-medium">
                                        Rp. 1.000
                                    </p>
                                </div>
                                <div className="flex items-center pt-4 justify-between">
                                    <h4 className="font-bold text-lg">
                                        TOTAL
                                    </h4>
                                    <p className="text-lg font-medium">
                                        Rp. {convert(props.dataPrice[0].total)}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 text-start gap-y-2 mt-4">
                                <h2 className="text-gray-500">Pilih Metode Pembayaran</h2>
                                <button className={`border ${paymentMethod === 'midtrans' ? 'border-orange-500' : ''} hover:border-orange-500 py-2 text-left px-5 rounded font-semibold flex items-center justify-between`} onClick={() => {
                                    if (paymentMethod === '' || paymentMethod === 'cash') {
                                        setPaymentMethod('midtrans')
                                    } else {
                                        setPaymentMethod('')
                                    }
                                }}>
                                    <div>
                                        Pay with Midtrans
                                        <p className="text-xs font-normal text-orange-500 mt-1">E-Wallet, Transfer Bank, Debit, QRIS</p>
                                    </div>
                                    {paymentMethod === 'midtrans' ?
                                        <BsFillCheckCircleFill className="text-orange-500" />
                                        :
                                        null
                                    }
                                </button>
                                <button className={`border ${paymentMethod === 'cash' ? 'border-blue-500 text-blue-500' : ''} group hover:border-blue-500 py-2 flex items-center justify-between px-5 rounded font-semibold`} onClick={() => {
                                    if (paymentMethod === '' || paymentMethod === 'midtrans') {
                                        setPaymentMethod('cash')
                                    } else {
                                        setPaymentMethod('')
                                    }
                                }}>
                                    <div className="flex items-center">
                                        Pay with Cash
                                    </div>
                                    <BsFillCheckCircleFill className={`text-blue-500 hidden ${paymentMethod === 'cash' ? '' : 'group-hover:block'} `} />
                                    {paymentMethod === 'cash' ?
                                        <BsFillCheckCircleFill className="text-blue-500" />
                                        :
                                        null
                                    }
                                </button>
                            </div>
                            {paymentMethod === 'midtrans' ?
                                <>
                                    {isLoading ?
                                        <button disabled className="w-full flex justify-center items-center text-white py-3 mt-4 bg-orange-300 hover:bg-orange-600 active:bg-orange-700 font-medium rounded-lg text-sm transition px-5 text-center hover:cursor-not-allowed">
                                            Buat Link Pembayaran
                                        </button>
                                        :
                                        <button className='bg-orange-500 w-full rounded text-white font-semibold py-3 mt-4 text-sm hover:bg-orange-600 active:bg-orange-700 transition'
                                            onClick={() => handlePayment()}
                                        >Buat Link Pembayaran</button>
                                    }
                                </>
                                :
                                null
                            }
                            {paymentMethod === 'cash' ?
                                <button className='bg-blue-500 w-full rounded text-white font-semibold py-3 mt-4 text-sm hover:bg-blue-600 active:bg-blue-700 transition'>Pembayaran Selesai</button>
                                :
                                null
                            }
                            {paymentMethod === '' ?
                                <button className='bg-orange-500 w-full rounded invisible text-white font-semibold py-3 mt-4 text-sm hover:bg-orange-600 active:bg-orange-700 transition'>Buat Link Pembayaran</button>
                                :
                                null
                            }
                        </div>
                    </div>
                    :
                    <div className="relative w-full h-full max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow px-6 pb-6 my-10">
                            {/* <h1 className="py-3 font-semibold text-2xl">Link Pembayaran</h1> */}
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal" onClick={() => {
                                triggerToRightBarComponent()
                                setPaymentLink('')
                            }}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="pt-10">
                                <TbUnlink className="text-6xl mx-auto  mb-6 text-orange-500" />
                                <h1 className="text-2xl mb-2 text-center font-bold">Link Pembayaran Berhasil Dibuat</h1>
                                <p className="text-center text-sm text-gray-500 leading-relaxed">Klik <span className="text-orange-500 font-semibold">Lanjutkan Pembayaran</span> untuk melanjutkan pembayaran, link pembayaran tersimpan di laporan.</p>
                                <a className="flex justify-center mt-4 bg-orange-500 text-white py-2 font-semibold rounded hover:bg-orange-600 active:bg-orange-800 transition" href={paymentLink}>Lanjutkan Pembayaran</a>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default ModalTransaksi