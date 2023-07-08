import data from "../../../../data/pricing.data.js"
import { addModalData } from '../../../../features/modal/modalSlice.js'
import formatPrice from '../../../../utils/formatPrice.util.js'
import { useDispatch } from 'react-redux'

function Pricing() {

    const dispatch = useDispatch()

    return (
        <div className="my-10 bg-blue-700 md:mx-24 mx-4 py-10 md:px-10 rounded-lg md:space-y-16 space-y-4" id="harga">
            <h1 class="font-extrabold text-xl lg:text-4xl text-center text-white mb-8 px-4">
                Tunggu apalagi? ayo berlangganan!
            </h1>
            <div className="max-w-full md:mx-24 mx-6 grid md:grid-cols-3 grid-cols-1 md:gap-x-10 gap-y-10">
                {data.map((item, index) => (
                    <div key={index} className="border p-4 rounded-md">
                        <h5 className="mb-4 text-xl font-medium text-gray-200">
                            {item.nama_paket}
                        </h5>
                        <div className="flex items-baseline text-gray-100 mb-6">
                            <span className="md:text-3xl text-2xl font-extrabold tracking-tight">
                                {formatPrice(item.harga)}
                            </span>
                            <span className="ml-1 md:text-lg text-md font-normal text-gray-400">
                                /{item.duration}
                            </span>
                        </div>
                        <label
                            htmlFor="modal-pricing-confirm"
                            className="btn btn-md w-full justify-center rounded-lg bg-white text-center border-0 text-sm font-bold text-blue-900 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-800 dark:focus:ring-blue-500"
                            onClick={() => dispatch(addModalData(item))}
                        >
                            Berlangganan
                        </label>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Pricing