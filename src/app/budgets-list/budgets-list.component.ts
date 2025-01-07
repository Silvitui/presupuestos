import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss'],
})
export class BudgetsListComponent {}
