import { AbstractControl } from '@angular/forms';

export function rangeValidator(min: number, max: number) {
  return function (control: AbstractControl) {
    if (control.value > max) {
      return { isGraterThan: true };
    } else if (control.value < min) {
      console.log(control.value);
      return { isLowerThan: true };
    } else {
      return null;
    }
  };
}
