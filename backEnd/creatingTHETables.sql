USE bookstore;

CREATE TABLE users (userid INT , username VARCHAR(255), password VARCHAR(255), fname VARCHAR(255),lname VARCHAR(255), email VARCHAR(255));


CREATE TABLE books (title VARCHAR(255), author VARCHAR(255), description VARCHAR(255), rating INT , comments VARCHAR(255));

SELECT * FROM books;
SELECT * FROM users;