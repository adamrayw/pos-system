import Soto from '/assets/soto.png'
import { useSelector, useDispatch } from 'react-redux'
import { add, remove, getSubTotal } from '../../features/menuSlice/menuSlice'

function RightBar() {

    const menus = useSelector((state) => state.menu.value)
    const subTotal = useSelector((state) => state.menu.subTotal)
    const dispatch = useDispatch()

    let total = subTotal + 1000


    return (
        <div className="w-2/5 bg-white p-10">
            <div className='flex flex-col justify-between'>
                <div>
                    <h1 className="font-bold text-xl mb-6">Current Order</h1>
                    <div className='space-y-4 h-48 overflow-y-scroll scrollbar-hide'>
                        {menus.length === 0 ?
                            <p className='text-sm text-gray-400 text-center'>Anda belum menambahkan menu</p>
                            : ''}
                        {menus.map((e) => {
                            return (
                                <div className="card flex items-center space-x-4">
                                    <img src={e.image} alt="icon" className='w-14' />
                                    <div className='flex justify-between items-end w-full'>
                                        <div className='space-y-2'>
                                            <h2 className='font-medium'>{e.name}</h2>
                                            <p className='text-orange-500 font-medium'>Rp{new Intl.NumberFormat(['ban', 'id']).format(e.price)}</p>
                                        </div>
                                        {/* <div>
                                            <p className='text-gray-400'>{e.qty}x</p>
                                        </div> */}
                                        <div className='flex justify-between space-x-2'>
                                            <button className='text-xs py-1 rounded px-2 hover:bg-orange-600 active:bg-orange-800 bg-orange-500 text-white transition' onClick={() => dispatch(add(e))}>+</button>
                                            <p>
                                                {e.qty}
                                            </p>
                                            <button className='text-xs py-1 rounded px-2 hover:bg-orange-600 active:bg-orange-800 bg-orange-500 text-white transition' onClick={() => {
                                                dispatch(remove(e))
                                            }}>-</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className='mt-10 bg-gray-100 p-4 space-y-2 rounded-lg'>
                    <div className='flex justify-between text-gray-800'>
                        <h1 className='font-semibold'>Subtotal</h1>
                        <p className='text-gray-500 font-semibold'>Rp {new Intl.NumberFormat(['ban', 'id']).format(subTotal)}</p>
                    </div>
                    <div className='flex justify-between text-gray-800'>
                        <h1 className='font-semibold'>Diskon</h1>
                        <p className='text-gray-500 font-semibold'>-</p>
                    </div>
                    <div className='flex justify-between text-gray-800'>
                        <h1 className='font-semibold'>Pajak</h1>
                        <p className='text-gray-500 font-semibold'>+Rp 1.000</p>
                    </div>
                    <div className='flex justify-between pt-10 text-gray-800'>
                        <h1 className='font-bold text-xl'>TOTAL</h1>
                        <p className='text-gray-500 font-semibold text-lg'>Rp {new Intl.NumberFormat(['ban', 'id']).format(total)}</p>
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