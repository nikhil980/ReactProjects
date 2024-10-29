//  const mongoose =require ('mongoose' );
//  const mongoURI="mongodb://localhost:27017/notes";

//  const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected to mongose Succsessfully");
//     })
//  }
//  module.exports=connectToMongo;
const mongoose = require('mongoose');
// MongoDB URI
const dbURI = "mongodb://localhost:27017";
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