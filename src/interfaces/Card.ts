export interface Page {
    templateId: string;
    title: string;
    width: number;
    height: number;
  }
  
  export interface Card {
    id: string;
    title: string;
    basePrice: number;
    pages: Page[];
  }
  