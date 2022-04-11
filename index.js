/*
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose
 .connect("mongodb+srv://geminicodes:q22222@library-project.t5woi.mongodb.net/library-project?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  
  useUnifiedTopology: true
 })
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));

app.listen(4000, () => {
    console.log("Hello World!");
});

*/


import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

//const CONNECTION_URL = 'mongodb+srv://geminicodes:q22222@library-project.t5woi.mongodb.net/library-project?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 4000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set('useFindAndModify', false);


/*
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use('./posts', postRoutes);

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


const CONNECTION_URL = 'mongodb+srv://geminicodes:q22222@library-project.t5woi.mongodb.net/library-project?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false  })
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((error) => console.log(error.message));
*/
