let express = require('express')
let app = express()

let mysql = require('mysql')
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//DataBase Connection
let dbConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "password",
    database: "bookstore"
})
//GET Requests
app.get('/', function(req,res){
    res.send("Hello World")
    })
    
app.get('/users',function(req,res){
    dbConn.query("SELECT * FROM USERS", function(error, results , fields){
        if(error) throw error
        return res.send({error : false , data: results , message: "User's list"})
    })
})

app.get('/users/:userid',function( req ,res){
    let userid = req.params.userid
    if(!userid){
        return res.status(400).send({error: true , message: "Provide a valid user ID"})
    }
    dbConn.query("SELECT * FROM users where userid = ?" , userid , function(error , results , fields){
        if (error) throw error
        return res.send({error: false , data : results[0] , message : "User fond"})
    })
} )


//POST Requests
app.post('/addUser', async function(req ,res){
let userid = req.body.userid
let username = req.body.username
let password = req.body.password
let fname = req.body.fname
let lname = req.body.lname
let email = req.body.email
if(!username) {
    return res.status(400).send({error: true ,message : "Provide a username"})
}
await dbConn.query("INSERT INTO users SET ?" , {userid:userid ,username:username ,password:password ,fname:fname,lname:lname,email:email }
, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
})
})


//PUT Requests
app.put('/updateUser', function(req ,res){
let userid = req.body.userid
let username = req.body.username
let password = req.body.password
let fname = req.body.fname
let lname = req.body.lname
let email = req.body.email

if(!userid){
    return res.status(400).send({error: userid , message: "please provide a user id"})
}
dbConn.query("UPDATE users SET username = ? , password = ?,fname = ? , lname = ? ,email = ? where userid = ?",
 [username, password ,fname , lname , email ,userid] , function(error , results ,fields){
    if (error) throw error
   return res.send({error: false , data: results , message : "the user wasupdated successfully"}) 
 }) 

})


//DELETE Requests
app.delete('/deleteUser/:userid', function(req,res){
    let userid = req.params.userid
    if(!userid){
        return res.status(400).send({ error:true , message: "provide a valid user id"})
    }
    dbConn.query("DELETE FROM users where userid = ?", [userid] , function(error,results ,fields){
        if(error) throw error
        return res.send({error: false , data: results , message: "user deleted sucessfully"})
    })


})

app.listen(3000)