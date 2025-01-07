import { CommonModule} from '@angular/common';
import { Component,  Input,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserBudget } from '../models/budgets';
import { BudgetService } from '../services/budget.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-budgets-list',
  standalone:true,
  imports: [CommonModule, FormsModule,HomeComponent],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent  {
  @Input() presupuestos: UserBudget[] = []; 
  name: string = "";
  isAscending: boolean = true;

  

  ngOnInit() : void {
    this.presupuestos = this.BudgetService.getEstimates();
  }
  constructor(public BudgetService: BudgetService, private router: Router) {}
  


  filtersBudgetsByName(name:string) : void {
    this.presupuestos = this.BudgetService.getEstimates().filter(presupuesto => presupuesto.name.toLowerCase().includes(this.name.toLowerCase()))
  }

  filteredByDate() {
    this.isAscending= !this.isAscending
    if(this.isAscending) {
      this.presupuestos.sort((a,b) => a.date - b.date)
    } else {
      this.presupuestos.sort((a,b) => b.date - a.date)
    }

  }
  filterServices(services: any): any[] {
    return Object.keys(services)
      .filter(key => services[key] === true)
      .map(key => ({ key, value: services[key] }));
  }
  orderName() {
    this.isAscending = !this.isAscending;
    this.presupuestos.sort((a, b) =>
      this.isAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }
  orderTotal() {
    this.isAscending= !this.isAscending
    if(this.isAscending) {
      this.presupuestos.sort((a,b) => a.total - b.total)
    } else {
      this.presupuestos.sort((a,b) => b.total - a.total)
    }
  }

  

}
