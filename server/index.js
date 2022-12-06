const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use(routes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
