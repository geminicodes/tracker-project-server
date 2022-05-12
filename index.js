import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobs.js';
import userRouter from './routes/user.js';

const app = express();

dotenv.config();

// instead of cors to work with heroku
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next();
})

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


app.use('/jobs', jobRoutes);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING')
})

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
