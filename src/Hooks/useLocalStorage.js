import { useState, useEffect } from 'react';


function getDataFromStorage(key, initialValue) {
    const data = localStorage.getItem(key)

    if (data) return JSON.parse(data)

    if (initialValue instanceof Function) return initialValue()
    return initialValue
}

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => { return getDataFromStorage(key, initialValue) })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))

    }, [key, value])
    return [value, setValue]
}