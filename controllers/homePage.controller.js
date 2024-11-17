import { Router } from "express";
import { signUpDetails } from "./register.controller.js";
import { userId } from "./register.controller.js";
import bodyParser from "body-parser";
import { GET_DATA } from "../models/posts.model.js";
const ROUTER = Router();

let pageUrl;

async function getData() {
    const RESPONSE = await GET_DATA();
    return RESPONSE;
}
const DATA = await getData();

ROUTER.use(bodyParser.urlencoded({ extended: true }));
ROUTER.post("/", (request, response) => {
    const SIGN_IN_INPUT = request.body;
    pageUrl = request.baseUrl;
    if (!signUpDetails || signUpDetails.email !== SIGN_IN_INPUT.email) {
        response.render("templates/signIn.ejs", {
            errorMessage: "The email you inputed has not been registered"
        });
    } else if (signUpDetails.password !== SIGN_IN_INPUT.password) {
        response.render("templates/signIn.ejs", {
            errorMessage: "Incorrect Password"
        });
    } else {
        response.render("templates/homePage.ejs", { DATA });
    }
});

ROUTER.get("/", (request, response) => {        response.render("templates/homePage.ejs", { DATA });

});
export { ROUTER };
