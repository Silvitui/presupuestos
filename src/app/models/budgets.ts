export interface UserBudget {
    correo: string; 
    date: number; 
    name: string; 
    pageOption?: { 
      pages: number; 
      language: number; 
    };
    service: { 
      seo: boolean;
      ads: boolean;
      web: boolean;
    };
    telephone: number; 
    total: number; 
  }
  