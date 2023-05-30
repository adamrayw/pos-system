import { useSelector, useDispatch } from 'react-redux'
import { add, remove } from '../../features/menuSlice/menuSlice'
import convert from '../../utils/convertToRupiah.utils'
import ModalTransaksi from '../Modal/ModalTransaksi'
import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { BiFoodMenu } from 'react-icons/bi'

function RightBar() {
    const [isModalKonfirmasiOpen, setIsModalKonfirmasiOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const menus = useSelector((state) => state.menu.value)
    const subTotal = useSelector((state) => state.menu.subTotal)
    const dispatch = useDispatch()

    let total = subTotal + (subTotal * 0.11)

    const triggerFromModal = (data) => {
        setIsModalKonfirmasiOpen(data)
    }

    return (
        <>
            <div className={`absolute ${isOpen ? 'hidden' : 'block'} m-6 right-0 bottom-0 '`} >
                <button className=' bg-orange-500 flex items-center px-2 rounded-3xl text-white shadow-lg space-x-2 hover:bg-orange-600 transition active:bg-orange-800' onClick={() => setIsOpen(true)}>
                    <BiFoodMenu className='md:text-3xl text-xl my-2' />
                    {/* <p className='whitespace-nowrap font-semibold'>Open</p> */}
                </button>
            </div>
            <div className={`md:relative absolute ${isOpen ? 'block' : 'hidden'} h-full w-full md:w-1/2 top-1/2 md:top-0 left-1/2 md:left-0 md:transform-none transform md:-translate-x-0 md:translate-y-0 -translate-x-1/2 -translate-y-1/2`}>
                {isModalKonfirmasiOpen ?
                    <ModalTransaksi toggleModal={triggerFromModal} dataPrice={[{ subTotal, total }]} />
                    :
                    null
                }
                <div className={`md:relative absolute right-0 ${isOpen ? ' p-10' : 'w-[0]'} h-full w-full transition bg-white max-h-screen scrollbar-hide overflow-y-scroll`}>
                    <div className={`flex flex-col justify-between ${isOpen ? 'block' : 'hidden'}`} >
                        <div>
                            <div className='w-full flex flex-row-reverse justify-between items-center mb-6'>
                                <button className=' bg-orange-500 px-2 rounded-lg text-white hover:bg-orange-600 transition' onClick={() => setIsOpen(false)}>
                                    <IoIosClose className='text-xl my-2' />
                                </button>
                                <h1 className="font-bold text-xl">Current Order</h1>
                            </div>
                            <div className='space-y-4 h-48 overflow-y-scroll scrollbar-hide'>
                                {menus.length === 0 ?
                                    <p className='text-sm text-gray-400 text-center'>Anda belum menambahkan menu</p>
                                    : ''}
                                {menus.map((e) => {
                                    return (
                                        <div key={e.id} className="flex items-center space-x-4">
                                            <img src={e.image} alt="icon" className='w-14' />
                                            <div className='flex justify-between items-end w-full'>
                                                <div className='space-y-2'>
                                                    <h2 className='font-bold text-lg'>{e.name}</h2>
                                                    <p className='text-orange-500 font-medium'>Rp {convert(e.price)}</p>
                                                </div>
                                                <div className='flex items-center justify-between space-x-2'>
                                                    <button className='text-xs py-1 w-6  rounded px-2 hover:bg-orange-600 active:bg-orange-800 bg-orange-500 text-white transition' onClick={() => {
                                                        dispatch(remove(e))
                                                    }}>-</button>
                                                    <p className='text-sm'>
                                                        {e.qty}
                                                    </p>
                                                    <button className='text-xs py-1 w-6 rounded px-2 hover:bg-orange-600 active:bg-orange-800 bg-orange-500 text-white transition' onClick={() => dispatch(add(e))}>+</button>
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
                                <p className='text-gray-500 font-semibold'>Rp {convert(subTotal)}</p>
                            </div>
                            <div className='flex justify-between text-gray-800'>
                                <h1 className='font-semibold'>Diskon</h1>
                                <p className='text-gray-500 font-semibold'>-</p>
                            </div>
                            <div className='flex justify-between text-gray-800'>
                                <h1 className='font-semibold'>PPN</h1>
                                <p className='text-gray-500 font-semibold'>+11%</p>
                            </div>
                            <div className='flex justify-between pt-10 text-gray-800'>
                                <h1 className='font-bold text-xl'>TOTAL</h1>
                                <p className='text-gray-500 font-semibold text-lg'>Rp {convert(total)}</p>
                            </div>
                        </div>
                        <div className='mt-10 space-y-2'>
                            {/* <input type="text" name="diskon" className='w-full p-3 text-center border rounded focus:ring focus:ring-orange-500 font-semibold text-sm' placeholder='Masukkan kode diskon' /> */}

                            {menus.length === 0 ?
                                <button className='bg-orange-500 opacity-40 hover:cursor-not-allowed w-full rounded text-white font-semibold py-3 transition'>Bayar</button>
                                :
                                <button className='bg-orange-500 w-full rounded text-white font-semibold py-3 hover:bg-orange-600 active:bg-orange-700 transition' onClick={() => setIsModalKonfirmasiOpen(true)}>Bayar</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default RightBar