const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
require('dotenv').config()

const app = express()

const port = process.env.SERVER_PORT


// massive(process.env.CONNECTION_STRING).then(db=>{
//     app.set('db',db)
    
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
// })

