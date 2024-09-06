//   /cards logic

import { Request, Response } from 'express';
import { fetchCards, fetchTemplates } from '../services/dataService';
import { Card } from '../interfaces/Card';
import { Template } from '../interfaces/Template';

export const getAllCards = async (req: Request, res: Response) => {
  try {
    // Fetch card data and assert its type
    const cards = (await fetchCards()) as Card[];
    const templates = (await fetchTemplates()) as Template[];

    const cardList = cards.map((card) => {
      const firstPage = card.pages[0];
      const template = templates.find((t) => t.id === firstPage.templateId);
      return {
        title: card.title,
        imageUrl: template ? template.imageUrl : '',
        url: `/cards/${card.id}`,
      };
    });

    res.json(cardList);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching card data' });
  }
};
