import { useEffect, useState } from 'react'
import { MdImage, MdOutlineCloudUpload } from 'react-icons/md'
import { RiErrorWarningFill } from 'react-icons/ri'
import { useApiDelete, useApiEdit, useApiPost } from '../../services/api.service'
import { CgSpinner } from 'react-icons/cg'

function ModalKategori(props) {
    const [file, setFile] = useState()
    const [isToggleModalOpen, setIsToggleModalOpen] = useState(true)
    const [price, setPrice] = useState()
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [imageEdited, setImageEdited] = useState(false)
    const [isEdit, setIsEdit] = useState(true)

    const userId = JSON.parse(localStorage.getItem('user')).id

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        if (props.isEdit) {
            await useApiEdit("kategori/edit", { id: props.dataMenu.id, name: name })
        } else if (props.isDelete) {
            await useApiDelete("kategori/remove", props.dataMenu.id)
        } else {
            const { response, err } = await useApiPost("kategori/add", { name, userId })
            console.log(response, err)
        }

        setIsLoading(false)
        triggerToMenuComponent()

    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const triggerToMenuComponent = () => {
        props.toggleModal(false)
    }

    useState(() => {
        setName(props.dataMenu ? props.dataMenu.name : '')
        setIsEdit(props.isEdit ? props.isEdit : null)
    }, [])

    return (
        <>
            <div className={`fixed flex justify-center items-center ${isToggleModalOpen ? 'block' : 'hidden'} bg-black bg-opacity-60 top-0 left-0 right-0 w-full z-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`} >
                <div className="relative w-full h-full max-w-md md:h-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal" onClick={triggerToMenuComponent}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        {props.isDelete ?
                            <div className="px-6 py-6 lg:px-8 flex flex-col justify-center items-center">
                                <RiErrorWarningFill className='text-7xl text-yellow-300 mb-4' />
                                <h1 className='font-bold text-gray-600 text-lg'>Yakin ingin menghapus kategori ini?</h1>
                                <p className='text-sm text-gray-400 text-center'>kategori akan dihapus secara permanen, harap edit kategori menu yang berkategorikan <span className='font-bold'>{props.dataMenu.name}</span></p>
                                <div className='flex items-center space-x-4 mt-6'>
                                    <form onSubmit={handleSubmit}>
                                        {isLoading ?
                                            <button type='submit' className='px-4 py-2 text-sm text-white font-semibold border-2 border-red-500 bg-red-500 rounded-lg hover:bg-red-600 active:bg-red-700 transition'>
                                                <CgSpinner className='animate-spin text-xl' />
                                            </button>
                                            :
                                            <button type='submit' className='px-4 py-2 text-sm text-white font-semibold border-2 border-red-500 bg-red-500 rounded-lg hover:bg-red-600 active:bg-red-700 transition'>Ya, yakin</button>
                                        }
                                    </form>
                                    <button className='px-4 py-2 text-sm font-semibold border-2 rounded-lg hover:border-gray-300 active:border-gray-500 transition' onClick={triggerToMenuComponent}>Batal</button>
                                </div>
                            </div>
                            :
                            <div className="px-6 py-6 lg:px-8">
                                <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div>
                                        <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900">Nama Kategori</label>
                                        <input type="nama" name="name" id="nama" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Minuman, Drinks, Makanan" required onChange={handleName} value={name} />
                                    </div>
                                    {isLoading ?
                                        <button disabled className="w-full flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-500 font-medium rounded-lg text-sm transition px-5 py-2.5 text-center hover:cursor-not-allowed">
                                            <CgSpinner className='animate-spin text-xl' />
                                        </button>
                                        :
                                        <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-500 font-medium rounded-lg text-sm transition px-5 py-2.5 text-center">{props.isEdit ? "Edit" : "Tambah"}</button>
                                    }
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalKategori