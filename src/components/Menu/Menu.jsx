import { useDispatch, useSelector } from 'react-redux'
import { add } from '../../features/menuSlice/menuSlice'
import { menu } from '../../dataDummy/menu'
import { useEffect } from 'react'
import { getSubTotal } from '../../features/menuSlice/menuSlice'

function Menu() {


    const valueMenu = useSelector((state) => state.menu.value)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubTotal());
    }, [dispatch, valueMenu])

    return (
        <div className='grid grid-cols-3 gap-4' >
            {menu.map((e) => {
                return (

                    <button className='p-4 bg-white items-center space-y-2 shadow-sm active:bg-gray-100' onClick={() => dispatch(add(e))}>
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
        </div >
    )
}

export default Menu