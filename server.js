require('dotenv').config()

const express = require('express') // web server framework
const app = express() // create the web server
const fs = require('fs') // filesystem library

app.get('/time', (req,res) => { // execute code after receiving a get request to /time
    if ( !fs.existsSync('./time') ) { // if the time file doesn't exist, create it
        fs.writeFileSync(
            './time',
            Date.now(), // get the current date
            { encoding: 'utf8' } // encode in utf8
        )
    }

    res.send(
        fs.readFileSync( // get the value of time time file
            './time',
            { encoding: 'utf8' }
        )
    )

    // NOTE: the time file doesn't have an extension
})

app.get('/reset', (req,res) => {
    fs.writeFileSync(
        './time',
        Date.now(), // get the current date
        { encoding: 'utf8' } // encode in utf8
    )

    res.send('')
})

app.get('/set/:time', (req,res) => {
    fs.writeFileSync(
        './time',
        req.params.time * 1000, // get the current date
        { encoding: 'utf8' } // encode in utf8
    )

    res.redirect('/')
})

app.use(express.static(__dirname)) // serve all files in the current folder so we can access index.html
app.listen(process.env.PORT) // start server on port 80

console.log('Server started on port 80.')
