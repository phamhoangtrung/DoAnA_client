import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartAdmin } from 'src/app/models/product.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss'],
})
export class RatingListComponent implements OnInit {
  prodRatingList: any;
  constructor(
    public dialogRef: MatDialogRef<RatingListComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA)
    public data: CartAdmin
  ) {
    this.prodRatingList = data.orderedProduct.map((p: any) => ({
      ...p,
      rating: 3,
    }));
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  rate(rating: number, item: any) {
    this.prodRatingList = this.prodRatingList.map((p: any) => {
      if (item._id === p._id) {
        p.rating = rating;
      }
      return p;
    });
  }

  sendRate() {
    const data = this.prodRatingList.map(({ _id, rating, quantity }: any) => ({
      _id,
      rating,
      quantity,
    }));
    this.apiService.sendRating(data, this.data._id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
