import { useState, useEffect } from "react"
import Modal from "../../components/Modal/Modal"
import { useApiRequest } from "../../services/api.service"
import { FaRegEdit, FaTrash } from 'react-icons/fa'

function Menu() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [dataEdit, setDataEdit] = useState([])
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)


    const triggerFromModal = (data) => {
        setIsModalOpen(data)
        setIsEditModalOpen(data)
        setIsDeleteModalOpen(data)
    }

    useEffect(() => {
        const fetchMenu = async () => {
            setIsLoaded(false)
            const { response, err } = await useApiRequest("menu")

            setData(response.data)
            setIsLoaded(true)
        }

        fetchMenu()
    }, [isEditModalOpen, isDeleteModalOpen])

    return (
        <div>
            {isModalOpen ? (
                <Modal toggleModal={triggerFromModal} isEdit={false} />
            ) : null}

            {isEditModalOpen ?
                <Modal dataMenu={dataEdit} isEdit={true} toggleModal={triggerFromModal} />
                :
                null
            }

            {isDeleteModalOpen ?
                <Modal dataMenu={dataEdit} isDelete={true} toggleModal={triggerFromModal} />
                :
                null
            }

            <h1 className="text-4xl font-semibold">
                Manage Menu
            </h1>
            <button className="py-2 bg-orange-500 text-white px-4 mt-4 rounded-lg shadow-sm font-semibold hover:bg-orange-600 active:bg-orange-700 transition text-sm"
                onClick={() => setIsModalOpen(true)}
            >Tambah Menu</button>
            <div className="container w-full mx-auto">
                <div>
                    <div className="py-4 overflow-x-auto">
                        <div className="inline-block w-full overflow-hidden rounded-lg shadow">
                            <table className="w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Item
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Created at
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            status
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200">

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
                                                                    <div className="flex-shrink-0">
                                                                        <a href="#" className="relative block">
                                                                            <img alt="profil" src={e.image} priority="true" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                                        </a>
                                                                    </div>
                                                                    <div className="ml-3">
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
                                                            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                                                    </span>
                                                                    <span className="relative">
                                                                        active
                                                                    </span>
                                                                </span>
                                                            </td>
                                                            <td className="px-5 py-5 text-sm bg-white border-b space-x-2 border-gray-200">
                                                                <button
                                                                    className=" text-sm text-orange-500 rounded-xl whitespace-no-wrap"
                                                                    onClick={() => {
                                                                        setIsEditModalOpen(true)
                                                                        setDataEdit(e)
                                                                    }
                                                                    }>
                                                                    <FaRegEdit />
                                                                </button>
                                                                <button className=" text-sm text-red-500 rounded-xl whitespace-no-wrap" onClick={() => {
                                                                    setIsDeleteModalOpen(true)
                                                                    setDataEdit(e)
                                                                }}>
                                                                    <FaTrash />
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

        </div >
    )
}

export default Menu