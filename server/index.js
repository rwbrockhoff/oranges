const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
require('dotenv').config()

const app = express()

const controller = require('./controller')

const port = process.env.SERVER_PORT

/////MIDDLEWARE//////

app.use(bodyParser.json())

app.use(session({
    secret: 'tiddlywinks',
    saveUninitialized: true,
    resave: false
}))

////END MIDDLEWARE////


// massive(process.env.CONNECTION_STRING).then(db=>{
//     app.set('db',db)
    
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
// })


////ENDPOINTS/////

//Receives a number on the body and returns an array of that number of 'answer' cards {id, name, description}
app.post('/api/getacard', controller.getACard)

//Returns and array with one 'question' card {id, name, description}
app.get('/api/getqcard', controller.getQCard)

//Receives username and returns an array with 1 object {id, username} - id is the session ID
app.post('/api/newplayer', controller.newPlayer)

app.delete('/api/deleteplayer/:id', controller.deletePlayer)

