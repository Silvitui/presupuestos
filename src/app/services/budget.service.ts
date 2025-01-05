import { Injectable } from '@angular/core';
import { UserBudget } from '../models/budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  addUser(user: UserBudget) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  presupuestos: UserBudget[] = [];
  total: number = 0;
  totalBudget: number = 0;
  service: any = {};
  webOptions: any = {};
  pageCost : number = 0;
  languageCost : number = 0;

  calculateBudget() {
    this.total = this.totalBudget;
    if (this.service.web) {
      this.total += 500; 
      this.pageCost = this.webOptions.pages * 30; 
      this.languageCost = this.webOptions.language * 30; 

      this.total += this.pageCost + this.languageCost;
    }

    if (this.service.seo) {
      this.total += 300; 
    }


    if (this.service.ads) {
      this.total += 400; 
    }
  }
}
