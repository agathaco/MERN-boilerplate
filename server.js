require('dotenv').config()

var cors = require('cors')
const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error)) // will run on error
db.once('open', () => console.log('Connected to Database')) // will run only once


app.use(cors());
// set up server to accept json
app.use(express.json())
// OR
// const bodyParser = require('body-parser');
// app.use(bodyparser.json())

// set up routes
app.use('/api/profile', require('./routes/profile'));
app.use('/api/auth', require('./routes/auth'));

// listen to our server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));