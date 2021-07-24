import { NailaService } from './../../services/naila.service';
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
  constructor(private activatedRoute: ActivatedRoute,private apiSvc: NailaService) { 
  

   this.activatedRoute.params.subscribe((_res:any)=>{
    //   ;
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


  save_reviews() {
      
    let data=[{ 
      product_id:1,
      review_point:4,
      review_title:'charu test review title',
      review_images:['https://i.picsum.photos/id/326/200/300.jpg?hmac=SKzjQ5ycCVyISiOfq2m-GqpQ5zWT_J202KPYG7z0uB4','https://i.picsum.photos/id/100/200/200.jpg?hmac=-Ffd_UnIv9DLflvK15Fq_1gRuN8t2wWU4UiuwAu4Rqs'],
      review:'charu test review description',
      user_id:99
  //  user_id: window.localStorage.getItem("userid"),
  // product_id: this.callgettagresult.product_id,
  
  }];
 this.apiSvc.save_reviews(data).subscribe(
  (res:any) => {
  if (res){
    //  this.reviewList=res.data;
     console.log(res)
    }               
  },
  
  err => {
    alert(JSON.stringify(err));
  }
);
}
}
