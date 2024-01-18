const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const adminRouter = require('./routes/admins')
const userRouter = require('./routes/user')

app.use(cors());
app.use(express.json());
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Connect with mongoDB');
    } catch (err) {
        console.log(err);
    }
}
connectDB();

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.use('/admin', adminRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server are running on the port ${PORT}`);
})