/* NODE APPLICATION */

import express from "express";
import multer from "multer";
import ejs from "ejs";
import path from "path";
const APP = express();
const PORT = 1510;

APP.set("views", "views/");
APP.set("view engine", "ejs");
APP.use(express.static("public/"));

APP.get("/", (request, response) => {
    response.render("index.ejs");
});

APP.listen(PORT, err => {
    if (err) {
        throw err;
    }
    console.log(`Server is currently listening at http://localhost:${PORT}`);
});
