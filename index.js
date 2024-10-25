/* NODE APPLICATION */

import express from "express";
import multer from "multer";
import ejs from "ejs";
const APP = express();
const PORT = 1510;

APP.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server is currently listening at http://localhost:${PORT}`);
});
