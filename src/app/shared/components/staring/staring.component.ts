import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-staring',
  templateUrl: './staring.component.html',
  styleUrls: ['./staring.component.scss'],
})
export class StaringComponent implements OnInit {
  @Output() onStartChange = new EventEmitter<number>();
  @Input() selectedRating!: number;
  @Input() disabled = false;

  stars!: any[];

  constructor() { }

  ngOnInit(): void {
    this.stars = [
      {
        id: 1,
        icon: 'star',
        // class: 'star-gold star',
      },
      {
        id: 2,
        icon: 'star',
        // class: 'star-gray star-hover star',
      },
      {
        id: 3,
        icon: 'star',
      },
      {
        id: 4,
        icon: 'star',
      },
      {
        id: 5,
        icon: 'star',
      },
    ].map((s) => {
      // add initial class for star
      const isEdited = this.selectedRating >= s.id ? 'star-gold star' : 'star-gray star';
      const className = this.disabled ? isEdited : `${isEdited} star-hover`;
      return { ...s, class: className };
    });
  }

  selectStar(value: number): void {
    if (this.disabled) return;
    // change star class < current start 
    this.stars.filter((star) => {
      if (star.id <= value) {
        star.class = 'star-gold star';
      } else {
        star.class = 'star-gray star-hover star';
      }
      return star;
    });
    this.onStartChange.emit(value);
  }
}
