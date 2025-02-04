import { Component, inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BudgetService } from "../services/budget.service";
import { CommonModule } from "@angular/common";
import { PanelComponent } from "../panel/panel.component";
import { BudgetsListComponent } from "../budgets-list/budgets-list.component";
import { WelcomeComponent } from "../welcome/welcome.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PanelComponent, BudgetsListComponent, WelcomeComponent],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
   budgetService = inject(BudgetService);
   router = inject(Router);
   route = inject(ActivatedRoute);

  budgetForm = new FormGroup({
    seo: new FormControl(false),
    ads: new FormControl(false),
    web: new FormControl(false),
  });

  formularioUser = new FormGroup({
    name: new FormControl("", [ Validators.required,Validators.minLength(3)]),
    email: new FormControl("", [Validators.required,Validators.email,]),
    phone: new FormControl("", [ Validators.required, Validators.minLength(9),Validators.maxLength(9)]),
  });
  ngOnInit(): void {
    this.loadFromURL();
    this.budgetForm.valueChanges.subscribe(() => this.changeStatus());
  }
  loadFromURL(): void { // carga los valores de la url (parámetros seo , ads,web)
    this.route.queryParams.subscribe(params => {
      this.budgetForm.patchValue({
        seo: params["seo"] === "true",
        ads: params["ads"] === "true",
        web: params["webPage"] === "true",
      });
      this.changeStatus();
    });
  }
   changeStatus(): void {
    this.budgetService.updateService("seo", this.budgetForm.value.seo ?? false);
    this.budgetService.updateService("ads", this.budgetForm.value.ads ?? false);
    this.budgetService.updateService("web", this.budgetForm.value.web ?? false);

    this.budgetService.calculateBudget();
    this.updateURL();
  }
   updateURL(): void {
    const queryParams: any = {
      seo: this.budgetForm.value.seo,
      ads: this.budgetForm.value.ads,
      webPage: this.budgetForm.value.web,
    };

    this.router.navigate([], { queryParams, queryParamsHandling: "merge" });
  }
  addUser(): void {
    if (this.formularioUser.valid) {
      this.budgetService.addUser({
       
        name: this.formularioUser.value.name!,
        phone: this.formularioUser.value.phone!,
        email: this.formularioUser.value.email!,
        total: this.budgetService.total(),
        date: new Date(),
        services: { ...this.budgetService.services() },
        webOptions: this.budgetService.services().web ? { ...this.budgetService.webOptions() } : undefined,
      });

      this.formularioUser.reset();
      this.budgetForm.reset();
    }
  }
  getErrorMessage(controlName: string): string | null {
    const control = this.formularioUser.get(controlName);
    if (!control || (!control.touched && !control.dirty)) return null;
  
    if (control.hasError("required")) return "Este campo es obligatorio";
    if (control.hasError("minlength")) return "Debe tener al menos 3 caracteres";
    if (control.hasError("email")) return "Formato de correo no válido";
    if (control.hasError("minlength") || control.hasError("maxlength")) return "Debe tener exactamente 9 números";
  
    return null;
  }
  
}
