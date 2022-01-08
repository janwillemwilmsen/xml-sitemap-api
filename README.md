# xml-sitemap-api

Api to turn an xml sitemap into json. 

**Usage:**  
Clone repo in a folder.  
Install dependancies.  
Start express with " node . " in VS Code, or " node index " in terminal.  
Go to: localhost:3000/?https://mywebsite.ext/sitemap.xml and press enter.   

**Server:**  
Open: /public/search.html with Live Server. Get a search field where you enter an xml sitemap url.
Response should be json array with urls.

**Frontend:**  
Open: localhost:3000/fetch-search.html to trigger a fetch function and list all urls.  
  
Also saves a json file with all urls from the fetched/scraped xml sitemap.  
  
Uses NPM module [sitemapper](https://github.com/seantomburke/sitemapper), with support for Sitemapindex.

> #myfirstapi

