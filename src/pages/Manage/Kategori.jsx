import { useEffect, useState } from "react"
import { FaRegEdit, FaTrash } from "react-icons/fa"
import ModalKategori from "../../components/Modal/ModalKategori"
import { useApiRequest } from "../../services/api.service"

function Kategori() {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [dataEdit, setDataEdit] = useState([])

    useEffect(() => {
        const fetchKategori = async () => {
            setIsLoaded(false)
            const { response, err } = await useApiRequest("kategori/" + JSON.parse(localStorage.getItem('user')).id)
            setData(response.data)
            setIsLoaded(true)
        }

        fetchKategori()

    }, [isModalOpen, isDeleteModalOpen, isEditModalOpen])

    const triggerFromModal = (data) => {
        setIsModalOpen(data)
        setIsDeleteModalOpen(data)
        setIsEditModalOpen(data)
    }

    return (
        <div className="px-4">
            {isModalOpen ? (
                <ModalKategori toggleModal={triggerFromModal} isEdit={false} />
            ) : null}

            {isDeleteModalOpen ?
                <ModalKategori dataMenu={dataEdit} isDelete={true} toggleModal={triggerFromModal} />
                :
                null
            }

            {isEditModalOpen ?
                <ModalKategori dataMenu={dataEdit} isEdit={true} toggleModal={triggerFromModal} />
                :
                null
            }
            <h1 className="text-2xl md:text-4xl font-semibold">
                Manage Kategori
            </h1>
            <button
                className="py-2 bg-orange-500 text-white px-4 mt-4 rounded-lg shadow-sm font-semibold hover:bg-orange-600 active:bg-orange-700 transition text-sm"
                onClick={() => setIsModalOpen(true)}
            >Tambah Kategori</button>
            <div className="container w-full mx-auto">
                <div>
                    <div className="py-4 overflow-x-auto">
                        <div className="inline-block w-full overflow-hidden overflow-x-auto rounded-lg shadow">
                            <table className="w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Kategori
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Dibuat Pada
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoaded ?
                                        <>
                                            {
                                                data.items.map((e) => {
                                                    return (
                                                        <tr key={e.id}>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            {e.name}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {new Date(e.createdAt).toLocaleDateString()}
                                                                </p>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b whitespace-nowrap space-x-2 border-gray-200">
                                                                <button
                                                                    className=" text-sm text-orange-500 rounded-xl whitespace-no-wrap"
                                                                    onClick={() => {
                                                                        setIsEditModalOpen(true)
                                                                        setDataEdit(e)
                                                                    }
                                                                    }>
                                                                    <FaRegEdit size={18} />
                                                                </button>
                                                                <button className=" text-sm text-red-500 rounded-xl whitespace-no-wrap" onClick={() => {
                                                                    setIsDeleteModalOpen(true)
                                                                    setDataEdit(e)
                                                                }}>
                                                                    <FaTrash size={18} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <tr>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse">
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Kategori