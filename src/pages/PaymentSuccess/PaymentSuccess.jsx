import { Link } from 'react-router-dom'
import PaymentSuccessImg from '../../assets/payment_success.svg'

function PaymentSuccess() {
    return (
        <div className="md:px-12 px-4 mt-10 h-screen">
            <div className="flex items-center justify-center">
                <div className='text-center space-y-2'>
                    <div className="card w-fit bg-white text-slate-600">
                        <div className="card-body items-center text-center py-10 px-8 rounded shadow-sm space-y-2">
                            <img src={PaymentSuccessImg} alt="payment_success_img" className='w-40 h-40 mx-auto' />
                            <h1 className="font-bold md:text-4xl text-2xl">Pembayaran Berhasil!</h1>
                            <p className="text-gray-500 font-normal md:text-sm text-sm">
                                Silahkan cek status pembayaran anda di dashboard atau di laporan.
                            </p>
                            <div className='card-actions w-full flex items-center justify-center flex-col-reverse md:flex-row md:space-x-0 px-4 pt-4 font-semibold'>
                                <Link to='/app/laporan' className='w-full px-4 py-3 rounded bg-gray-500 hover:bg-gray-600 transition text-white text-sm md:mb-0 mb-4 active:bg-gray-700'>Laporan</Link>
                                <Link to='/dashboard' className='w-full px-4 py-3 rounded bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition border-0 text-white text-sm '>
                                    Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess