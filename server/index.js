const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const socket = require('socket.io')
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


massive(process.env.CONNECTION_STRING).then(db=>{
    app.set('db',db)
    const io = socket(
        app.listen(port, ()=>{
            console.log(`listening on port ${port}`)
        })
    )
    /////SOCKETS///////
    
    io.on('connection', socket => {
        console.log('user joined!')

        socket.on('join-room', data => {
            socket.join(data.room)
            io.to(data.room).emit('new-player', {
                message: 'new player!'
            })
        })
    })

})

/////////////


////ENDPOINTS/////

//Receives a number on the body and returns an array of that number of 'answer' cards {id, name, description}
app.post('/api/getacard', controller.getACard)

//Returns and array with one 'question' card {id, name, description}
app.get('/api/getqcard', controller.getQCard)

//Receives username and returns an array with 1 object {id, username} - id is the session ID
app.post('/api/newplayer', controller.newPlayer)

//Needs a real comment
app.delete('/api/deleteplayer/:id', controller.deletePlayer)

