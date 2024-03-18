import express, { Request, Response, NextFunction } from "express";
import path from 'path';
import url from 'url';
import router from "./router.js";
import pg from "pg";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url)); // returns the URL of the app on the server

const app = express(); // creates the express server
const port = 3000; // port the server uses

app.use(express.static(__dirname)); // creates static folder, static content is able to be accessed by the user on the server
app.use(express.json()); // middleware that parses JSON
app.use(express.urlencoded({ extended: false })); // middleware that parses urlencoded payloads, ie /search=cutecats&date=new

app.listen(port, () => console.log(`App listening on port ${port}`)); // starts the app on specified port

app.use('/', router) // passes routing to router component at the '/' path

interface ResponseError extends Error {
    statusCode?: number;
}

app.use((err: ResponseError, req: Request, res: Response, next: NextFunction): Response => { // error handling route
    const { DatabaseError } = pg; // named export not working for some reason, have to import DatabaseError like this
    if (err instanceof DatabaseError || !err.statusCode) {
        return res.sendStatus(500);
    }
    return res.status(err.statusCode).json({ msg: err.message })
})