/**
 * This file contains the main logic for the Node Farm.
 */

const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

// Top-level code: Execute only once (So synchronious code is okay)

// 1. Read JSON Data File
const getProductJSONPath = process.cwd() + '/dev-data/data.json';
const productsJSONObj = fs.readFileSync(getProductJSONPath, 'utf-8', (err, data) => {
  if (err) return console.log('ERROR! 💢💢💢 Product JSON file not found!');
});
const productDataObject = JSON.parse(productsJSONObj);

// 2. Read static templates
const getTemplateOverviewPath = `${__dirname}/template-overview.html`;
const templateOverview = fs.readFileSync(getTemplateOverviewPath, 'utf-8', (err, data) => {
  if (err) return console.log('ERROR! 💢💢💢 template-overview.html file not found!');
});

const getTemplateProdPath = `${__dirname}/template-product.html`;
const templateProduct = fs.readFileSync(getTemplateProdPath, 'utf-8', (err, data) => {
  if (err) return console.log('ERROR! 💢💢💢 template-product.html JSON file not found!');
});

const getTemplateCardPath = `${__dirname}/template-card.html`;
const templateCard = fs.readFileSync(getTemplateCardPath, 'utf-8', (err, data) => {
  if (err) return console.log('ERROR! 💢💢💢 template-card.html JSON file not found!');
});

// 3. replaceTemplate function
const replaceTemplate = (template, product) => {
  // Use regular expression to replace ALL instances of {%PRODUCT_NAME%} (global /g) with product.productName
  let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT_FROM%}/g, product.from);
  output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
  output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
  output = output.replace(/{%PRODUCT_ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }

  return output;
};

// Create slugs for slugify module to replace product ID
const slugs = productDataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// END TOP-LEVEL CODE

// SERVER SETUP
const server = http.createServer((req, res) => {
  // console.log(req.url);                              // Returns everything after the hostname:port
  // console.log(url.parse(req.url, true));             // Parse the query string into an object
  const { query, pathname } = url.parse(req.url, true); // Extracts the value of 'query' and 'pathname' and turn them into variables

  // Routing conditions - START

  // 1. Overview Page Route
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    // The last join will make turn the array into a string.
    const cardsHTML = productDataObject.map((element) => replaceTemplate(templateCard, element)).join('');

    // Replace templateOverview placeholder {%PRODUCT_CARDS%} with cardsHTML
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

    res.end(output);
  } else if (pathname === '/product') {
    // 2. Product Page Route
    res.writeHead(200, { 'Content-type': 'text/html' });
    const productByID = productDataObject[query.id]; // Extracts the JSON by query.ID
    const output = replaceTemplate(templateProduct, productByID); // Replace the templateProduct card using the JSON object;

    res.end(output);
  } else if (pathname === '/api') {
    // 3. API Route
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    // 4. 404 Not Found Route
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found!</h1>');
  }

  // Routing conditions - END
});

// LISTENER SETUP
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000.');
});
