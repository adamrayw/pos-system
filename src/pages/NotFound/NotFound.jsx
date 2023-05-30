import { Link } from "react-router-dom"
import NotFoundImage from "../../assets/notfound.svg"

function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-full p-4">
            <div className="bg-white text-center p-10 rounded-lg space-y-2">
                <img src={NotFoundImage} className='w-40 h-40 mx-auto' />
                <h1 className="text-xl font-bold">Halaman yang anda cari tidak ditemukan</h1>
                <p className="text-gray-500 text-sm">
                    Kembali ke <Link to="/" className="underline ">Home</Link>
                </p>
            </div>
        </div>
    )
}

export default NotFound