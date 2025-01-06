export interface UserBudget {
    correo: string; 
    telephone: number; 
    date: number; 
    name: string; 
    webOption?: { 
      pages: number; 
      language: number; 
    };
    service: { 
      seo: boolean;
      ads: boolean;
      web: boolean;
    };
    total: number; 
   
  }
  