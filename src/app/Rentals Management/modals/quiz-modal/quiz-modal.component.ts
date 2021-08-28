import { Push } from "@ionic-native/push/ngx";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, NavController, NavParams } from "@ionic/angular";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { TrackingService } from "src/app/services/tracking.service";
import { Utils } from "../../services/utils.service";
import { NailaService } from "../../services/naila.service";
// import { Utils } from "../Rentals Management/services/utils.service";
// import { TrackingService } from "../services/tracking.service";
// import { AlertServiceService } from "../common-services/alert-service.service";
// import { NailaservicePage } from "../Rentals Management/pages/nailaservicepage/nailaservicepage";
// import {NailaService} from ""

@Component({
  selector: "app-quiz-modal",
  templateUrl: "./quiz-modal.component.html",
  styleUrls: ["./quiz-modal.component.scss"],
})
export class QuizModalComponent implements OnInit {
  count = 0;

  questions = [];
  questionsvideo = [
    {
      heading:
        "1. Would you like sharing your Age with us so we help you serve better?",
      title: "**Choose anyone from the options below",
      option: ["<20", "20-25", "25-30", "30-40", "40+"],
      ischeckbox: false,
    },
  ];
  ques: any = [];
  callgettagresult: any;
  answer: any;
  constructor(
    private alertService: AlertServiceService,
    private modalController: ModalController,
    private router: Router,
    private api: TrackingService,
    private apisc: NailaService,
    private utilservice: Utils,
    private navParams: NavParams,
    private navCtrl:NavController
  ) {
    console.log("this.navParams reward", this.navParams);
    this.callgettagresult = this.utilservice.callgettagresult;
    // let qu=  [{
    //   heading: "1. What do you do for a living?",
    //   title: "*Choose anyone from the options below",
    //   option: [
    //     "Student",
    //     "Government Job",
    //     "Private Job",
    //     "Business",
    //     "Retired",
    //     "Other",
    //   ],
    //   ischeckbox: false,
    // },
    // {
    //   'heading': "2. How many family members lives along with you? ",
    //   'title': "*Choose anyone from the options below",
    //   'option': ["1-2", "3-4", "5", "More than 5"],
    //   'ischeckbox': false,
    // },
    // {
    //   //**change for dynamic brand */
    //   'heading':`3. How likely are you to recommend ${this.callgettagresult.brand} to your known?`,

    //   'title': "*Choose anyone from the options below",
    //   'option': ["1", 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //   'ischeckbox': true,
    // },];
    // this.questions=qu;
    console.log("quiz callgettagresult", this.callgettagresult);
    console.log("quiz callgettagresult brand", this.callgettagresult.brand);

    // this.ques =
    //   this.navParams.data["requestFrom"] == "win"
    //     ? this.questions
    //     : this.questionsvideo;

    this.getQuestions();
    this.createAnswer();
  }

  ngOnInit() {}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(this.navParams.data);
  }

  createAnswer = () => {
    this.answer = {
      device_id: window.localStorage.getItem("device_id"),
      product_id: this.callgettagresult.id,
      answers: [],
    };
  };
  dataChange(i, qid, answer, ansid) {
    console.log(i);
    this.count++;
    const answerobj = {
      question_id: qid,
      answer: answer,
      answer_id: ansid,
      brand_id: this.callgettagresult.id,
    };
    this.answer.answers.push(answerobj);
    console.log("ANSWERRRRRRRRRRRRRRRRRRRRRRRRRR");
    console.log(this.answer);
    if (i == this.questions.length - 1) {
      /** Charu  */
      this.saveAnswers();
      /** Charu  */
    } else {
      const data = {
        user_id: localStorage.getItem("userid"),
        tag_id: localStorage.getItem("tagId"),
        product_id: this.utilservice.productId,
        // product_id: 10,
        device_id: localStorage.getItem("device_id"),
        otype: "DATA_FORM_ONE_SUBMITTED",
      };
      //let quizObj=this.questions[i]

      this.apisc.trackingApi(data).subscribe((res) => {
        console.log(res, "track");
      });
    }
  }
  saveAnswers = () => {
    this.apisc.saveAnswers(this.answer).subscribe(
      (_res: any) => {
        if (_res.status_code == 200) {
          this.alertService.presentAlert("", "Answer saved successfully.");
          if (this.navParams.data["requestFrom"] == "win") {
            this.router.navigate(["/verifyit-rewards"]);
            this.closeModal();
          } else if(this.navParams.data["requestFrom"] == "default"){
            this.closeModal();
          }
          else if (this.navParams.data["requestFrom"] == "video") {
            this.closeModal();
          }
        } else {
          this.alertService.presentAlert(
            "",
            "Error Occurred.Please try again later."
          );
        }
      },
      (err) => {
        this.alertService.presentAlert(
          "",
          "Error Occurred.Please try again later."
        );
        console.log(err);
        this.closeModal();

      }
    );
  };
  //**charu Start  for get Question */
  getQuestions() {
    debugger
    let data = {
      brand_id: this.callgettagresult.id,
    };

    this.apisc.getQuestion(data).subscribe(
      (res: any) => {
        if (res) {
          this.questions = res.data.question;
          console.table(this.questions);
        }
      },

      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }
  //**Charu End */
}
