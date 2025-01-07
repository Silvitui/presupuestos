import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'budgets',
    loadComponent: () => import('./budgets-list/budgets-list.component').then(m => m.BudgetsListComponent),
  },
  {
    path: 'budgets/:id', 
    loadComponent: () => import('./budgets-list/budgets-list.component').then(m => m.BudgetsListComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
