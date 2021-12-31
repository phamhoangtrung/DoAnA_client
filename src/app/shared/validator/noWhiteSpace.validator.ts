import { AbstractControl } from '@angular/forms';

export function noWhiteSpaceValidator(control: AbstractControl) {
  const isWhitespace = (control.value.toString() || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
