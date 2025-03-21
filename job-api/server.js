const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/jobRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/jobs', jobRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
