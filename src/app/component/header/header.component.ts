import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogData } from 'src/app/models/dialog.model';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;

  @ViewChild('navLinks', { static: true })
  navLinks!: ElementRef<HTMLDivElement>;

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => { this.totalItem = res.length; });
  }

  toggleMenu() {
    // mobile mode
    if (this.navLinks.nativeElement.classList.contains('hide')) {
      this.navLinks.nativeElement.classList.remove('hide');
      this.navLinks.nativeElement.classList.toggle('show');
    }
  }

  hideToggle() {
    // mobile mode
    this.navLinks.nativeElement.classList.toggle('hide');
  }

  get isLogin() {
    return this.authService.isLogin;
  }

  signOut() {
    const dialogData: DialogData = {
      title: 'Sign out',
      body: 'Do you want to sign out',
      type: 'option',
    };
    this.dialogService.openMessageDialog(dialogData).subscribe((result) => {
      if (result) {
        this.authService.signOut();
        this.cartService.removeAllCart();
        dialogData.body = 'Sign out success';
        dialogData.type = 'confirm';
        this.dialogService.openMessageDialog(dialogData);
      }
    });
  }
}
