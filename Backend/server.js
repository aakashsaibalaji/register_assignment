const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();
app.use(express.json());
const mongoose = require('mongoose');
app.use(cors());
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected"))
    .catch(err => console.log("Error while connecting", err))

const AuthRoutes = require('./Routes/authRoutes');

app.use('/auth', AuthRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("backend server has started");
});