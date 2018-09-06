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

        socket.on('disconnect', function(){
            console.log('user left :(')
        })

        socket.on('join-room', data => {
            socket.join(data.room)
            socket.emit('new-player', {
                message: 'new player!'
            })
            socket.in(data.room).broadcast.emit('get-me-players')
        
        })

        socket.on('here-are-players', data =>{
            console.log(data, 'the players')
            io.emit('add-players', {data})
        })

        socket.on('add-user', data =>{
            console.log(data.userName)
            io.in(data.room).emit('user-added', {
                user : data.userName
            })
        })

        socket.on('ready-player', data => {
            console.log(data)
            io.in(data.room).emit('ready-player-added', data.players)
        })

        socket.on('receive-ready-players', data => {
            socket.in(data.room).broadcast.emit('readied-players')
        })

        socket.on('readyPlayers-array', data => {
            socket.in(data.room).broadcast.emit('here-are-readyPlayers', data.players)
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

