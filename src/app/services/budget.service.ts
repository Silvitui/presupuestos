import { Injectable } from '@angular/core';
import { UserBudget } from '../models/budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private estimates: UserBudget[] = [];
 total: number = 0;        
 totalBudget: number = 0;   
 service: any = {
    seo: false,
    ads: false,
    web: false
  };
  webOptions: any = { 
    pages: 1,
    language: 1
  };

   pageCost: number = 0;
  languageCost: number = 0;

  constructor() {}


   getEstimates(): UserBudget[] {
    return this.estimates;
  }


   addUser(user: UserBudget): void {
    user.date = new Date().getTime();     
    user.total = this.total;             
    user.service = { ...this.service };  
    user.webOption = { ...this.webOptions };

    this.estimates.push(user);
  }


   calculateBudget(): void {

    this.total = this.totalBudget;

    if (this.service.web) {
      this.total += 500;
      if (this.webOptions.pages > 1 || this.webOptions.language >1) {
        this.pageCost = this.webOptions.pages * 30;
        this.languageCost = this.webOptions.language * 30;
        this.total += this.pageCost + this.languageCost;
      }
    }


    if (this.service.seo) {
      this.total += 300; 
    }

  
    if (this.service.ads) {
      this.total += 400; 
    }
    
  }
  addWebOptions(pages: number, language: number): void {
    this.webOptions.pages = pages;
    this.webOptions.language = language;
    this.calculateBudget()
  
   
  }
  resetOptions() {
    this.webOptions = {};

  }
  

  
}
