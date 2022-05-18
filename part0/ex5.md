# SPA diagram
Made with [websequencediagrams](https://www.websequencediagrams.com/)

Content:
```
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{"content":"..","date":"2022-05-18T12:55:20.863Z"}, ...]
```

![ex5diagram](ex5diagram.png)