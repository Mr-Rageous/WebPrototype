import express from "express";
import path from 'path';
const router = express.Router(); // create the router

router.get('/', (req, res, next) => { // at the root directory, send index.html as response
    res.sendFile(path.join(__dirname, 'index.html'))
});

export default router;