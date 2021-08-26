import { ToastController } from '@ionic/angular';
import { NailaService } from "./../../services/naila.service";
import { ActivatedRoute, Router } from "@angular/router";

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-customer-review",
  templateUrl: "./customer-review.page.html",
  styleUrls: ["./customer-review.page.scss"],
})
export class CustomerReviewPage implements OnInit {
  ProductDetail: any = [];
  ratingValue: number = 0;
  msg:string="Thanku For Your Review."
  data = {
    // product_id:1,
    product_id: "",
    review_point: 4,
    review_title: "",
    review_images: [
      "https://i.picsum.photos/id/326/200/300.jpg?hmac=SKzjQ5ycCVyISiOfq2m-GqpQ5zWT_J202KPYG7z0uB4",
      "https://i.picsum.photos/id/100/200/200.jpg?hmac=-Ffd_UnIv9DLflvK15Fq_1gRuN8t2wWU4UiuwAu4Rqs",
    ],
    review: "",
    // user_id:99
    user_id: window.localStorage.getItem("userid"),
  };

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
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiSvc: NailaService,
    private router: Router,
    private toastController: ToastController,
  ) {
    this.activatedRoute.params.subscribe((_res: any) => {
      this.ProductDetail = JSON.parse(_res.callgettagresult);
      console.log(this.ProductDetail, "<<<<<<<<<<<this.ProductDetail");
      // console.log("image>>", this.ProductDetail.img1);
      this.data.product_id = this.ProductDetail.product_id;
    });
  }

  ngOnInit() {}

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
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: this.msg,
      duration: 3000
    });
    toast.present();
  }
  save_reviews() {
    this.data.review_point = this.rating.filter((x: any) => {
      return x.isClicked == true;
    }).length;
    this.apiSvc.save_reviews(this.data).subscribe(
      (res: any) => {
        if (res) {
          this.presentToast(this.msg);
        this.router.navigateByUrl("/verifyit-product");
        }
      },

      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }
}
