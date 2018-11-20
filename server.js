// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var cors     = require('cors');

var morgan       = require('morgan'); // logging reqs
var bodyParser   = require('body-parser');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json({ limit: '10mb' })); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit:50000 }));
app.use(cors());

// make uploads folder.
var fs = require('fs');
var imgdir = './uploads';
if(!fs.existsSync(imgdir)){
  fs.mkdirSync(imgdir);
}

// multer setup
var multer = require('multer');
var storage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, imgdir)
    },

    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({storage: storage});

// routes ======================================================================
app.post('/', upload.single('file'), (req, res, next) => {
    console.log(JSON.stringify(req.file));
    const file = (req.file.path);

    const imgur = require('imgur');
    imgur.setClientId('2ce55c3b8fb0ca4');
    imgur.setAPIUrl('https://api.imgur.com/3/');
    //
    imgur
      .uploadFile(file)
      .then(function (json) {
          console.log(json.data.link);
          res.status(200).json({
            message: 'Image uploaded successfully.',
            url: json.data.link
          });
      })
      .catch(function (err) {
          console.error(err);
          res.status(200).json({
            message: 'Could not upload image.',
            err: err
          });
      });
});

// launch ======================================================================
app.listen(port, function(req, res){
  console.log('The magic happens on port ' + port);
});
