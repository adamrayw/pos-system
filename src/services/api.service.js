const api = 'http://localhost:8181/api/'
import axios from "axios"
import { useEffect, useState } from "react"

export const useApiRequest = url => {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(api + url)
                .then(response => {
                    setIsLoaded(true)
                    setData(response.data)
                })
                .catch(error => {
                    setError(error)
                })
        }
        fetchData()
    }, [url])

    return { error, isLoaded, data }
}

export const useApiPost = async (url, data) => {
    try {
        const response = await axios.post(api + url, data)
        return response
    } catch (err) {
        return err
    }

}

export const useApiEdit = async (url, data) => {
    try {
        const response = await axios.put(api + url, data)
        return response
    } catch (err) {
        return err
    }

}

export const useApiDelete = async (url, data) => {
    try {
        const response = await axios.delete(api + url, { data: { id: data } })
        return response
    } catch (err) {
        return err
    }

}