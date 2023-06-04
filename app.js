import express from 'express'
import connectWith_DB_Server from './DB_and_Server/connection.js'
import dotenv from "dotenv";
import auth from './Routers/authentication.js'
import authorization from './MiddleWares/authorization.js';
import tasksRoute from './Routers/tasksRoute.js'
let server = express();
let portNumber = process.env.PORT || 3000;
dotenv.config();

connectWith_DB_Server("mongodb://127.0.0.1:27017/testDB", server, portNumber);

server.use(express.json())
server.use(express.static("uploads"))

server.use(auth)
server.use(authorization)

server.use(tasksRoute)


server.use((request, response, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

//!MW For catch all error in project
server.use((error, request, response, next) => {
    response.status(error.status || 500).json({
        message: error + "",
    });
});
