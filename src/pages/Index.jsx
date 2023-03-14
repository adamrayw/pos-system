import Menu from "../components/Menu/Menu"
import Sidebar from "../components/Sidebar/Sidebar"

function Index() {
    return (
        <div className="container mx-auto">
            <div className='leading-loose mb-6'>
                <h1 className='text-3xl font-bold'>Welcome, Azhar👋</h1>
                <p className='text-gray-400'>Discover what you need easily!</p>
            </div>
            <div className="flex space-x-6 mb-6">
                <button>
                    <div className="w-full px-8 py-3 bg-white hover:bg-gray-50 active:bg-gray-100 transition rounded-lg shadow-sm flex items-center space-x-2">
                        <img src="https://img.icons8.com/ios/28/null/cola--v1.png" />
                        <div className="text-sm font-medium text-gray-800 truncate">
                            Minuman
                        </div>
                    </div>
                </button>
                <button>
                    <div className="w-full px-8 py-3 bg-white hover:bg-gray-50 active:bg-gray-100 transition rounded-lg shadow-sm  flex items-center space-x-2">
                        <img src="https://img.icons8.com/ios/28/null/kawaii-noodle.png" />
                        <div className="text-sm font-medium text-gray-800 truncate">
                            Makanan
                        </div>
                    </div>
                </button>
            </div>
            <Menu />
        </div>
    )
}

export default Index