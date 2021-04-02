import express from 'express';
import mongoose from 'mongoose';
import bodyParser  from 'body-parser';
import userRoute from './routes/users.js';
import applicationRoute from './routes/applications.js';
import cors from 'cors';
import dotenv from 'dotenv/config.js';

//startup express and use a port
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/applications', applicationRoute);

//Homepage
app.get('/', async (req, res) =>{
    res.send(`Hello, to retrieve all users go to http://localhost:${PORT}/users \n
            or go to http://localhost:${PORT}/applications to retrieve applications`);
});

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log('connected to DB!')    
);


//Listening
app.listen(PORT, () => console.log(`Server Running on port http://localhost:${PORT}`));
