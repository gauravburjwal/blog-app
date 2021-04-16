import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    // to check if data is fetched or not
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        // setTimeout for more realistic API fetching
        setTimeout(() => {
            fetch(url, { signal: abortController.signal })
                .then((res) => {
                    if (!res.ok) {
                        throw Error(
                            'not able to fetch data for the resource...'
                        );
                    }
                    return res.json();
                })
                .then((result) => {
                    // setting fetched result as data array
                    setData(result);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted...');
                    } else {
                        setError(err.message);
                        setIsPending(false);
                    }
                });
        }, 1000);

        return () => {
            abortController.abort();
        };
    }, [url]);

    return {
        data,
        isPending,
        error,
    };
};

export default useFetch;
