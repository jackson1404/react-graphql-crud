import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GET_BOOKS = gql`
  query GetBooks {
    findAllBooks {
      bookId
      title
      author
      pages
    }
  }
`;

export function BookList() {

    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [searchTerm, setSearchTerm] = useState('');

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full" style={{ marginTop: '100px' }}>
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden p-4 space-y-4">
                        <div className="h-36 bg-gray-200 animate-pulse rounded-md"></div>
                        <div className="space-y-2">
                            <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                            <div className="h-3 bg-gray-200 animate-pulse rounded w-1/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full p-6 bg-red-50 rounded-lg border border-red-200 text-center">
                <h3 className="text-lg font-medium text-red-800">Failed to load books</h3>
                <p className="mt-2 text-red-600">{error.message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    // Filter books
    const filteredBooks = data?.findAllBooks?.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-start justify-center">
            <div className="w-full max-w-7xl">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mt-6">📚 Book Collection</h1>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => navigate('/addBook')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            ➕ Add Book
                        </button>
                    </div>

                    <form className="max-w-md mx-auto mt-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 111 8a7 7 0 0114 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="book-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 shadow"
                                placeholder="Search books by title or author..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-gray-600">{filteredBooks.length} books found</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks.map((book) => (
                        <div key={book.bookId} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                                <span className="text-5xl text-gray-300 font-bold">{book.title.charAt(0)}</span>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{book.title}</h3>
                                        <p className="text-gray-600 mt-1">by {book.author}</p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">{book.pages} pages</span>
                                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
