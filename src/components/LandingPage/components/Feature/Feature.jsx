import Manage from '../../../../assets/manage-report.svg'
import Payment from '../../../../assets/online-payment.svg'
import Report from '../../../../assets/report.svg'
// import Manage from '../../../../assets/manage.svg'
// import Payment from '../../../../assets/payment.svg'
// import Report from '../../../../assets/report.svg'

function Feature() {
    return (
        <div className="md:m-24" id='fitur'>
            <h1 className='text-4xl font-bold text-blue-500 text-center'>Apa yang kami tawarkan?</h1>
            <hr className='w-12 text-center mx-auto mt-4' />
            <div className="flex flex-col space-y-20 mt-10">
                <div className='w-full space-y-2 md:text-left text-center flex md:flex-row flex-col justify-between items-center'>
                    <img src={Manage} alt="icon" className='md:w-1/5 w-1/3 mb-6' />
                    <div className='md:w-1/2 mx-8 space-y-4'>
                        <h1 className='font-bold md:text-3xl text-lg text-gray-700'>Kelola Produk dan Penjualan dengan mudah</h1>
                        <p className='text-gray-500 md:text-lg text-sm font-normal leading-relaxed'>Sederhanakan sistem manajemen produk, kelola stok, catat transaksi, hingga buat struk online untuk pelanggan.</p>
                    </div>
                </div>
                <div className='w-full space-y-2 md:text-left text-center flex md:flex-row-reverse flex-col justify-between items-center'>
                    <img src={Payment} alt="icon" className='md:w-1/4 w-1/3 mb-6' />
                    <div className='md:w-1/2 mx-8 space-y-4'>
                        <h1 className='font-bold md:text-3xl text-lg text-gray-700'>Terima Semua Jenis Pembayaran</h1>
                        <p className='text-gray-500 md:text-lg text-sm font-normal leading-relaxed'>Toko Anda dapat menerima semua pembayaran digital modern, Mendukung <span className='text-blue-500 font-semibold'>QRIS, E-Wallet, Transfer Bank dan Debit</span></p>
                    </div>
                </div>
                <div className='w-full space-y-2 md:text-left text-center flex md:flex-row flex-col justify-between items-center'>
                    <img src={Report} alt="icon" className='md:w-1/4 w-1/3 mb-6' />
                    <div className='md:w-1/2 mx-8 space-y-4'>
                        <h1 className='font-bold md:text-3xl text-lg text-gray-700'>Laporan Penjualan Mudah Diakses</h1>
                        <p className='text-gray-500 md:text-lg text-sm font-normal leading-relaxed'>Begitu praktis untuk menggabungkan kondisi bisnis dengan laporan transaksi penjualan yang dapat diakses secara real-time dari mana saja.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature