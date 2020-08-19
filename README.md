# Node Farm
 A small demo using Node.js, HTML, and CSS

 1. Products details are read from a JSON file (/dev-data/data.json).
 2. Product overview page is generated dynamically together using template-overview.html, template-card.html, and the JSON file. Both templates contain placeholder strings such as
    {%PRODUCT_CARDS%} or {%PRODUCT_NAME%}. We then use regular expression to find and replace all these placeholders and combine them together into html string.
 3. Product detail page is generated using similar method. We first created the '/product' route, then using the URL module to extract the query string ('id'), then 
    generate the product detail page using similar method in #2.
