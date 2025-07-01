import './index.css'
import { BookList } from './components/BookList'
import { Route, Routes } from 'react-router-dom'
import { AddBook } from './components/AddBook'

function App() {

  return (
    <Routes>
      <Route path='/' element={<BookList></BookList>}></Route>
      <Route path='/books' element={<BookList></BookList>}></Route>
      <Route path='/addBook' element={<AddBook></AddBook>}></Route>
    </Routes>
  )
}

export default App
