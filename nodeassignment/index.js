var express = require('express');
var app = express();
const fs = require('fs');
const indexfile = '/linetext.txt';////mention the text file you are testing with
var bodyParser = require('body-parser')
var port = 8080;

app.use(bodyParser.urlencoded({extend:true}));
app.set('view engine', 'ejs');


app.use('/route', function(req, res){
   var readable = fs.createReadStream(__dirname + indexfile, {encoding:'utf8'});
      readable.on('data', (chunk) => {
          
          var id = req.body.newID
          if(id <= 10)
          id = 10;
          else
          id = req.body.newID;
          console.log(req.body.newID);

          var text = chunk.toString('utf8');
          var slicedText = text.split("\n").slice(-(id)).join("<br>");
          var bufferText = Buffer.from(slicedText, 'utf8');  

          res.render('index',{id:req.body.newID, bufferText:bufferText.toString()});

      })
})

app.listen(port, function () {
   console.log("app listening at localhost "+port+"/");
});

//for tracking changes but unable to apply it perfectly

//const md5 = require('md5');
//require('log-timestamp');
// let md5Previous = null;
// let fsWait = false;
// fs.watch(indexfile, (event, filename) => {
   //    if (filename) {
   //      if (fsWait) return;
   //      fsWait = setTimeout(() => {
   //        fsWait = false;
   //      }, 100);
   //      const md5Current = md5(fs.readFileSync(indexfile));
   //      if (md5Current === md5Previous) {
   //        return;
   //      }
   //      md5Previous = md5Current;
   //      console.log(`${filename} file Changed`);
   //    }
   //  });
   //console.log(`Watching for file changes on ${indexfile}`);