import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Utils } from '../Rentals Management/services/utils.service';
import { TrackingService } from '../services/tracking.service';

@Component({
  selector: 'app-quiz-modal',
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.scss'],
})
export class QuizModalComponent implements OnInit {
  count=0;

  questions=[{
    'heading':"1. What do you do for a living?",
    'title': "*Choose anyone from the options below",
    'option':[
       'Student',
        'Government Job',
        'Private Job',
        'Business',
        'Retired',
         'Other'
    ],
    'ischeckbox':false
  },
  {
    'heading':"2. How many family members lives along with you? ",
    'title':"*Choose anyone from the options below",
    'option':[
       '1-2',
       '3-4',
      '5',
       'More than 5'
    ],
    'ischeckbox':false
  },
  {
    'heading':"3. How likely are you to recommend us to your known?",
    'title':'*Choose anyone from the options below',
    'option':[
      '1',2,3,4,5,6,7,8,9,10
    ],
    'ischeckbox':true
  }


]

  constructor(private modalController:ModalController,private router:Router,private api:TrackingService,private utilservice:Utils) { }

  ngOnInit() {}

  dataChange(i,len){
    console.log(i);
    this.count++;
    if(i==len-1){
      this.router.navigate(['/verifyit-rewards'])
      this.modalController.dismiss({
        'dismissed': true
      });
      
    }
        if(i==2){

          const data={
            user_id:localStorage.getItem('userid'),
            tag_id:localStorage.getItem('tagId'),
            product_id:this.utilservice.productId,
            device_id:localStorage.getItem('device_id')
          }

          this.api.trackingApi(data).subscribe(res=>{
            console.log(res,"track");
            
          })
        }
    
  }

}
