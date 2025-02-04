import { Component, inject, computed, Signal } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { UserBudget } from '../models/budgets';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss']
})
export class BudgetsListComponent {
 budgetService = inject(BudgetService);
  name: string = "";

  presupuestos: Signal<UserBudget[]> = computed(() => {
    return [...this.budgetService.budgets()]
      .filter(budget => budget.name.toLowerCase().includes(this.name.toLowerCase()));
  });


  
  filtersBudgetsByName(): void {
    this.presupuestos = computed(() => {
      return [...this.budgetService.budgets()]
        .filter(budget => budget.name.toLowerCase().includes(this.name.toLowerCase()));
    });
  }

  sortByDate(): void {
    const sortedBudgets = [...this.budgetService.budgets()]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.budgetService.updateBudgets(sortedBudgets);
  }

  sortByTotal(): void {
    const sortedBudgets = [...this.budgetService.budgets()]
      .sort((a, b) => b.total - a.total);
    this.budgetService.updateBudgets(sortedBudgets);
  }

  sortByName(): void {
    const sortedBudgets = [...this.budgetService.budgets()]
      .sort((a, b) => a.name.localeCompare(b.name));
    this.budgetService.updateBudgets(sortedBudgets);
  }
  getServicesList(budget: UserBudget): string[] {
    return [
      budget.services.seo ? "SEO" : null,
      budget.services.ads ? "Ads" : null,
      budget.services.web && budget.webOptions
        ? `Web (${budget.webOptions.pages} páginas, ${budget.webOptions.languages} idiomas)`
        : null
    ].filter(Boolean) as string[];
  }
  preventDefault(event: Event): void {
    event.preventDefault();
  }
}
