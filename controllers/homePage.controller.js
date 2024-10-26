import { Router } from "express";

const ROUTER = Router();

ROUTER.post("/", (request, response) => {
    response.send("THIS IS THE HOME PAGE. YAY!!!");
});

export {ROUTER} 