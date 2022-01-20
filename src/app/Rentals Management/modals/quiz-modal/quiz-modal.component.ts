import { Push } from "@ionic-native/push/ngx";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, NavController, NavParams, ToastController } from "@ionic/angular";
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
    private toast:ToastController,
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
      user_brand_id: window.localStorage.getItem('brand_id')
    };
  };
  dataChange(i, qid, answer, ansid, brandId ) {
    console.log(i);
    this.count++;
    const answerobj = {
      question_id: qid,
      answer: answer,
      // answer_id: ansid,
      answer_id: '',
      brand_id: brandId,
      
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
        this.hideContent=true

        console.log(res, "track");
      },err=>{
        this.hideContent=true

      });
    }
  }
  saveAnswers = () => {
    this.utilservice.showConfetti()



    this.apisc.saveAnswers(this.answer).subscribe(
      (_res: any) => {
        if (_res.status_code == 200) {
          // this.alertService.presentAlert("", "Answer saved successfully.");
          this.presentToast("Answer saved successfully.")
          if (this.navParams.data["requestFrom"] == "win") {
            this.router.navigate(["/verifyit-rewards"]);
            this.closeModal();
          } else if(this.navParams.data["requestFrom"] == "default"){
            this.utilservice.LoadSurpriseModal();
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
    let data = {
      brand_id: window.localStorage.getItem('brand_id'),
    };

    this.apisc.getQuestion(data).subscribe(
      (res: any) => {
        if (res.message=='Success') {
          this.questions = res.data.question;
          console.table(this.questions);
        }else if(this.navParams.data["requestFrom"] == "default"){
          this.utilservice.LoadSurpriseModal();
          this.closeModal();

        }
      },

      (err) => {
        alert(JSON.stringify(err));
      }
    );
  }
  //**Charu End */


  async presentToast(data) {
    const toast = await this.toast.create({
      message: data,
      duration: 3000
    });
    toast.present();
  }



  //trev new code



  test()
  {
    console.log("hhihihi");
    this.frame();

    
  }

    randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  
  frame() {
    // confetti.create()({
    //   angle: this.randomInRange(20, 125),
    //   spread: this.randomInRange(100, 100),
    //   particleCount: this.randomInRange(300, 100),
    //   origin: { y:0, }
    // });

    // confetti.create()({
    //   angle: this.randomInRange(20, 125),
    //   spread: this.randomInRange(100, 100),
    //   particleCount: this.randomInRange(300, 100),
    //   origin: { y:1 }
    // });

    
    // confetti.create()({
    //   resize: true,
    //   particleCount: 500,
    //   angle: 120,
    //   spread: 200,
    //   origin: { x:1 },
    //   gravity: 5
    // });

  }
  hideContent=true
  
  delayText(){
    this.hideContent=false
    // setTimeout(function(){
    //   // console.log(i);

    // }, 1000);
  }

}
