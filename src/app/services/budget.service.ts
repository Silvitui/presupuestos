import { Injectable, signal } from '@angular/core';
import { UserBudget, ServiceSelection, WebOptions } from '../models/budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgetsList = signal<UserBudget[]>([]);
  total = signal<number>(0); 

  services = signal<ServiceSelection>({
    seo: false,
    ads: false,
    web: false
  });

  webOptions = signal<WebOptions>({
    pages: 1,
    languages: 1
  });

  get budgets() {
    return this.budgetsList; 
  }

  addUser(user: UserBudget): void {
    const totalBudget = this.total(); 
  
    const newBudget: UserBudget = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      date: new Date(),
      total: totalBudget, 
      services: { ...this.services() },
      webOptions: this.services().web ? { ...this.webOptions() } : undefined
    };
  
    this.budgetsList.set([...this.budgetsList(), newBudget]); 
  }
  calculateBudget(): void {
    let total = 0;
    if (this.services().web) {
      total += 500;
      total += this.webOptions().pages * 30;
      total += this.webOptions().languages * 30;
    }

    if (this.services().seo) total += 300;
    if (this.services().ads) total += 400;

    this.total.set(total); 
  }

  updateService(service: keyof ServiceSelection, value: boolean): void {
    this.services.update(services => ({ ...services, [service]: value }));
    this.calculateBudget();
  }

  addWebOptions(pages: number, languages: number): void {
    this.webOptions.set({ pages, languages });
    this.calculateBudget();
  }

  resetOptions(): void {
    this.webOptions.set({ pages: 1, languages: 1 });
  }

  updateBudgets(updatedBudgets: UserBudget[]): void {
    this.budgetsList.set(updatedBudgets); 
  }
}
