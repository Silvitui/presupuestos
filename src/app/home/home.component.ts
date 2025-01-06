
import { BudgetService } from './../services/budget.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';
import { Router } from '@angular/router';
import { UserBudget } from '../models/budgets';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,PanelComponent,BudgetsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

   UserBudget:
    UserBudget = {
    correo: '',
    date: 0,
    name: '',
    telephone: 0,
    total: 0,
    service: {
      seo: false,
      ads: false,
      web: false
    },
  };



  constructor(public BudgetService: BudgetService, private router: Router) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((val) => {
      this.BudgetService.service.seo = val.seobox;
      this.BudgetService.service.ads = val.adsbox;
      this.BudgetService.service.web = val.webbox;
      this.BudgetService.calculateBudget();
    });
  }

    form : FormGroup = new FormGroup({
      seobox : new FormControl(false),
      adsbox : new FormControl(false),
      webbox : new FormControl(false)
    })

    formularioUser : FormGroup = new FormGroup({
      name : new FormControl("",[Validators.required,Validators.minLength(3)]),
      email : new FormControl("",[Validators.required,Validators.email]),
      telephone : new FormControl("",[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
    }) 

    getErrorMessage(controlName: string): string | null {
      const control = this.formularioUser.get(controlName);
      if (!control) return null;
      if (control.hasError("required") && (control.touched || control.dirty)) {
        return 'Este campo es obligatorio';
      }
      if (control.hasError("minLength") && control.dirty) {
        return 'No cumple con la longitud mínima';
      }
      return null;
    }

    addUser() {
      if(this.formularioUser.valid) {
        this.UserBudget.name = this.formularioUser.value.name;
        this.UserBudget.telephone = this.formularioUser.value.telephone;
        this.UserBudget.correo = this.formularioUser.value.email;
        this.BudgetService.addUser(this.UserBudget);
  
        this.form.reset()
        this.formularioUser.reset()
      } else {
        throw new Error("validation failed")
      }
    }

    

  



}
