/* NODE APPLICATION */

import express from "express";
import multer from "multer";
import ejs from "ejs";
import { __dirname } from "path";
import { fileURLToPath } from "url";
const APP = express();
const PORT = 1510;

APP.set("views", `${__dirname(fileURLToPath(import.meta.url))}/views/`);
APP.set("view engine", "ejs");
APP.use(express.static(`${__dirname(fileURLToPath(import.meta.url))}/public/`));

APP.get("/", (request, response) => {
    response.render("index.ejs");
});

APP.listen(PORT, err => {
    if (err) {
        throw err;
    }
    console.log(`Server is currently listening at http://localhost:${PORT}`);
});
