import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignin } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  model: any = {};
  signinForm!: FormGroup;

  constructor(private builder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signinForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    console.log(this.signinForm.value);
    this.authService.signin(this.signinForm.value as UserSignin);
  }

  get email() {
    return this.signinForm.get('email');
  }

  get pwd() {
    return this.signinForm.get('password');
  }
}
