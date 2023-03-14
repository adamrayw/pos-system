import Soto from '../../assets/soto.png'

function RightBar() {
    return (
        <div className="w-1/3 bg-white p-10">
            <div className='flex flex-col justify-between'>
                <div>
                    <h1 className="font-bold text-xl mb-6">Current Order</h1>
                    <div className='space-y-4'>
                        <div className="card flex items-center space-x-4">
                            <img src={Soto} alt="icon" className='w-14' />
                            <div className='flex justify-between items-center w-full'>
                                <div>
                                    <h2 className='font-medium'>Soto</h2>
                                    <p className='text-orange-500 font-medium'>Rp 10.000</p>
                                </div>
                                <div>
                                    <p className='text-gray-400'>2x</p>
                                </div>
                            </div>
                        </div>
                        <div className="card flex items-center space-x-4">
                            <img src={Soto} alt="icon" className='w-14' />
                            <div className='flex justify-between items-center w-full'>
                                <div>
                                    <h2 className='font-medium'>Soto</h2>
                                    <p className='text-orange-500 font-medium'>Rp 10.000</p>
                                </div>
                                <div>
                                    <p className='text-gray-400'>2x</p>
                                </div>
                            </div>
                        </div>
                        <div className="card flex items-center space-x-4">
                            <img src={Soto} alt="icon" className='w-14' />
                            <div className='flex justify-between items-center w-full'>
                                <div>
                                    <h2 className='font-medium'>Soto</h2>
                                    <p className='text-orange-500 font-medium'>Rp 10.000</p>
                                </div>
                                <div>
                                    <p className='text-gray-400'>2x</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10 bg-gray-100 p-4 space-y-2'>
                    <div className='flex justify-between text-gray-800'>
                        <h1 className='font-semibold'>Subtotal</h1>
                        <p className='text-gray-500 font-semibold'>Rp 60.000</p>
                    </div>
                    <div className='flex justify-between text-gray-800'>
                        <h1 className='font-semibold'>Diskon</h1>
                        <p className='text-gray-500 font-semibold'>-Rp 10.000</p>
                    </div>
                    <div className='flex justify-between text-gray-800'>
                        <h1 className='font-semibold'>Pajak</h1>
                        <p className='text-gray-500 font-semibold'>+Rp 1.000</p>
                    </div>
                    <div className='flex justify-between pt-10 text-gray-800'>
                        <h1 className='font-bold text-xl'>TOTAL</h1>
                        <p className='text-gray-500 font-semibold text-lg'>Rp 51.000</p>
                    </div>
                </div>
                <div className='mt-10'>
                    <button className='bg-orange-500 w-full rounded text-white font-semibold py-3 hover:bg-orange-600 active:bg-orange-700 transition'>Lanjutkan Pembayaran</button>
                </div>
            </div>

        </div>
    )
}

export default RightBar