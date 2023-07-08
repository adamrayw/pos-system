import React from 'react'

function ModalSubscription({ isExpiblue, onClose, buttonText }) {
    return (
        <>
            <div className={`fixed flex justify-center items-center bg-black bg-opacity-60 top-0 left-0 right-0 w-full z-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`} >
                <div className="relative w-full h-full max-w-md md:h-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div className="px-6 py-6 lg:px-8 flex flex-col items-center justify-center text-center">
                            <svg
                                className='w-24 h-24 text-blue-500'
                                viewBox="0 0 512 512"
                                fill="currentColor"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={32}
                                    d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
                                />
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={32}
                                    d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
                                />
                                <path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z" />
                            </svg>
                            <h2 className="font-bold text-lg mt-2">Langganan Anda telah kedaluwarsa!</h2>
                            <p className="mt-2 mb-6 text-gray-500">Atau mungkin Anda belum berlangganan? Silakan berlangganan untuk terus menggunakan layanan kami.</p>
                            <a href='https://posku-main.vercel.app/' onClick={onClose} className='px-4 py-2 text-sm text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-500 transition'>Berlangganan</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalSubscription