let express = require('express')
let app = express()
const axios = require('axios')
let mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//connection to the DB

//GET REQUESTS

app.get('/getBooks/:bookName', async function (req, res) {
    let bookName = req.params.bookName
    const response = await axios.get(`https://openlibrary.org/search.json?q=${bookName}`)
    try {
        const booksArry = []
        const coverPromises = response.data.docs.map(async (book) => {
            if (book.cover_i) {
                const coverResponse = await axios.get(`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`)
                return coverResponse.request.res.responseUrl
            }
            else{
                return null
            }
        })

        const coverUrls = await Promise.all(coverPromises)


        response.data.docs.forEach((book , index) => {
            const newBook = {
                title : book.title,
                pubDate : book.first_publish_year ,
                author : book.author_name ,
                cover : coverUrls[index]
            }
            booksArry.push(newBook)
        });
        res.send(booksArry)


    } catch (error) {
        console.log('An error has occured ' + error)
        res.status(500).json({ error: 'Inteernal Server Error' })
    }
});


app.listen(3000)