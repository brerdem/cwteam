const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();



app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

const port = process.env.PORT || 8080;

//routes
app.use('/', routes);

// Index route
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
