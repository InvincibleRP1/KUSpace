const path = require('path');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

mongoose.connect("mongodb+srv://rahulpandey:meanstackproject@cluster0.i4mqp.mongodb.net/node-angular?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(()=> {
    console.log('Connected to database!')
})
.catch((error)=>{
    console.log(error);
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("images")));

app.use((req, res, next ) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, X-Requested-With, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    
    next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;