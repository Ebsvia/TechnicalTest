//    /cards/:cardId/:sizeId? logic

import { Request, Response } from 'express';
import { fetchCards, fetchSizes, fetchTemplates } from '../services/dataService';
import { calculatePrice, transformPages } from '../utils/cardUtils';
import { Card } from '../interfaces/Card';
import { Size } from '../interfaces/Size';
import { Template } from '../interfaces/Template';

export const getCardById = async (req: Request, res: Response) => {
  const { cardId, sizeId } = req.params;

  try {
   
    const [cards, sizes, templates] = await Promise.all([
      fetchCards() as Promise<Card[]>,
      fetchSizes() as Promise<Size[]>,
      fetchTemplates() as Promise<Template[]>,
    ]);


    const card = cards.find((c) => c.id === cardId);


    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // If sizeId is provided, check if it's valid - e.g. '/la won't work'
    if (sizeId) {
      const validSize = sizes.find((s) => s.id === sizeId);
      if (!validSize) {
        return res.status(400).json({ error: `Invalid sizeId: ${sizeId}` });
      }
    }

    const availableSizes = sizes.map((size) => ({
      id: size.id,
      title: size.title,
    }));

    // Get the price multiplier for the provided sizeId (or get default)
    const size = sizes.find((s) => s.id === sizeId);
    const priceMultiplier = size ? size.priceMultiplier : 1;
    const price = calculatePrice(card.basePrice, priceMultiplier);

    
    const pages = transformPages(card.pages, templates);

    // Return the card data with calculated price and available sizes
    res.json({
      title: card.title,
      size: sizeId || 'default',
      availableSizes,
      imageUrl: pages[0].imageUrl,
      price,
      pages,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching card data' });
  }
};
