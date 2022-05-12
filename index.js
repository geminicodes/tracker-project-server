import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobs.js';
import userRouter from './routes/user.js';
import cors from 'cors';

const app = express();

dotenv.config();

app.use(cors({ origin: "https://tracker-project-demo.firebaseapp.com", credentials: true }));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));


app.use('/jobs', jobRoutes);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING')
})

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
