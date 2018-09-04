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

////END MIDDLEWARE////


massive(process.env.CONNECTION_STRING).then(db=>{
    app.set('db',db)
    
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
})


////ENDPOINTS/////

//Receives a number on the body and returns that number of 'answer' cards
app.post('/api/getacard', controller.getACard)

//Returns one 'question' card
app.get('/api/getqcard', controller.getQCard)

