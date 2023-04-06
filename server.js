const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.get("/second.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/second.html"));
})


app.get("/about.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/about.html"));
})

app.get("/css/style.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/css/style.css"));
})

app.get("/second.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/second1.html"));
})


//IMG

app.get("/loginImg.jpeg", (req, res) => {
    res.sendFile(path.join(__dirname + "/loginImg.jpeg"));
})


// serving the index.html file 

const server = app.listen(5000);
const portNumber = server.address().port;
console.log(`port: ${portNumber}`);
// can see the port number in terminal - you can dictate the port number
