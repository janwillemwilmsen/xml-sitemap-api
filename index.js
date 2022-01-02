const express = require('express')
const app = express()
const port = 3000
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

app.get('/sitemap', (req, res) => {
//    res.status(200).send('Hello World!')
//    res.status(200).send({tshit:'tshits'})
  
  console.log(req.query.xmlsitemap);
  const xmlmap = req.query.xmlsitemap
  console.log(xmlmap)

    const sitemap = new Sitemapper();

    sitemap.fetch(xmlmap).then(function(sites) {
    console.log(sites);

    const xmlsitemapurl = sites.url
    const jsonfilename = extractDomain(xmlsitemapurl);

    console.log(jsonfilename)
    const jsonsfile = jsonfilename + '.json'
    fs.writeFileSync(jsonsfile, JSON.stringify(sites))
    res.send(sites.sites)
});

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  console.log('server')

})