import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    // to check if data is fetched or not
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // setTimeout for more realistic API fetching
        setTimeout(() => {
            fetch(url)
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
                    setError(err.message);
                    setIsPending(false);
                });
        }, 1000);
    }, [url]);

    return {
        data,
        isPending,
        error,
    };
};

export default useFetch;
