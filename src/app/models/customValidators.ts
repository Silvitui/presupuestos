import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static onlyNumber(control: AbstractControl): ValidationErrors | null {
    const isValid = /^\d{9}$/.test(control.value);
    return isValid ? null : { onlyNumber: 'El campo debe contener exactamente 9 dígitos numéricos.' };
  }

  static onlyLetter(control: AbstractControl): ValidationErrors | null {
    const isValid = /^[a-zA-Zñáéíóúü\s]+$/.test(control.value);
    return isValid ? null : { onlyLetter: 'El campo debe contener solo letras y espacios.' };
  }

  static emailCustom(control: AbstractControl): ValidationErrors | null {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(control.value);
    return isValid ? null : { emailCustom: 'Introduce un correo electrónico válido.' };
  }

  static notEmpty(control: AbstractControl): ValidationErrors | null {
    const isValid = control.value?.trim().length > 0;
    return isValid ? null : { notEmpty: 'El campo no puede estar vacío o contener solo espacios.' };
  }
}
