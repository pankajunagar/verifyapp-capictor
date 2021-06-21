import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
var QuizModalComponent = /** @class */ (function () {
    function QuizModalComponent(modalController, router) {
        this.modalController = modalController;
        this.router = router;
        this.count = 0;
        this.questions = [{
                'heading': "1. What do you do for a living?",
                'title': "*Choose anyone from the options below",
                'option': [
                    'Student',
                    'Government Job',
                    'Private Job',
                    'Business',
                    'Retired',
                    'Other'
                ],
                'ischeckbox': false
            },
            {
                'heading': "2. How many family members lives along with you? ",
                'title': "*Choose anyone from the options below",
                'option': [
                    '1-2',
                    '3-4',
                    '5',
                    'More than 5'
                ],
                'ischeckbox': false
            },
            {
                'heading': "3. How likely are you to recommend us to your known?",
                'title': '*Choose anyone from the options below',
                'option': [
                    '1', 2, 3, 4, 5, 6, 7, 8, 9, 10
                ],
                'ischeckbox': true
            }
        ];
    }
    QuizModalComponent.prototype.ngOnInit = function () { };
    QuizModalComponent.prototype.dataChange = function (i, len) {
        console.log(i);
        this.count++;
        if (i == len - 1) {
            this.router.navigate(['/verifyit-rewards']);
            this.modalController.dismiss({
                'dismissed': true
            });
        }
    };
    QuizModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-quiz-modal',
            templateUrl: './quiz-modal.component.html',
            styleUrls: ['./quiz-modal.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, Router])
    ], QuizModalComponent);
    return QuizModalComponent;
}());
export { QuizModalComponent };
//# sourceMappingURL=quiz-modal.component.js.map