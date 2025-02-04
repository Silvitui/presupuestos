export interface WebOptions {
  pages: number;
  languages: number;
}

export interface ServiceSelection {
  seo: boolean;
  ads: boolean;
  web: boolean;
}

export interface UserBudget {
  
  name: string; 
  email: string; 
  phone: string; 
  date: Date; 
  services: ServiceSelection; 
  webOptions?: WebOptions; 
  total: number; 
}
