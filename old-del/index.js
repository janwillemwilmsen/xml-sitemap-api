const express = require('express')
const cors = require("cors");
const app = express()
const port = 4000
const Sitemapper = require('sitemapper');
const extractDomain = require("extract-domain");
const fs = require('fs');
const { json } = require('express');



// http://localhost:3000/?name=abel&fruit=apple
// http://localhost:3000/?xmlsitemap=https://www.essent.nl/content/sitemap.xml
// http://localhost:3000/?xmlsitemap=https://www.vattenfall.nl/sitemap.xml

// http://localhost:3000/sitemap?xmlsitemap=https://www.vattenfall.nl/sitemap.xml

app.use(express.static('public'))
app.use('/sitemap',express.json())
app.use(cors({
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.head("/sitemap", (req, res) => {
    console.info("HEAD /sitemap");
    res.sendStatus(204);
  });

app.get('/sitemap', (req, res) => {
//    res.status(200).send('Hello World!')
//    res.status(200).send({tshirts:'tshirts'})
  
  console.log(req.query.xmlsitemap);
  const xmlmap = req.query.xmlsitemap
  console.log(xmlmap)

    const sitemap = new Sitemapper();

    sitemap.fetch(xmlmap).then(function(sites) {
    console.log(sites);

    const xmlsitemapurl = sites.url
    const jsonfilename = extractDomain(xmlsitemapurl);
    console.log(jsonfilename)

    let jsonsfile = jsonfilename + '.json'
    fs.writeFileSync(jsonsfile, JSON.stringify(sites))
    // resultaat van fetch // geeft cors probleem bij fetchen vanaf andere url.
    res.send(sites)
    // res.send(sites.sites)
    // resultaat van local file - cors ?
  
    // console.log(localdata)
    // res.send(JSON.stringify(JSON.parse(localdata)));


    // res.send(sites)
});


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  console.log('server')

})