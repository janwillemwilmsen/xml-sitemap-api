const express = require('express')
const cors = require("cors");
const app = express()
const port = 3000
const Sitemapper = require('sitemapper');
const extractDomain = require("extract-domain");
const fs = require('fs');

const sitemap = new Sitemapper();

// http://localhost:3000/?xmlsitemap=https://www.toertocht.be/sitemap.xml

app.use(express.static('public'))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('X-Powered-By', 'JWW');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
//  api response from Sitemapper:
//  res.send('hello world')
    const xmlmap = req.query.xmlsitemap
//  sitemap.fetch('https://wp.seantburke.com/sitemap.xml').then(function(sites) {
    sitemap.fetch(xmlmap).then(function(sites) {
    console.log(sites);
    
    // Write file:
    const xmlsitemapurl = sites.url
    const jsonfilename = extractDomain(xmlsitemapurl);
    console.log(jsonfilename)
    let jsonsfile = jsonfilename + '.json'
    fs.writeFileSync(jsonsfile, JSON.stringify(sites))
    
    res.send(sites)
});

})

app.listen(port, () => {
    console.log(`Sitemap XML app listening at http://localhost:${port}`)
    console.log('server')  
  })