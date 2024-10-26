import { Router } from "express";

const ROUTER = Router();

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
    response.render("templates/register.ejs");
});

export { ROUTER };
