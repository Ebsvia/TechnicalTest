//Defines Express app & routes

import express from "express";
import { getAllCards } from "./controllers/cardsController";
import { getCardById } from "./controllers/cardController";

export const app = express();

app.set("json spaces", 2);

// Route placeholder for /cards
app.get("/cards", getAllCards);

// Route placeholder for /cards/:cardId/:sizeId?
app.get("/cards/:cardId/:sizeId?", getCardById);
