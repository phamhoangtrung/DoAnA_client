import { AbstractControl } from '@angular/forms';

export function numberValidator(control: AbstractControl) {
  const isNumber = Number(control.value);
  if (isNumber || isNumber === 0) {
    return null;
  } else {
    return { notNumber: true };
  }
}
