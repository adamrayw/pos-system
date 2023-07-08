// import Kasir from '../../../../assets/mockuuups2.png'
import Kasir from '../../../../assets/new.png'
// import Kasir from '../../../../assets/kasir.jpg'

function Hero() {
    return (
        <div className="hero-overlay min-h-screen my-10 bg-white">
            <div className="hero-content flex-col-reverse lg:flex-row-reverse justify-between items-center mx-auto">
                <img src={Kasir} className="w-full lg:w-1/4 " />
                <div className='space-y-4 md:w-1/2 w-full'>
                    <div class="w-fit flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-6 lg:w-6" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clip-rule="evenodd" />
                        </svg>

                        <p class="text-xs lg:text-sm">
                            Aplikasi kami tanpa perangkat khusus!
                        </p>
                    </div>
                    <div className='space-y-4'>
                        <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-700">
                            Satu <span className="text-blue-500">Aplikasi POSKU</span> untuk
                            segala bisnis.
                        </h1>
                        <p className="text-xs lg:text-lg font-normal leading-relaxed mt-2 text-gray-500">
                            Aplikasi kasir online berbasis cloud yang dapat membawa potensi bisnis Anda ke level tertinggi.
                        </p>
                        <div>
                            <a href='#harga' className="btn bg-blue-500 hover:bg-blue-600 border-0 mt-4">Lihat harga</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero