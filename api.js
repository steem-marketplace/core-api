require('dotenv').config();

require('./core/db');

const Config = require('./config');

const express = require('express');

const port = 3000;

const app = express();
const main = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

main.use('/v1', app);

const Streamer = require('./core/streamer');

const authRoutes = require('./routes/auth-routes');

authRoutes(app);

const streamer = new Streamer();

// Start to stream the Steem blockchain
streamer.init();

main.listen(port, () => console.log(`Core API running on port ${port}`));
