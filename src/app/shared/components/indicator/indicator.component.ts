import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IndicatorService } from 'src/app/service/indicator.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit {
  isLoading!: Observable<boolean>;
  constructor(private is: IndicatorService) {}

  ngOnInit(): void {
    this.isLoading = this.is.get();
  }
}
