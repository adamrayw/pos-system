import React, { useEffect } from 'react'

function SuccessCheckout() {

    // Get the current URL
    const url = window.location.href;

    // Create a URL object
    const urlObject = new URL(url);

    // Get the value of the payment_link parameter
    const paymentLink = urlObject.searchParams.get('payment_link');

    return (
        <div className="md:px-12 px-4 mt-10 h-screen">
            <div className="flex items-center justify-center">
                <div className='text-center space-y-2'>
                    <div className="card w-fit bg-white text-slate-600">
                        <div className="card-body items-center text-center">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                className='text-green-500 w-16 h-16 mx-auto mb-2'
                            >
                                <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-3.97-3.03a.75.75 0 00-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-.01-1.05z" />
                            </svg>
                            <h1 className="font-bold md:text-4xl text-3xl">Checkout Berhasil!</h1>
                            <p className="text-gray-500 font-normal text-sm">
                                Lanjutkan pembayaran segera, agar akun anda dapat aktif.
                            </p>
                            <div className='card-actions flex items-center flex-col-reverse md:flex-row md:space-x-2 pt-4'>
                                <a href='/dashboard' className='btn text-xs'>Pergi ke Dashboard</a>
                                <a href={paymentLink ?? ''} className='btn bg-orange-500 hover:bg-orange-600 border-0 text-white text-xs'>
                                    Lanjutkan Pembayaran
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessCheckout