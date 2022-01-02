import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Di chuyển lên trên cùng mỗi khi chuyển trang
  onActivate() {
    window.scroll(0, 0);
  }
}
