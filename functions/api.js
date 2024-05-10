const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author'); 
const mongoose = require('mongoose'); 
const cors = require('cors');

const authorRouter = require('./routes/author');
const postRouter = require('./routes/post');
const categoryRouter = require('./routes/category');
const tagRouter = require('./routes/tag');
const commentRouter = require('./routes/comment');

const app = express();
// your mongoDB Cloud URL
const dbCloudUrl =
    'mongodb+srv://saguidlovely:12345@cluster0.41uljuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// your mongoDB Cloud URL
const dbLocalUrl = 'mongodb://localhost:27017/serverless-api-saguid';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(dbCloudUrl || dbLocalUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));
    
app.use('/.netlify/functions/api', router);
app.use('/.netlify/functions/api/author', authorRouter);
app.use('/.netlify/functions/api/post', postRouter);
app.use('/.netlify/functions/api/category', categoryRouter);
app.use('/.netlify/functions/api/tag', tagRouter);
app.use('/.netlify/functions/api/comment', commentRouter);

module.exports.handler = serverless (app);
