/**
 * This file contains the main logic for the Node Farm.
 */

const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

// Top-level code: Execute only once (So synchronious code is okay)

// 1. Read JSON Data File
const getProductJSONPath = process.cwd() + '/dev-data/data.json';
const data = fs.readFileSync(getProductJSONPath, 'utf-8', (err, data) => {
    if(err) return console.log('ERROR! 💢💢💢 Product JSON file not found!');  
});
const productDataObject = JSON.parse(data);

// 2. Read static templates
const getTemplateOverviewPath = `${__dirname}/template-overview.html`;
const templateOverview = fs.readFileSync(getTemplateOverviewPath, 'utf-8', (err, data) => {
    if(err) return console.log('ERROR! 💢💢💢 template-overview.html file not found!');  
});

const getTemplateProdPath = `${__dirname}/template-product.html`;
const templateProduct = fs.readFileSync(getTemplateProdPath, 'utf-8', (err, data) => {
    if(err) return console.log('ERROR! 💢💢💢 template-product.html JSON file not found!');  
});

const getTemplateCardPath = `${__dirname}/template-card.html`;
const templateCard = fs.readFileSync(getTemplateCardPath, 'utf-8', (err, data) => {
    if(err) return console.log('ERROR! 💢💢💢 template-card.html JSON file not found!');  
});

// END TOP-LEVEL CODE

// SERVER SETUP
const server = http.createServer((req, res) => {
    const pathName = req.url;
    
    // Routing conditions - START
    
    // 1. Overview Page Route
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(templateOverview);
    }
    else if (pathName === '/product') {
        // 2. Product Page Route
        res.end('This is the PRODUCT page!');
    }
    else if (pathName === '/api') {  
        // 3. API Route
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);                            
    }
    else {
        // 4. 404 Page Route
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>'); 
    }

    // Routing conditions - END
});

// LISTENER SETUP
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000.');
});