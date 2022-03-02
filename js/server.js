const res = require("express/lib/response");
const http = require("http");
const { hostname } = require("os");
const PORT = 8000;
const html = require("fs").readFileSync("../html/index.html")

//web_server
const server = http.createServer((req,res) => {
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(html);
    res.end();
});

server.listen(PORT,()=>{
    console.log("server running at http");
});