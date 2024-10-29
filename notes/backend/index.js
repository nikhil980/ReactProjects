const mongoose = require('mongoose');
// MongoDB URI
const dbURI = "mongodb://localhost:27017/notes";
// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
// Event handling for successful connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});
// Event handling for connection error
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
});
// Event handling when the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const express = require('express')
var  cors=require('cors');
const port = 6000
const app=express();
app.get('/', (req, res) => {
  res.send('Hello Nikhil chaurasiya!')
})
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
