import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { IndicatorService } from 'src/app/service/indicator.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserAdminComponent implements OnInit {
  public users!: User[];

  displayedColumns: string[] = [
    'email',
    'name',
    'role',
    'phone',
    'totalBuy',
    'memberShip',
    'action',
  ];

  constructor(
    private userService: UserService,
    private indicatorService: IndicatorService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.indicatorService.set(true);
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe((res: any) => {
      this.indicatorService.set(false);

      this.users = res.customer.map((cus: any) => ({
        ...cus,
        totalBuy: cus.totalBuy.toFixed(2),
      }));
    });
  }

  approveUser(user: User) {
    this.indicatorService.set(true);
    this.userService.approveUser(user).subscribe(() => {
      this.getAllUser();
    });
  }
}
