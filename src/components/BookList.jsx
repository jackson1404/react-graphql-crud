import { useQuery, gql } from '@apollo/client'

const GET_BOOKS = gql`
    query GetAllBooks{
       findAllBooks {
            bookId
            title
            author                     
       } 
    }`;


function BookList() {

    const { loading, error, data } = useQuery(GET_BOOKS);
    if (loading) return <p>Loading</p>
    if (error) return <p>Error : {error.message}</p>

    return (
        <div>
            <h5>BookList</h5>
            <ul>
                {data.findAllBooks.map((book) => (
                    <li key={book.book}>
                        <h3>{book.title} by {book.author}</h3> 
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default BookList