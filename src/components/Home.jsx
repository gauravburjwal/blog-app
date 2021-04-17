import BlogList from './BlogList';
import useFetch from './../hooks/useFetch';

const Home = () => {
    const { data: blogs, isPending, error } = useFetch(
        process.env.REACT_APP_BLOGS_URL
    );

    return (
        <div className='home'>
            {error && <div>ERROR: {error}</div>}
            {isPending && <div>Loading...</div>}
            {/* conditional rendering ... */}
            {blogs && <BlogList blogs={blogs} title='All Blogs' />}
        </div>
    );
};

export default Home;
