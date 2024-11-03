import { Router } from "express";
import express from "express";

const ROUTER = Router();

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
      console.log(request.body);
      
    response.render("templates/register.ejs");
});

export { ROUTER };
