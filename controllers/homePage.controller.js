import { Router } from "express";
import { signUpDetails } from "./register.controller.js";
import bodyParser from "body-parser";
const ROUTER = Router();

ROUTER.use(bodyParser.urlencoded({ extended: true }));
ROUTER.post("/", (request, response) => {
    const SIGN_IN_INPUT = request.body;
    if (signUpDetails.email !== SIGN_IN_INPUT.email) {
        response.render("templates/signIn.ejs", {
            errorMessage: "The email you inputed has not been registered"
        });
    } else if (signUpDetails.password !== SIGN_IN_INPUT.password) {
        response.render("templates/signIn.ejs", {
            errorMessage: "Incorrect Password"
        });
    } else {
            response.send("THIS IS THE HOME PAGE. YAY!!!");
    }
});

export { ROUTER };
