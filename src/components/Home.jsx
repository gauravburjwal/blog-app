import { useEffect, useState } from 'react';
import BlogList from './BlogList';

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then((res) => {
                    return res.json();
                })
                .then((result) => {
                    setBlogs(result);
                    setIsPending(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 1000);
    }, []);

    return (
        <div className='home'>
            {isPending && <div>Loading...</div>}
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
