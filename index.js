const http = require('http');
const fs = require(`fs`);
const util = require(`util`);
const readFile = util.promisify(fs.readFile);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            console.log(body);
            res.end('ok');
        });
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const html = await readFile(`web/index.html`, `utf8`);
    res.end(html);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});