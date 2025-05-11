const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const schoolRoutes = require('./routes/school.routes');

const PORT = process.env.PORT || 2000;
const app = express();
app.use(express.json());

(async () => {
    try {
        const db = await connectDB(); 
        if (!db) {
            throw new Error('Failed to establish a database connection');
        }
        app.locals.connection = db; 

        app.use('/school', (req, res, next) => {
            req.db = app.locals.connection;
            next();
        }, schoolRoutes);

        app.listen(PORT, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1); 
    }
})();
