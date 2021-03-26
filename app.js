const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use('/api/person', require('./routes/person.routes'));

const PORT = config.get('port') || 3000;

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`);
        });
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
};

start();
