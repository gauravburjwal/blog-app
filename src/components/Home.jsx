import { useEffect, useState } from 'react';
import BlogList from './BlogList';

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    // to check if data is fetched or not
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // setTimeout for more realistic API fetching
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then((res) => {
                    if (!res.ok) {
                        throw Error(
                            'not able to fetch data for the resource...'
                        );
                    }
                    return res.json();
                })
                .then((result) => {
                    // setting fetched result as blogs array
                    setBlogs(result);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err) => {
                    setError(err.message);
                    setIsPending(false);
                });
        }, 1000);
    }, []);

    return (
        <div className='home'>
            {error && <div>ERROR: {error}</div>}
            {isPending && <div>Loading...</div>}
            {/* conditional rendering ... */}
            {blogs && <BlogList blogs={blogs} title='All Blogs' />}
            {blogs && (
                <BlogList
                    blogs={blogs.filter((blog) => blog.author === 'mario')}
                    title="Mario's Blog"
                />
            )}
        </div>
    );
};

export default Home;
