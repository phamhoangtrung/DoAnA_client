import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { numberValidator } from 'src/app/shared/validator/number.validator';
import { rangeValidator } from 'src/app/shared/validator/range.validator';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user!: User | null;
  name = '';
  isEdit = false;
  constructor(private builder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  edit() {
    this.isEdit = !this.isEdit;
  }
  update() {
    this.authService.changeName(this.name).subscribe((res) => {
      this.user = res.customer;
      this.name = '';
      this.isEdit = false;
    });
  }
}
