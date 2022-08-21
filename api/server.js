const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotify = require('./routes/spotify');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Database Connection Established'));

app.use('/spotify/v1', spotify);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})