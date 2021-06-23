import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.page.html',
  styleUrls: ['./customer-review.page.scss'],
})
export class CustomerReviewPage implements OnInit {

  ProductDetail: any = [];
ratingValue: number = 0;
rating: any = [
  {
    isClicked: false,
    contentvalue: 1,
  },
  {
    isClicked: false,
    contentvalue: 2,
  },
  {
    isClicked: false,
    contentvalue: 3,
  },
  {
    isClicked: false,
    contentvalue: 4,
  },
  {
    isClicked: false,
    contentvalue: 5,
  },
];
  constructor(private activatedRoute: ActivatedRoute) { 
  

   this.activatedRoute.params.subscribe((_res:any)=>{
    //  debugger;
         this.ProductDetail=JSON.parse(_res.callgettagresult)
    console.log(this.ProductDetail,"<<<<<<<<<<<this.ProductDetail");
    console.log("image>>", this.ProductDetail.img1);
    
    
    
    });
   
    
  }

  ngOnInit() {
  }
  
  getrating = (index: number) => {
    this.ratingValue = index;
    this.rating.forEach((element, i) => {
      if (index == i || i > index) {
        element.isClicked = false;
      } else {
        element.isClicked = true;
      }
    });
  };

}
