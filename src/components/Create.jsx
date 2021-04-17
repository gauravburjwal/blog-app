import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {
            author,
            body,
            title,
        };

        setIsPending(true);

        fetch(process.env.REACT_APP_BLOGS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog),
        })
            .then(() => {
                console.log('new blog added');
                setIsPending(false);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='create'>
            <h2>Create a new Blog...</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input
                    type='text'
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <label>Body: </label>
                <textarea
                    required
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                ></textarea>

                <label>Author: </label>
                <select
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                >
                    <option value='mario'>mario</option>
                    <option value='yoshi'>yoshi</option>
                </select>
                {!isPending && <button>Submit</button>}
                {isPending && (
                    <button disabled='disabled'>Adding blog...</button>
                )}
            </form>
        </div>
    );
};

export default Create;
