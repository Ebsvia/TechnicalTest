// Fetches data from external JSON files

import fetch from 'node-fetch';

const CARDS_URL = 'https://moonpig.github.io/tech-test-node-backend/cards.json';
const SIZES_URL = 'https://moonpig.github.io/tech-test-node-backend/sizes.json';
const TEMPLATES_URL = 'https://moonpig.github.io/tech-test-node-backend/templates.json';

export const fetchCards = async () => {
  const response = await fetch(CARDS_URL);
  return response.json();
};

export const fetchSizes = async () => {
  const response = await fetch(SIZES_URL);
  return response.json();
};

export const fetchTemplates = async () => {
  const response = await fetch(TEMPLATES_URL);
  return response.json();
};
