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

const SHUFFLE_INDEX = function () {
    const SHUFFLE_ARR = [];
    const NUM_OF_KEYS = Object.keys(DATA).length;
    const NUM_OF_CONTENT = 5;
    const KEYS_ARRAY = createIndexArray(5, NUM_OF_KEYS);
    const VALUES_ARRAY = createIndexArray(4, NUM_OF_CONTENT);
    SHUFFLE_ARR.push(KEYS_ARRAY);
    SHUFFLE_ARR.push(VALUES_ARRAY);
    function createIndexArray(iterations, range) {
        const RANDOM_ARRAY = [];
        for (let i = 0; i < iterations; i++) {
            let index = generateRandomNum(range);
            addIndexToArray(index, RANDOM_ARRAY, range);
        }
        return RANDOM_ARRAY;
    }
    function addIndexToArray(index, collection, range) {
        if (collection.indexOf(index) === -1) {
            collection.push(index);
        } else {
            let newIndex = generateRandomNum(range);
            addIndexToArray(newIndex, collection, range);
        }
    }

    function generateRandomNum(range) {
        return Math.floor(Math.random() * range);
    }
    return SHUFFLE_ARR;
};
console.log(SHUFFLE_INDEX())

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
        response.render("templates/homePage.ejs", { pageUrl, DATA });
    }
});

ROUTER.get("/", (request, response) => {
    pageUrl = request.baseUrl;

    response.render("templates/homePage.ejs", { pageUrl, DATA });
});
export { ROUTER };
