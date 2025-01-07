import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ModalComponent } from './shared/modal/modal.component';
import { PanelComponent } from './panel/panel.component';
import { BudgetsListComponent } from './budgets-list/budgets-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent,ModalComponent,PanelComponent,BudgetsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'presupuestos';
}
