var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');


//get this port dynamically when deployed.
const port = process.env.PORT || 3000
var app = express();

//app.use(cors())

//Set static folder for angular stuff.
app.use(express.static(path.join(__dirname, 'client')));
//Body Parser Middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, resp) => {
    resp.send('<h2>Welcome to Express Server!!</h2>');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


//Mongoose Database connection...
var { mongoose } = require('./config/mongodbconnect');
var { AprvdSoftware } = require('./models/aprvdSoftware');
//var users = require('./models/users');
//var softRequests = require('./models/softRequests');

//Add a new software to the list of approved softwares...
app.post('/softwares',(req, resp) => {
    var aprvdSoftware = new AprvdSoftware({
        softID: req.body.softID,
        softName: req.body.softName,
        softType: req.body.softType,
        version: req.body.version,
        releaseDate: req.body.releaseDate,
        supOs: req.body.supportedOS
    });
    aprvdSoftware.save().then((doc) => {
        console.log('Data Saved Successfully into the database!');
        resp.send(doc);
    },(e) => {
        console.log('Error while saving Approved Software Data into Database', e);
        resp.status(400).send(e);
    });
});

//Get all the softwares list...
app.get('/softwares',(req, resp) => {
    AprvdSoftware.find().then((softs) => {
        resp.send({softs});
    }, (reject) => {
        resp.status(400).send(reject);
    });
});

//Get an individual software from softwares list...
app.get('/softwares/:id', (req, resp) => {
    var id = req.params.id;
    //Validate the ID
    if(!ObjectID.isValid(id)) {
        return resp.status(404).send();
    }
    AprvdSoftware.findById(id).then((soft) => {
        if (!soft) {
            return resp.status(404).send();
        }
        resp.send({soft});
    }).catch((e) => {
            resp.status(400).send(e);
    });
});