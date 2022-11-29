import { useEffect, useState, useRef } from 'react';
import { useUserState } from 'context/UserContext';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { customFetch } = useUserState()
    const abortCont = useRef(new AbortController())

    const fetchData = () => {
        customFetch(url, { signal: abortCont.current.signal })
            .then(res => {
                if (res.status !== 200 && res.status !== 304) {
                    throw Error('could not fetch data')
                }
                return res.json()
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            });
    }

    useEffect(() => {
        if (!url) return
        // const abortCont.current = new AbortController();
        fetchData()
        return () => abortCont.current.abort();
    }, [url]);

    return [data, isLoading, error, fetchData]
}

export default useFetch;