import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { UserSignup } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { passwordsMatchValidator } from 'src/app/shared/validator/mismatch.validator';
import { numberValidator } from 'src/app/shared/validator/number.validator';
import { rangeValidator } from 'src/app/shared/validator/range.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private builder: FormBuilder, public authService: AuthService) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.signupForm = this.builder.group(
      {
        name: ['', Validators.required],
        age: [
          '',
          [Validators.required, numberValidator, rangeValidator(1, 100)],
        ],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
            asyncValidators: this.validateEmailFromApi.bind(this),
          },
        ],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: passwordsMatchValidator,
      }
    );
  }

  validateEmailFromApi(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.authService.checkEmailExist(control.value).pipe(
      map((isValid: any) => {
        if (isValid.valid) {
          return null;
        }
        return {
          usernameDuplicated: true,
        };
      })
    );
  }

  handleSubmit() {
    const { confirmPassword, ...user } = this.signupForm.value;
    this.authService.signup(user as UserSignup);
  }

  get name() {
    return this.signupForm.get('name');
  }

  get age() {
    return this.signupForm.get('age');
  }

  get addr() {
    return this.signupForm.get('address');
  }

  get phone() {
    return this.signupForm.get('phone');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get pwd() {
    return this.signupForm.get('password');
  }

  get cPwd() {
    return this.signupForm.get('confirmPassword');
  }
}

/**
 *
 * @param form
 */
