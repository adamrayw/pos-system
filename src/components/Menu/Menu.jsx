import { useDispatch, useSelector } from 'react-redux'
import { add } from '../../features/menuSlice/menuSlice'
import { useEffect, useState } from 'react'
import { getSubTotal } from '../../features/menuSlice/menuSlice'
import axios from 'axios'
import { useApiRequest } from '../../services/api.service'

function Menu() {
    const { data, error, isLoaded } = useApiRequest("menu")

    if (error !== null) {
        console.log(error.message)
    }

    if (!isLoaded) {
        console.log('loading...')
    }

    const valueMenu = useSelector((state) => state.menu.value)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubTotal());
    }, [dispatch, valueMenu])

    return (
        <>
            {isLoaded ?
                <div className='grid grid-cols-3 gap-4' >
                    {data.items.map((e) => {
                        return (

                            <button className='p-4 bg-white rounded-lg items-center space-y-2 shadow-sm active:bg-gray-100' onClick={() => dispatch(add(e))}>
                                <div className="flex justify-center items-center">
                                    <img src={e.image} width={100} height={100} alt='menu' priority />
                                </div>

                                <div className="text-left">
                                    <h3 className='text-xl font-bold text-gray-800'>{e.name}</h3>
                                    <p className='text-lg font-medium text-orange-500'>
                                        Rp {e.price}
                                    </p>
                                </div>
                            </button>
                        )
                    })}
                </div>
                :
                <div className='flex space-x-4'>
                    <div className="mx-auto bg-white shadow-sm w-full rounded-2xl">
                        <div className="h-48 p-3 overflow-hidden bg-gray-200 animate-pulse">
                        </div>
                        <div className="p-3 h-">
                            <div className="grid grid-row-2 gap-4 mt-2">
                                <div className="h-8 bg-gray-200 rounded animate-pulse">
                                </div>

                                <div className="...">
                                </div>
                                <div className="col-span-2 ...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto bg-white shadow-sm w-full rounded-2xl">
                        <div className="h-48 p-3 overflow-hidden bg-gray-200 animate-pulse">
                        </div>
                        <div className="p-3 h-">
                            <div className="grid grid-row-2 gap-4 mt-2">
                                <div className="h-8 bg-gray-200 rounded animate-pulse">
                                </div>
                                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
                                </div>

                                <div className="...">
                                </div>
                                <div className="col-span-2 ...">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto bg-white shadow-sm w-full rounded-2xl">
                        <div className="h-48 p-3 overflow-hidden bg-gray-200 animate-pulse">
                        </div>
                        <div className="p-3 h-">
                            <div className="grid grid-row-2 gap-4 mt-2">
                                <div className="h-8 bg-gray-200 rounded animate-pulse">
                                </div>
                                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
                                </div>

                                <div className="...">
                                </div>
                                <div className="col-span-2 ...">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </ >
    )
}

export default Menu