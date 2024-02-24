import React, { useState } from 'react';
import './app.css';
import Book from './components/Book';
import { useEffect } from 'react';
import { BASE_URL } from '../global'
import axios from 'axios'

export function App() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState('');
  const [loading, setLoading] = useState(false); // State variable to track loading state

  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading to true when search is initiated
      const encodedBookName = bookName.replace(/ /g, '+');
      const response = await axios.get(`${BASE_URL}/getBooks/${encodeURIComponent(encodedBookName)}`);
      setBooks(response.data);
    } catch (error) {
      console.log("Error fetching books data", error);
      setBooks([]);
    } finally {
      setLoading(false); // Set loading to false after search operation completes
    }
  }

  return (
    <div>
      <input type="text" value={bookName} onChange={(event) => setBookName(event.target.value)} placeholder='Enter Book Name'></input>
      <button onClick={handleSearch}>Search</button>
      {loading ? ( // Render loader if loading is true
        <div class="loader">
          <div class="bookss">
            <div class="page"></div>
            <div class="page page2"></div>
          </div>
        </div>
      ) : (
        <Book books={books} />
      )}
    </div>
  );
}
