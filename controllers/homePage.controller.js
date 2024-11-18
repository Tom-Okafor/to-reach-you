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
    // create an empty array
    const SHUFFLE_ARR = [];
    // number 9f blog posts categories
    const NUM_OF_KEYS = Object.keys(DATA).length;
    //average number 9f content per category
    const NUM_OF_CONTENT = 5;
    //to display 20 posts we need 4 posts from 5 categories. hence KEYS_ITERATION_COUNT for random keys and VALUES_ITERATION_COUNT for 4 random contents
    const KEYS_ITERATION_COUNT = 5,
        VALUES_ITERATION_COUNT = 4;

    //create an array of 5 random numbers between 0 and 7. there are 8 categories, max-indexed at 7
    const KEYS_ARRAY = createIndexArray(KEYS_ITERATION_COUNT, NUM_OF_KEYS);
    //create an array of 4 random numbers for the posts
    const VALUES_ARRAY = createIndexArray(
        VALUES_ITERATION_COUNT,
        NUM_OF_CONTENT
    );

    //push both arrays into mother array
    SHUFFLE_ARR.push(KEYS_ARRAY);
    SHUFFLE_ARR.push(VALUES_ARRAY);

    // create function that creates the array considering the number of items needed (iterations ) and the range of values available (range)
    function createIndexArray(iterations, range) {
        const RANDOM_ARRAY = [];
        for (let i = 0; i < iterations; i++) {
            let index = generateRandomNum(range);
            addIndexToArray(index, RANDOM_ARRAY, range);
        }
        return RANDOM_ARRAY;
    }

    //check to see if a random number has been added to the arra; since we want distinct values, create a new number if the original number is already in the array or push it into the array if the number hasn't been added yet
    function addIndexToArray(index, collection, range) {
        if (collection.indexOf(index) === -1) {
            collection.push(index);
        } else {
            let newIndex = generateRandomNum(range);
            addIndexToArray(newIndex, collection, range);
        }
    }

    //generate random number from 0 to range
    function generateRandomNum(range) {
        return Math.floor(Math.random() * range);
    }
    return SHUFFLE_ARR;
};
console.log(SHUFFLE_INDEX());

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
        response.render("templates/homePage.ejs", {
            pageUrl,
            DATA,
            blogIndices: SHUFFLE_INDEX()
        });
    }
});

ROUTER.get("/", (request, response) => {
    pageUrl = request.baseUrl;
        response.render("templates/homePage.ejs", {
            pageUrl,
            DATA,
            blogIndices: SHUFFLE_INDEX()
        });

});
export { ROUTER };
