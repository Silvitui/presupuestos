import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CustomValidators } from "../models/customValidators";
import { ActivatedRoute, Router } from "@angular/router";
import { BudgetService } from "../services/budget.service";
import { CommonModule } from "@angular/common";
import { PanelComponent } from "../panel/panel.component";
import { BudgetsListComponent } from "../budgets-list/budgets-list.component";
import { Component } from "@angular/core";
import { UserBudget } from "../models/budgets";
import { WelcomeComponent } from "../welcome/welcome.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PanelComponent, BudgetsListComponent, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  formularioUser: FormGroup;
  form: FormGroup;
  service:any = {seo:false, ads:false, web:false}
 

  constructor(public BudgetService: BudgetService, private router: Router,private route: ActivatedRoute) {
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

  changeStatus() {
    this.form.value.seobox ? this.service.seo = true : this.service.seo = false;
    this.form.value.adsbox ? this.service.ads = true : this.service.ads = false;
    this.form.value.webbox ? this.service.web = true : this.service.web = false;
    this.calculatedBudget()

  }
  calculatedBudget() {
    this.BudgetService.calculateBudget();
  }
 


  ngOnInit(): void {
  
    this.route.queryParams.subscribe((params) => {
      this.service.seo = params['seo'] === 'true';
      this.service.ads = params['ads'] === 'true';
      this.service.web = params['webPage'] === 'true';
  
      this.BudgetService.webOptions.pages = +params['pages'] || 1;
      this.BudgetService.webOptions.language = +params['lang'] || 1;
  
      this.form.patchValue({
        seobox: this.service.seo,
        adsbox: this.service.ads,
        webbox: this.service.web,
      });
  
      this.calculatedBudget();
    });
  
    this.form.valueChanges.subscribe((val) => {
      this.BudgetService.service.seo = val.seobox;
      this.BudgetService.service.ads = val.adsbox;
      this.BudgetService.service.web = val.webbox;
  
      this.BudgetService.calculateBudget();
    });
  }
  
  loadBudgetById(id: string) {
    throw new Error("Method not implemented.");
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

  updateURL() {
    const queryParams: any = {
      seo: this.service.seo ,
      ads: this.service.ads,
      WebPage: this.service.web ,
      pages: this.service.web ? this.BudgetService.webOptions.pages || 1 : null,
      lang: this.service.web ? this.BudgetService.webOptions.language || 1 : null,
    };
  
  
    if (!this.service.web) {
      this.BudgetService.resetOptions();
    }
  
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
  
  
  resetURL() {
    this.router.navigate(['/home'], { queryParams: {} });
    this.BudgetService.resetOptions();
  }
  
  
  
  
}







