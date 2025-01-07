import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CustomValidators } from "../models/customValidators";
import { Router } from "@angular/router";
import { BudgetService } from "../services/budget.service";
import { CommonModule } from "@angular/common";
import { PanelComponent } from "../panel/panel.component";
import { BudgetsListComponent } from "../budgets-list/budgets-list.component";
import { Component } from "@angular/core";
import { UserBudget } from "../models/budgets";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PanelComponent, BudgetsListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  formularioUser: FormGroup;
  form: FormGroup;
 

  constructor(public BudgetService: BudgetService, private router: Router) {
    this.form = new FormGroup({
      seobox: new FormControl<boolean>(false),
      adsbox: new FormControl<boolean>(false),
      webbox: new FormControl<boolean>(false),
    });

    this.formularioUser = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        CustomValidators.onlyLetter,
        CustomValidators.notEmpty,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        CustomValidators.emailCustom,
      ]),
      telephone: new FormControl('', [
        Validators.required,
        CustomValidators.onlyNumber,
      ]),
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((val) => {
      this.BudgetService.service.seo = val.seobox;
      this.BudgetService.service.ads = val.adsbox;
      this.BudgetService.service.web = val.webbox;
      this.BudgetService.calculateBudget();
    });
  }

  get totalBudget(): number {
    return this.BudgetService.total;
  }

  get estimates(): UserBudget[] {
    return this.BudgetService.getEstimates();
  }

  addUser(): void {
    if (this.formularioUser.valid) {
      const userBudget: UserBudget = {
        name: this.formularioUser.value.name,
        telephone: this.formularioUser.value.telephone,
        correo: this.formularioUser.value.email,
        total: this.BudgetService.total,
        date: Date.now(),
        service: { ...this.BudgetService.service },
        webOption: { ...this.BudgetService.webOptions },
      };

      this.BudgetService.addUser(userBudget)

      this.formularioUser.reset();
      this.form.reset();
 
    } else {
      console.error('Formulario inválido');
    }
  }
  getErrorMessage(controlName: string): string | null {
    const control = this.formularioUser.get(controlName);
    if (!control || (!control.touched && !control.dirty)) {
      return null;
    }
  
    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (control.hasError('email')) return 'Formato de email no válido';
    if (control.hasError('onlyNumber')) return control.getError('onlyNumber');
    if (control.hasError('onlyLetter')) return control.getError('onlyLetter');
    if (control.hasError('notEmpty')) return control.getError('notEmpty');
  
    return null; 
  }

  
  
  
}





