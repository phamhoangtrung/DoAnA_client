import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() content: string | number = '';
  @Input() isHidden = false;

  constructor() {}

  ngOnInit(): void {}
}
