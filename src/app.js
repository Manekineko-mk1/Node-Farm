/**
 * This file contains the main logic for the Node Farm.
 */

const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

// Top-level code: Execute only once

// Read JSON Data File
const getFilePath = process.cwd() + '/dev-data/data.json';
const data = fs.readFileSync(getFilePath, 'utf-8', (err, data) => {
    if(err) return console.log('ERROR! 💢💢💢 Product JSON file not found!');  
});
const productDataObject = JSON.parse(data);

// END TOP-LEVEL CODE

// SERVER SETUP
const server = http.createServer((req, res) => {
    const pathName = req.url;
    
    // Routing conditions
    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW page!');
    }
    else if (pathName === '/product') {
        res.end('This is the PRODUCT page!');
    }
    else if (pathName === '/api') {  
        // Note: You can only send back String data, not object
        // Note: so only 'data' and not 'productData'.
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);                            
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>'); 
    }
});

// LISTENER SETUP
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000.');
});