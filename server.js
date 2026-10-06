
const http = require('http')
const fs = require('fs')// file sysytem
const url = require('url');
const querystring = require('querystring');//info in the url
const figlet = require('figlet')// a package

const server = http.createServer(function (req, res) { //create a server and stores it in veriable server
    const page = url.parse(req.url).pathname;// this is the url path stores in page variable
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);

    if (page == '/') {// means if page = homepage run this function
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }




    else if (page == '/api') {
        if ('ego' in params) {
            if (params['ego'] == 'Gangsta' || params['ego'] == 'Killah') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                const objToJson = {
                    ego: params['ego'],
                    color: params['color'],
                    presence: params['presence'],
                    persona: params['persona'],
                    animal: params['animal'],
                }
                res.end(JSON.stringify(objToJson))
            }
        }
    }

    else if (page == '/css/style.css') {
        fs.readFile('css/style.css', function (err, data) {
            res.write(data);
            res.end();
        });
    } else if (page == '/main.js') {
        fs.readFile('main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    } else {
        figlet('404!!', function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            res.write(data);
            res.end();
        });
    }
});

server.listen(8000);
