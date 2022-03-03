const express = require("express");
const app = express();
const port = 8000;

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/html/index.html");
});

app.listen(port,()=>{
    console.log("listening at http://localhost:${port}");
});