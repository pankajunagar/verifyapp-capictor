import { Push } from "@ionic-native/push/ngx";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController } from "@ionic/angular";
import { AlertServiceService } from "src/app/common-services/alert-service.service";
import { TrackingService } from "src/app/services/tracking.service";
import { Utils } from "../../services/utils.service";
import { NailaService } from "../../services/naila.service";
// import { Utils } from "../Rentals Management/services/utils.service";
// import { TrackingService } from "../services/tracking.service";
// import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


import { Browser } from "@capacitor/browser";
import { Content } from "ionic-angular";
import {
  InAppBrowser,
  InAppBrowserOptions,
  InAppBrowserEvent,
} from "@ionic-native/in-app-browser/ngx";
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
  selectdate
  constructor(
    private alertService: AlertServiceService,
    private modalController: ModalController,
    private router: Router,
    private toast: ToastController,
    private api: TrackingService,
    private apisc: NailaService,
    private utilservice: Utils,
    private navParams: NavParams,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private iab: InAppBrowser
  ) {
    this.selectdate = '';
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

  ngOnInit() { }

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
  dataChange(i, qid, answer, ansid, brandId, questionType, goToId, is_conditional) {
    debugger
    this.showHideAutoLoader()
    console.log(i);

    const answerobj = {
      question_id: qid,
      answer: answer,
      // answer_id: ansid,
      answer_id: '',
      brand_id: brandId,

    };

    if (questionType == '0') {

      if (is_conditional == '1') {
        this.calculateNextQuestion(this.questions,goToId)
      
      
      
        this.count=0
        // let diffToJump = Number(goToId) - Number(qid)
        this.answer.answers.push(answerobj);

        this.count = this.count + this.abcd
      } else {
        this.count++;
        this.answer.answers.push(answerobj);
      }

    }
    if (questionType == '2') {
      i--
    }

    console.log("ANSWERRRRRRRRRRRRRRRRRRRRRRRRRR");
    console.log(this.answer);
    if (i == this.questions.length - 1) {
      /** Charu  */


if(questionType== '0'){

  this.saveAnswers();
}




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
        this.hideContent = true
        console.log(res, "track");
      }, err => {
        this.hideContent = true

      });
      // this.alctrl.dismiss()
      this.loadingController.dismiss()
    }
  }
  saveAnswers = () => {
    this.utilservice.showConfetti()

debugger

    this.apisc.saveAnswers(this.answer).subscribe(
      (_res: any) => {
        window.localStorage.setItem('save_answer', 'true')
        if (_res.status_code == 200) {
          // this.alertService.presentAlert("", "Answer saved successfully.");
          this.presentToast("Answer saved successfully.")
          if (this.navParams.data["requestFrom"] == "win") {
            this.router.navigate(["/verifyit-rewards"]);
            this.closeModal();
          } else if (this.navParams.data["requestFrom"] == "default") {

            if (window.localStorage.getItem('scan_flow') == '2' || window.localStorage.getItem('scan_flow') == '4') {
              window.localStorage.setItem('hasquizModal', '1')
              // this.utilservice.LoadSurpriseModal();
              this.loadingController.dismiss()
              this.closeModal();

            } else {
              debugger

              this.utilservice.LoadSurpriseModal();
              this.closeModal();

            }

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

  selectedDate(event, i, qid, answer, ansid, brandId, questionType, goToId, is_conditional) {
    debugger

   

      const answerobj = {
        question_id: qid,
        answer: this.selectdate,
        // answer_id: ansid,
        answer_id: '',
        brand_id: brandId,

      };
      this.answer.answers.push(answerobj);
      this.count++;
     
  }
  selectName = '';
  abcd
  selectedName(event, i, qid, answer, ansid, brandId, questionType, goToId, is_conditional) {
    debugger


    const answerobj = {
      question_id: qid,
      answer: this.selectName,
      // answer_id: ansid,
      answer_id: '',
      brand_id: brandId,

    };
    this.answer.answers.push(answerobj);
    if (is_conditional == '1') {
      
      this.calculateNextQuestion(this.questions,goToId)
      
      
      
      this.count=0
      // let diffToJump = Number(goToId) - Number(qid)
      this.count = this.count + this.abcd
    } else {

      this.count++;
    }
    // i=i+1
    this.selectName = ''


    if (i == this.questions.length - 1) {
      /** Charu  */

      this.saveAnswers();
      /** Charu  */
    }
    // this.dataChange(i, qid, answer, ansid, brandId, questionType)
  }






  //**charu Start  for get Question */
  getQuestions() {
    let data = {
      brand_id: window.localStorage.getItem('brand_id'),
    };

    this.apisc.getQuestion(data).subscribe(
      (res: any) => {
        if (res.message == 'Success') {
          this.questions = res.data.question;
          console.table(this.questions);
        } else if (this.navParams.data["requestFrom"] == "default") {

          //new flow change

          // this.utilservice.LoadSurpriseModal();


          //new flow change

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



  test() {
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
  hideContent = true

  delayText() {
    this.hideContent = false
    // setTimeout(function(){
    //   // console.log(i);

    // }, 1000);
  }

  showHideAutoLoader() {

    this.loadingController.create({
      message: '',


    });

  }


  async openBrowser(event, i, qid, answer, ansid, brandId, questionType, goToId, is_conditional) {


    this.showHideAutoLoader()
    const answerobj = {
      question_id: qid,
      answer: answer,
      // answer_id: ansid,
      answer_id: '',
      brand_id: brandId,

    };

    this.answer.answers.push(answerobj);


      // await Browser.open({ url: goToId,

      // })
      const browser = this.iab.create(goToId);
      this.saveAnswers()

      // setTimeout(this.saveAnswers, 000)
      
      


  }


  calculateNextQuestion(data,qid){
    let index = data.indexOf(qid);

    data.forEach((element, index) => {
      if(element.id== qid){
       this.abcd=index 
        console.log(index)
        return index
      }
    });
  }
  

}
