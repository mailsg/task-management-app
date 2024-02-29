const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const { ConnectToDatabase } = require('./config/DatabaseConnect');
const Route = require('./routes/Route');

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api', Route);

app.listen(port, async () => {
    await ConnectToDatabase();
    console.log(`Server is running on port ${port}`);
});