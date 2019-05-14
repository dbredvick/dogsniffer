const http = require('http');
const scraper = require('./scrapers/apa');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    const results = await scraper.getAPADogs();
    res.end(JSON.stringify(results));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});