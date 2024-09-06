//Defines Express app & routes

import express from "express";
import { getAllCards } from "./controllers/cardsController";
import { getCardById } from "./controllers/cardController";

export const app = express();

app.set("json spaces", 2);

// Route using controllers
app.get("/cards", getAllCards);
app.get("/cards/:cardId/:sizeId?", getCardById);
