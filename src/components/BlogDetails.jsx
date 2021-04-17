import { useParams, useHistory } from 'react-router-dom';
import useFetch from './../hooks/useFetch';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch(
        `${process.env.REACT_APP_BLOGS_URL}${id}`
    );
    const history = useHistory();

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_BLOGS_URL}${id}`, {
            method: 'DELETE',
        }).then(() => {
            history.push('/');
        });
    };

    return (
        <div className='blog-details'>
            {isPending && <div>Loading...</div>}
            {error && <div>ERROR: {error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by: {blog.author}</p>
                    <div>{blog.body} </div>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
