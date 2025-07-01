import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $pages: Int!, $isbn: String!) {
    addBook(title: $title, author: $author, pages: $pages, isbn: $isbn) {
      bookId
      title
    }
  }
`;

export function AddBook() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        pages: '',
        isbn: ''
    });

    const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
        refetchQueries: ['GetBooks'], // Refetch book list after adding
        onCompleted: () => {
            navigate('/books'); // Redirect to book list after successful addition
        }
        
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBook({ variables: formData });
            setFormData({ title: '', author: '', pages: 0, isbn: '' });
        } catch (err) {
            console.error('Error adding book:', err);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Author</label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Pages</label>
                    <input
                        type="number"
                        value={formData.pages}
                        placeholder='0'
                        onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) || 0 })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">ISBN</label>
                    <input
                        type="text"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </button>

                {error && (
                    <div className="p-2 text-red-600 bg-red-50 rounded">
                        Error: {error.message}
                    </div>
                )}
            </form>
        </div>
    );
}