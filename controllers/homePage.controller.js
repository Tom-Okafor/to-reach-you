import { Router } from "express";
import { signUpDetails } from "./register.controller.js";
import bodyParser from "body-parser";
import { GET_DATA } from "../models/posts.model.js";
import fs from "fs";
import path from "path";
import multer from "multer";
const ROUTER = Router();
let pageUrl;
let profileImageName;
fs.access("./public/images/profile/profileImage.jpg", (err) => {
  if (err) {
    profileImageName = "IMG-20241026-WA0023.jpg";
  } else {
    profileImageName = "profileImage.jpg"
  }
});

async function getData() {
  const RESPONSE = await GET_DATA();
  return RESPONSE;
}
const DATA = await getData();

const SHUFFLE_INDEX = function () {
  // create an empty array
  const SHUFFLE_ARR = [];
  // number of blog posts categories
  const NUM_OF_KEYS = Object.keys(DATA).length;
  //average number of content per category
  const NUM_OF_CONTENT = 6;
  //to display the posts we need the average number of posts from all categories. hence KEYS_ITERATION_COUNT for random keys and VALUES_ITERATION_COUNT for 6 random contents
  const KEYS_ITERATION_COUNT = NUM_OF_KEYS,
    VALUES_ITERATION_COUNT = NUM_OF_CONTENT;

  //create an array of 8 random numbers between 0 and 7. there are 8 categories, max-indexed at 7
  const KEYS_ARRAY = createIndexArray(KEYS_ITERATION_COUNT, NUM_OF_KEYS);
  //create an array of 6 random numbers for the posts
  const VALUES_ARRAY = createIndexArray(VALUES_ITERATION_COUNT, NUM_OF_CONTENT);

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

  function generateRandomNum(range) {
    return Math.floor(Math.random() * range);
  }
  return SHUFFLE_ARR;
};
ROUTER.use(bodyParser.urlencoded({ extended: true }));
ROUTER.post("/", (request, response) => {
  const SIGN_IN_INPUT = request.body;
  pageUrl = request.baseUrl;
  if (!signUpDetails || signUpDetails.email !== SIGN_IN_INPUT.email) {
    response.render("templates/signIn.ejs", {
      errorMessage: "The email you inputed has not been registered",
    });
  } else if (signUpDetails.password !== SIGN_IN_INPUT.password) {
    response.render("templates/signIn.ejs", {
      errorMessage: "Incorrect Password",
    });
  } else {
    response.render("templates/homePage.ejs", {
      pageUrl,
      DATA,
      blogIndices: SHUFFLE_INDEX(),
    });
  }
});

ROUTER.get("/", (request, response) => {
  pageUrl = request.baseUrl;

  const PATH = `./public/images/profile/set`;
  fs.access(PATH, (err) => {
    if (err) {
      response.render("templates/homePage.ejs", {
        pageUrl,
        DATA,
        blogIndices: SHUFFLE_INDEX(),
      });
    } else {
      response.render("templates/homePage.ejs", {
        pageUrl,
        DATA,
        blogIndices: SHUFFLE_INDEX(),
        source: profileImageName,
      });
    }
  });
});

ROUTER.get("/blogs/:id", (request, response) => {
  response.render("templates/homePage.ejs", {
    pageUrl: request.baseUrl,
    categoryName: request.params.id,
    category: DATA[request.params.id],
    source: profileImageName,
  });
});
ROUTER.get("/blogs/:category/:title", (request, response) => {
  let categoryId;

  DATA[request.params.category].forEach((category, index) => {
    let title = category.title;
    let newTitle = "";
    for (let i = 0; i < title.length; i++) {
      let titleCharacter = title[i];
      if (titleCharacter === " ") {
        titleCharacter = "_";
      }
      newTitle += titleCharacter;
    }
    if (newTitle === request.params.title) categoryId = index;
  });

  const CONTENT = DATA[request.params.category][categoryId].content;
  response.render("templates/blogpost.ejs", {
    category: request.params.category,
    content: CONTENT,
  });
});

ROUTER.get("/updateProfilePicture", (request, response) => {
  response.render("templates/updateImage.ejs", { pageUrl: request.baseUrl });
});

//set up multer storage
const STORAGE = multer.diskStorage({
  destination: "./public/images/profile",
  filename: (request, file, cb) => {
    profileImageName = "profileImage.jpg";
    cb(null, profileImageName);
  },
});

//filter uploaded file types
const FILE_FILTER = (request, file, cb) => {
  const ACCEPTABLE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif"];
  const FILE_EXTENSION = path.extname(file.originalname).toLowerCase();
  if (ACCEPTABLE_EXTENSIONS.includes(FILE_EXTENSION)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid File Type! Only .jpg, .jpeg, .png and .gif files are allowed!"
      ),
      false
    );
  }
};

const UPLOAD = multer({
  storage: STORAGE,
  fileFilter: FILE_FILTER,
});
ROUTER.post(
  "/imageAdded",
  UPLOAD.single("profileImage"),
  (request, response) => {
    fs.mkdir("./public/images/profile/set", (err) => {
      if (err && err.code !== "EEXIST") {
        console.log("Error creating dirrectory", err);
      } else {
        console.log("Directory creation successful.");
      }
    });
    let location = "";
    for (let i = 0; i < request.baseUrl.length; i++) {
      if (i === 0) continue;
      location += request.baseUrl[i];
    }
    response.redirect("/" + location);
  }
);
ROUTER.get("/createBlogPost", (request, response) => {
  response.send("CREATE BLOG POST");
});
ROUTER.get("/createDiaryEntry", (request, response) => {
  response.send("CREATE DIARY ENTRY");
});
ROUTER.get("/viewBookmarks", (request, response) => {
  response.send("VIEW BOOKMARKS");
});
export { ROUTER };
