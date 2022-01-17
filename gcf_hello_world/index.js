const express = require('express')
const cors = require("cors");
const app = express()
const port = 4000
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
    // turned off because it keeps reloading LiveServer in VS Code.
    // const xmlsitemapurl = sites.url
    // const jsonfilename = extractDomain(xmlsitemapurl);
    // console.log(jsonfilename)
    // let jsonsfile = jsonfilename + '.json'
    // fs.writeFileSync(jsonsfile, JSON.stringify(sites))
    
    // Array met urls:
    res.send(sites.sites)
    // hele resonse van XMLSitemapper:
    // res.send(sites)
});

})

// NEW endpoint for converting sites 'object' or list to named-items.

app.get('/new', (req, res) => {
    //  api response from Sitemapper:
    //  res.send('hello world')
        const xmlmap = req.query.xmlsitemap
    //  sitemap.fetch('https://wp.seantburke.com/sitemap.xml').then(function(sites) {
        sitemap.fetch(xmlmap).then(function(sites) {
        // console.log(sites.sites);
        const urlset = sites.sites
        // console.log('urlset',urlset)
        let namedUrls = []
        let myJson;

        list = urlset.reduce((accumulator, currentValue, index, array) => {
            accumulator.push({"sitemapurl" : currentValue});
            return accumulator;
          },[])
          
          console.log(list)

        // urlset.forEach(element => {
        //     // console.log('log elements',element)

        //     // namedUrls.push('{ sitemapurl:',element,'}')
        //     console.log('NamedUrlss', namedUrls)
        // });

        // for(const i in sites.sites)
            // urlset.push([i, sites.sites [i]]);
            // urlset.push(key);
        // console.log('urlset',urlset)
        // Write file:
        // turned off because it keeps reloading LiveServer in VS Code.
        // const xmlsitemapurl = sites.url
        // const jsonfilename = extractDomain(xmlsitemapurl);
        // console.log(jsonfilename)
        // let jsonsfile = jsonfilename + '.json'
        // fs.writeFileSync(jsonsfile, JSON.stringify(sites))
        
        // Array met urls:
        
        
        
        res.send(list)


        // hele resonse van XMLSitemapper:
        // res.send(sites)
    });
    
    })




app.listen(port, () => {
    console.log(`Sitemap XML app listening at http://localhost:${port}`)
    console.log('server')  
  })
  

  exports.hey = app