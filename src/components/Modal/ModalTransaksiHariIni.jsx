import { useEffect, useState } from "react"
import { useApiRequest } from "../../services/api.service"
import { useDispatch, useSelector } from "react-redux"

function ModalTransaksiHariIni() {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const getTotal = useSelector((state) => state.menu.total_pendapatan_today)

    useEffect(() => {
        const fetchTransaksi = async () => {
            setIsLoading(true)
            await useApiRequest('transaksi/get/' + JSON.parse(localStorage.getItem('user')).id)
                .then((response) => {
                    setData(response.response.data.transaction_today.Transaksi)
                    // console.log(response.response.data.transaction_today.Transaksi)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false)
                })
        }

        fetchTransaksi()
    }, [])

    const filteredData = {}

    // Iterasi setiap transaksi
    data.forEach(transaksi => {
        transaksi.menu.set.forEach(item => {
            const { name, qty } = item;

            // Jika nama item belum ada di objek filteredData, tambahkan dengan qty awal
            if (!filteredData[name]) {
                filteredData[name] = { ...item };
            } else {
                // Jika nama item sudah ada di objek filteredData, tambahkan qty
                filteredData[name].qty += qty;
            }
        });
    });

    /* The line `const result = Object.values(filteredData);` is creating an array `result` that
    contains the values of the `filteredData` object. */
    const result = Object.values(filteredData);

    /* The line `result.sort((a, b) => b.qty - a.qty);` is sorting the `result` array in descending
    order based on the `qty` property of each item. It is using the `sort()` method with a compare
    function `(a, b) => b.qty - a.qty` to determine the order of the elements. */
    result.sort((a, b) => b.qty - a.qty);



    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="modal_today" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Produk Paling Laku Hari Ini</h3>
                    <table className="w-full leading-normal">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Item
                                </th>
                                <th scope="col" className="py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Total Terjual
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="py-5 text-sm bg-white border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <a href="#" className="relative block">
                                                        <img alt="profil" src={item.image} priority="true" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                    </a>
                                                </div>
                                                <div className="mx-3">
                                                    <p className="text-gray-900 whitespace-nowrap">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 text-sm bg-white border-b border-gray-200">
                                            <div className="flex items-center">

                                                <p className="text-gray-900 whitespace-nowrap">
                                                    {item.qty}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                // Lakukan operasi lain yang diinginkan untuk setiap item di sini
                            })}
                        </tbody>
                    </table>

                    <p className="py-4">

                    </p>
                    <div className="modal-action">
                        <label htmlFor="modal_today" className="btn bg-blue-500 hover:bg-blue-600 transition border-0">Close</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalTransaksiHariIni