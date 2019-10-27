const HTTP = require('http');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;

const server = HTTP.createServer((req, res) => {
    //Build File Path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    console.log(filePath); 

    //get extension
    let extname = path.extname(filePath);

    //set initial content type
    let contenttype = 'text/html';
    //Swtch content types;
    switch(extname) {
        case '.js':
            contenttype = 'text/javascript';
            break;
        case '.css':
            contenttype = 'text/css';
            break;
        case '.json':
            contenttype = 'application/json';
            break;
        case '.png':
            contenttype = 'image/png';
            break;
        case '.jpg':
            contenttype = 'image/jpg';
            break;
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code == 'ENOENT') {
                //Page Not Found
                fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data, 'utf8');
                });
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            //Success
            res.writeHead(200, {'Content-Type': contenttype});
            res.end(data);
        }
         
    });
});

server.listen(PORT, () => console.log("Server listening on port " + PORT));
