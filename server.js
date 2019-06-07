const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');
const Pusher = require('pusher');
let cron = require('node-cron');


const pusher = new Pusher({
    appId      : '689385',
    key        : '8042ee8184c51b5ff049',
    secret     : '9ee8d1d20c3ceb337d83',
    cluster    : 'eu',
    useTLS  : true,
});

const channel = 'projects';



const app = express();

//PORT
const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cwteam", { useNewUrlParser: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
/*
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {

    const projectCollection = db.collection('projects');
    const changeStream = projectCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        if(change.operationType === 'insert') {

            pusher.trigger(
                channel,
                'inserted',
                change.fullDocument
            );
        } else if(change.operationType === 'delete') {
            pusher.trigger(
                channel,
                'deleted',
                change.documentKey._id
            );
        } else if(change.operationType === 'update') {
            pusher.trigger(
                channel,
                'updated',{item: change.updateDescription.updatedFields, project_id: change.documentKey._id}
            );
        }
    });
});


*/

/*const task = cron.schedule('* * * * *', () => {
    console.log('triggered');
    pusher.trigger(channel, 'z-report', {});
});*/

//task.start();


//routes
app.use('/', routes);

// Index route
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
