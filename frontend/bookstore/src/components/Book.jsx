import React from 'react';

const Book = ({ books }) => {
    return (
        <div className='BooksCards'>
            {
                books.map((book) => (
                    <div key={book.id}>
                        <div class="book">
                            <p>{book.title} <br />
                                {book.pubDate}<br />
                                {book.author}
                            </p>
                            <div class="cover">
                                <img src={book.cover} className='BookCover' />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Book;
