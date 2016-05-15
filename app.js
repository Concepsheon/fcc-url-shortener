var express =  require("express");
var morgan = require("morgan");
var merge = require("migre-me-url");

var fs = require("fs");
var file = "./index.html"

var app = express();
var port = process.env.PORT || 3000;
var host = process.env.IP || 'localhost';

app.use(morgan('dev'));


app.get("/", function(req,res){
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    fs.readFile(file, "utf8", function(err, data){
        if(err)throw err
        res.write(data);
        res.end();
    });
});

app.get("/url/:url*", function(req,res){
    
    var url = req.url.slice(5);
    
    merge.shorten(url, function(err, result){
        if (err) console.log(err);
            res.json({
            original: url,
            shortened: result
        });
    });
});

app.listen(port, host, function(){
    console.log(`https://${host}:${port}/`);
})