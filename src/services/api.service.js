// const api = 'http://localhost:3001/api/'
const api = 'https://pos-backend.up.railway.app/api/'
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const showErrorToast = () => {
    toast.error('Ada masalah pada server!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
};

export const useApiRequest = async (url) => {
    try {
        const response = await axios.get(api + url, config)
        return { response, err: null }
    } catch (err) {
        showErrorToast()
        return { response: null, err }
    }

}

export const useApiPost = async (url, data) => {
    try {
        const response = await axios.post(api + url, data, config)
        return { response, err: null }
    } catch (err) {
        showErrorToast()
        return { response: null, err }
    }

}

export const useApiEdit = async (url, data) => {
    try {
        const response = await axios.put(api + url, data, config)
        return { response, err: null }
    } catch (err) {
        showErrorToast()
        return { response: null, err }
    }

}

export const useApiDelete = async (url, data) => {
    try {
        const response = await axios.delete(api + url + "/" + data, config)
        return { response, err: null }
    } catch (err) {
        showErrorToast()
        return { response: null, err }
    }

}

export const useApiLogin = async (url, data) => {
    try {
        const response = await axios.post(api + url, data)
        return { response, err: false }
    } catch (error) {
        return { response: error.response, err: true }
    }
}