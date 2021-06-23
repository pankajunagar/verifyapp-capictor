import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, NavParams } from "@ionic/angular";
import { Utils } from "../Rentals Management/services/utils.service";
import { TrackingService } from "../services/tracking.service";

@Component({
  selector: "app-quiz-modal",
  templateUrl: "./quiz-modal.component.html",
  styleUrls: ["./quiz-modal.component.scss"],
})
export class QuizModalComponent implements OnInit {
  count = 0;

  questions = [
    {
      heading: "1. What do you do for a living?",
      title: "*Choose anyone from the options below",
      option: [
        "Student",
        "Government Job",
        "Private Job",
        "Business",
        "Retired",
        "Other",
      ],
      ischeckbox: false,
    },
    {
      heading: "2. How many family members lives along with you? ",
      title: "*Choose anyone from the options below",
      option: ["1-2", "3-4", "5", "More than 5"],
      ischeckbox: false,
    },
    {
      // 'heading':"3. How likely are you to recommend Bajaj Almond Oil to your known?",
      heading: "3. Brand Name?",

      title: "*Choose anyone from the options below",
      option: ["1", 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ischeckbox: true,
    },
  ];
  questionsvideo = [
    {
      heading: "1. Video",
      title: "*Would you like sharing your Age with us so we help you serve better?",
      option: [
        "<20",
        "20-25",
        "25-30",
        "30-40",
        "40+"
        ],
      ischeckbox: false,
    }
    // {
    //   heading: "2. Video ",
    //   title: "*Choose anyone from the options below",
    //   option: ["1-2", "3-4", "5", "More than 5"],
    //   ischeckbox: false,
    // },
    // {
    //   // 'heading':"3. How likely are you to recommend Bajaj Almond Oil to your known?",
    //   heading: "3. Video",

    //   title: "*Choose anyone from the options below",
    //   option: ["1", 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //   ischeckbox: true,
    // },
  ];
  ques: any = [];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private api: TrackingService,
    private utilservice: Utils,
    private navParams: NavParams
  ) {
    console.log(this.navParams);
    this.ques =
      this.navParams.data["requestFrom"] == "win"
        ? this.questions
        : this.questionsvideo;
  }

  ngOnInit() {}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(this.navParams.data);
  }

  dataChange(i, len) {
    console.log(i);
    this.count++;
    if (i == (this.ques.length - 1)) {
      /** Charu  */
      if (this.navParams.data["requestFrom"] == "win") {
        this.router.navigate(["/verifyit-rewards"]);
        this.closeModal();
      } else if (this.navParams.data["requestFrom"] == "video") {
        this.closeModal();
      }
         /** Charu  */
    }
    if (i == 2) {
      //           "http://develop.nowverifyit.com/tracking/tracking"
      // post Data is
      // user_id : xxx
      //    tag_id :  xxx
      //    product_id : xxx
      //    device_id : xxx
      // otype : REVIEW | REVIEW_LINK_CLICK | REVIEW_POPUP |ONLINE_PURCHASE | SOCAIL_SHARING
      // otype is must it can be any of |

      const data = {
        user_id: localStorage.getItem("userid"),
        tag_id: localStorage.getItem("tagId"),
        // product_id:this.utilservice.productId,
        product_id: 10,
        device_id: localStorage.getItem("device_id"),
        otype: "DATA_FORM_ONE_SUBMITTED",
      };

      this.api.trackingApi(data).subscribe((res) => {
        console.log(res, "track");
      });
    }
  }
}
