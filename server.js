const express = require("express");
const app = express();
const getData = require("./api.js");


var info = {
    "about": "This is The Tureng Dictionary JSON API where you can search English & Turkish words by typing /api/:word",
    "example": "https://tureng-api.glitch.me/api/butterfly",
    "madeWith": "node.js",
    "createdBy": "Mehmet Burak Erman"
}
info = JSON.stringify(info, null, 4);

app.get("/", function (req, res) {
    res.send(info);
});
app.get("/api", function (req, res) {
    res.send(info);
});

app.get("/api/:word", function (req, res) {
    var word = req.params.word;
    getData(word).then(function (r) {
        var apiResponse = JSON.stringify(r, null, 4);
        res.send(apiResponse);
    });
});

app.listen(8080, _ => {
    console.log("server started on port 8080");
});