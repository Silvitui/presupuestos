import { BudgetService } from './../services/budget.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  standalone:true,
  selector: 'app-panel',
  imports: [CommonModule,ReactiveFormsModule,ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  pagesIdentifier : string = "pages";
  languageIdentifier : string = "languages"
  countPages : number = 1;
  countLanguage: number = 1;
  totalCost : number = 0;

  title : string = "";
  text : string = "";
  validPages: FormControl = new FormControl(this.countPages);
  validLanguage: FormControl = new FormControl(this.countLanguage);

    constructor(public BudgetService : BudgetService) {
      this.BudgetService.addWebOptions(this.countPages, this.countLanguage)
   }
   calculatePagesAndLanguageCost(): void {
    this.BudgetService.addWebOptions(this.countPages, this.countLanguage);
    this.BudgetService.calculateBudget();
    this.validPages.setValue(this.countPages);
    this.validLanguage.setValue(this.countLanguage);
  }


  add(prop: string): void {
    if (prop === this.pagesIdentifier) {
      this.countPages++; 
      this.calculatePagesAndLanguageCost(); 
    } else if (prop === this.languageIdentifier) {
      this.countLanguage++; 
      this.calculatePagesAndLanguageCost(); 
    }
  }
  

  rest(prop: string): void {
    if (prop === this.pagesIdentifier && this.countPages > 1) {
      this.countPages--;
      this.calculatePagesAndLanguageCost();
    } else if (prop === this.languageIdentifier && this.countLanguage > 1) {
      this.countLanguage--;
      this.calculatePagesAndLanguageCost();
    }
  }

  textPopUp(title:string,text:string) {
    this.title = title;
    this.text = text;

  }
  

}
