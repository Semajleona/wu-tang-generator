
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const querystring = require('querystring')
const figlet = require('figlet')

// HELPER FUNCTION TO SERVE FILES
function serveFile(res, filePath, contentType) {

    fs.readFile(filePath, function (err, data) {

        if (err) {
            console.log('File not found:', filePath)

            res.writeHead(404, {
                'Content-Type': 'text/plain'
            })

            res.end('File not found')
            return
        }

        res.writeHead(200, {
            'Content-Type': contentType
        })

        res.end(data)
    })
}

// CREATE SERVER
const server = http.createServer(function (req, res) {

    // Get the URL path
    const page = url.parse(req.url).pathname

    // Get information from the URL
    const params = querystring.parse(url.parse(req.url).query)

    console.log(page)

    // HOME PAGE
    if (page == '/') {

        serveFile(
            res,
            path.join(__dirname, 'index.html'),
            'text/html'
        )

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

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })

                res.end(JSON.stringify(objToJson))
                return
            }
        }

        res.writeHead(400, {
            'Content-Type': 'application/json'
        })

        res.end(JSON.stringify({
            message: 'Please select a valid alter ego'
        }))

    }

    // CSS FILE
    else if (page == '/style.css' || page == '/css/style.css') {

        // First check the main project folder
        const mainCSS = path.join(__dirname, 'style.css')

        // Also check the css folder
        const folderCSS = path.join(__dirname, 'css', 'style.css')

        fs.access(mainCSS, fs.constants.F_OK, function (err) {

            if (!err) {

                serveFile(res, mainCSS, 'text/css')

            } else {

                serveFile(res, folderCSS, 'text/css')

            }
        })

    }

    // WU-TANG IMAGE
    else if (page == '/WuTang2025_1248x680-9d02059e97.jpg.webp') {

        serveFile(
            res,
            path.join(__dirname, 'WuTang2025_1248x680-9d02059e97.jpg.webp'),
            'image/webp'
        )

    }

    // JAVASCRIPT FILE
    else if (page == '/main.js') {

        serveFile(
            res,
            path.join(__dirname, 'main.js'),
            'text/javascript'
        )

    }

    // 404 PAGE
    else {

        figlet('404!!', function (err, data) {

            if (err) {
                console.log('Something went wrong...')

                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })

                res.end('Server error')
                return
            }

            res.writeHead(404, {
                'Content-Type': 'text/plain'
            })

            res.end(data)
        })

    }
})

// START SERVER
const PORT = process.env.PORT || 8000

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Wu-Tang Name Generator running on port ${PORT}`)
})

