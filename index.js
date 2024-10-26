/* NODE APPLICATION */

import express from "express";
import multer from "multer";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { ROUTER as registerRouter } from "./controllers/register.controller.js";
import { ROUTER as homePageRouter } from "./controllers/homePage.controller.js";
const APP = express();
const PORT = 1510;

APP.set("views", `${dirname(fileURLToPath(import.meta.url))}/views/`);
APP.set("view engine", "ejs");
APP.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public/`));

APP.get("/", (request, response) => {
    response.render("index.ejs");
});
APP.use("/register", registerRouter);
APP.use("/home", homePageRouter);
APP.listen(PORT, err => {
    if (err) {
        throw err;
    }
    console.log(`Server is currently listening at http://localhost:${PORT}`);
});
