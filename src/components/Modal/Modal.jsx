import { useEffect, useState } from 'react'
import { MdImage, MdOutlineCloudUpload } from 'react-icons/md'
import useApiPost from '../../services/api.service'
import { CgSpinner } from 'react-icons/cg'

function Modal(props) {
    const [file, setFile] = useState()
    const [isToggleModalOpen, setIsToggleModalOpen] = useState(true)
    const [price, setPrice] = useState()
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const data = new FormData()

        data.append('image', file)
        data.append('name', name)
        data.append('price', price)

        const response = await useApiPost("menu/add", data)

        console.log(response.data)
        setIsLoading(false)
        triggerToMenuComponent()

    }

    const handleChangeImg = (e) => {
        setFile(e.target.files[0])
    }

    const handlePrice = (e) => {
        const regex = /^[0-9]*$/
        const value = e.target.value;

        if (regex.test(value)) {
            setPrice(value);
        }
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const triggerToMenuComponent = () => {
        props.toggleModal(false)
    }

    return (
        <>
            <div className={`fixed flex justify-center items-center ${isToggleModalOpen ? 'block' : 'hidden'} bg-black bg-opacity-60 top-0 left-0 right-0 w-full z-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`} >
                <div className="relative w-full h-full max-w-md md:h-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal" onClick={triggerToMenuComponent}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div>
                                    <div className="flex flex-col items-center justify-start">
                                        <img src={file ? URL.createObjectURL(file) : ''} alt="img-preview" className={`w-24 h-24 ${file ? "block" : "hidden"} bg-gray-100 rounded-full mb-6 p-2`} />
                                        <div className={`w-20 h-20 ${file ? "hidden" : "block"} flex justify-center items-center rounded-full mb-6 bg-gray-100`}>
                                            <MdImage className='text-gray-500 text-2xl' />
                                        </div>
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-start rounded-lg cursor-pointer bg-orange-500 hover:bg-orange-600">
                                            <div className="flex flex-col items-center justify-center py-2 px-3">
                                                <p className="text-xs text-white">
                                                    <span className="font-semibold flex items-center ">
                                                        <MdOutlineCloudUpload className='mr-2 text-lg' /> Pilih Gambar
                                                    </span>
                                                </p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" onChange={handleChangeImg} />
                                        </label>
                                    </div>

                                </div>
                                <div>
                                    <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama Menu</label>
                                    <input type="nama" name="nama" id="nama" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" placeholder="Soto" required onChange={handleName} />
                                </div>
                                <div>
                                    <label htmlFor="harga" className="block mb-2 text-sm font-medium text-gray-900">Harga</label>
                                    <input type="text" name="harga" id="harga" placeholder="10000" className='bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5' required onChange={handlePrice} value={price} />
                                    <small className="text-xs text-gray-400">contoh: 10000 = Rp 10.000</small>
                                </div>
                                {isLoading ?
                                    <button disabled className="w-full flex justify-center items-center text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 font-medium rounded-lg text-sm transition px-5 py-2.5 text-center hover:cursor-not-allowed">
                                        <CgSpinner className='animate-spin text-xl' />
                                    </button>
                                    :
                                    <button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 font-medium rounded-lg text-sm transition px-5 py-2.5 text-center">Tambah</button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal