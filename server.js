
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
const Nexmo = require('nexmo');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ status : 'hooray! welcome to our api!' });
});

router.post('/sms', function(req, res) {
    var data = req.body;
    console.log(data)

const nexmo = new Nexmo({
    //apikey: 'ee1ce60d',
    apiSecret: 'PJC8ilHdh60EgcTY'
    
    //apiKey: '2e586809',
  //apiSecret: 'AdLJqi4N4r2nrVhw',
});

const from = data.from;
const to = data.to;
const text = data.message;

// console.log(from + "....." + to + "..........." + text)
nexmo.message.sendSms(from, to, text);

res.json({status: "Message sent"})
});


router.post('/test1', function(req, res) {
    var data = req.body;
    console.log(data)

const nexmo = new Nexmo({
  apiKey: 'ee1ce60d',
  apiSecret: 'PJC8ilHdh6OEgcTy',
});

const from = data.from;
const to = data.to;
const text = data.message;

// console.log(from + "....." + to + "..........." + text)
nexmo.message.sendSms(from, to, text);

res.json({status: "Message sent"})
});

router.post('/testsms', function(req, res) {
    var data = req.body;
    console.log(data)

    const nexmo = new Nexmo({
      apiKey: data.key,
      apiSecret: data.secret,
    });

    const from = data.from;
    const to = data.to;
    const text = data.message;

    // console.log(from + "....." + to + "..........." + text)
    console.log(nexmo.message.sendSms(from, to, text));

    res.json({status: "Message sent"})
});

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);
