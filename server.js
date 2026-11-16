

const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const figlet = require('figlet')

// CREATE SERVER
const server = http.createServer(function (req, res) {

    // Get the URL path
    const page = url.parse(req.url).pathname

    // Get information from the URL
    const params = querystring.parse(url.parse(req.url).query)

    console.log(page)

    // HOME PAGE
    if (page == '/') {

        fs.readFile('index.html', function (err, data) {

            if (err) {
                res.writeHead(404)
                res.end('HTML file not found')
                return
            }

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(data)
        })

    }

    // NAME GENERATOR API
    else if (page == '/api') {

        if ('ego' in params) {

            if (params['ego'] == 'Gangsta' || params['ego'] == 'Killah') {

                const objToJson = {
                    ego: params['ego'],
                    color: params['color'],
                    presence: params['presence'],
                    persona: params['persona'],
                    animal: params['animal']
                }

                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(objToJson))
                return
            }
        }

        // Handle missing or invalid selections
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            message: 'Please select a valid alter ego'
        }))

    }

    // CSS FILE
    else if (page == '/css/style.css' || page == '/style.css') {

        fs.readFile('css/style.css', function (err, data) {

            if (err) {
                res.writeHead(404)
                res.end('CSS file not found')
                return
            }

            res.writeHead(200, { 'Content-Type': 'text/css' })
            res.end(data)
        })

    }

    // BACKGROUND / PAGE IMAGE
    else if (page == '/WuTang2025_1248x680-9d02059e97.jpg.webp') {

        fs.readFile('WuTang2025_1248x680-9d02059e97.jpg.webp', function (err, data) {

            if (err) {
                res.writeHead(404)
                res.end('Image not found')
                return
            }

            res.writeHead(200, { 'Content-Type': 'image/webp' })
            res.end(data)
        })

    }

    // JAVASCRIPT FILE
    else if (page == '/main.js') {

        fs.readFile('main.js', function (err, data) {

            if (err) {
                res.writeHead(404)
                res.end('JavaScript file not found')
                return
            }

            res.writeHead(200, { 'Content-Type': 'text/javascript' })
            res.end(data)
        })

    }

    // 404 PAGE
    else {

        figlet('404!!', function (err, data) {

            if (err) {
                console.log('Something went wrong...')
                res.writeHead(500)
                res.end('Server error')
                return
            }

            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end(data)
        })

    }
})

// START SERVER
const PORT = process.env.PORT || 8000

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Wu-Tang Name Generator running on port ${PORT}`)
})
