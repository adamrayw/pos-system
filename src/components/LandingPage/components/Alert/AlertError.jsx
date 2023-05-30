import { useEffect, useState } from "react"

function AlertError({ message }) {
    const [isInvoke, setIsInvoke] = useState(false)

    useEffect(() => {
        if (message.message) {
            setIsInvoke(true)
        }
    }, [message])

    return (
        <div className={`${message.status_text === "warning" ? "bg-orange-400" : "bg-red-400"} ${isInvoke ? "block" : "hidden"} py-3 px-4 text-white rounded-md flex justify-between items-center`}>
            <div className="flex items-center space-x-2">
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                >
                    <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span className="text-xs font-medium">{message.message}</span>
            </div>
            <button className="hover:text-gray-200 active:text-gray-300 transition" onClick={() => setIsInvoke(false)}>
                <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                    <path
                        fill="currentColor"
                        d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
                    />
                </svg>
            </button>
        </div>
    )
}

export default AlertError