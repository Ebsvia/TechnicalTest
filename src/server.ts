//Defines Express app & routes

import express from "express";

export const app = express();

app.set('json spaces', 2);

// Route placeholder for /cards
app.get('/cards', async (req, res) => {
  res.send('List of cards');
});

// Route placeholder for /cards/:cardId/:sizeId?
app.get('/cards/:cardId/:sizeId?', (req, res) => {
  res.send(`Card ${req.params.cardId} with size ${req.params.sizeId}`);
});
