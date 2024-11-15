import { Router } from "express";
import express from "express";

const ROUTER = Router();
let signUpDetails;
    let userId = Math.floor(Math.random() * 1000000 + 10000);
    
ROUTER.use(express.urlencoded({ extended: true }));

ROUTER.get("/", (request, response) => {
    response.render("templates/register.ejs");
});

ROUTER.get("/signIn", (request, response) => {
    response.render("templates/signIn.ejs");
});

ROUTER.get("/signUp", (request, response) => {
    response.render("templates/signUp.ejs");
});

ROUTER.post("/signUpDone", (request, response) => {
    signUpDetails = request.body;
    /*let userId = "";
    for (const eachLetter of signUpDetails.firstname) {
        userId += Math.floor(Math.random() * 10);
    }
    for (let i = signUpDetails.lastname.length; i > 0; i++) {
        userId += signUpDetails.lastname[i - 1];
    }
    console.log(userId);*/

    response.render("templates/signIn.ejs", {
        forURL: signUpDetails,
        userId
    });
});

export { ROUTER };
export { signUpDetails };
export {userId}
