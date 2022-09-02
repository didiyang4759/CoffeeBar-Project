import express from 'express';
import cors from 'cors';
import coffees from './api/coffees.route.js';

const app = express();

/*
.use() method on an Express app adds various functionality in the form of middleware
*/
app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); // work with JSON

/*
all requests coming in on URLs with api/v1/movies prefix
will be sent to movies.route.js module
*/
app.use("/api/v1/coffees", coffees);

/*
all other URLs will receive a 404 "not found" error response
*/
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"});
})

export default app;