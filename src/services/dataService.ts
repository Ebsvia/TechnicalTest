// Fetches data from external JSON files

import fetch from 'node-fetch';
import { getCache, setCache } from './cacheService';
import { Card } from '../interfaces/Card';
import { Size } from '../interfaces/Size';
import { Template } from '../interfaces/Template';

const CARDS_URL = 'https://moonpig.github.io/tech-test-node-backend/cards.json';
const SIZES_URL = 'https://moonpig.github.io/tech-test-node-backend/sizes.json';
const TEMPLATES_URL = 'https://moonpig.github.io/tech-test-node-backend/templates.json';

const fetchJson = async <T>(url: string, cacheKey: string): Promise<T> => {
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}`);
    }
  
    const data = (await response.json()) as T;
    setCache(cacheKey, data);
    return data;
  };
  
  export const fetchCards = (): Promise<Card[]> => fetchJson<Card[]>(CARDS_URL, 'cards');
  export const fetchSizes = (): Promise<Size[]> => fetchJson<Size[]>(SIZES_URL, 'sizes');
  export const fetchTemplates = (): Promise<Template[]> => fetchJson<Template[]>(TEMPLATES_URL, 'templates');