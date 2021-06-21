import * as tslib_1 from "tslib";
import { ActivatedRoute } from "@angular/router";
import { ModalController, LoadingController, ToastController, PopoverController, } from "@ionic/angular";
import { Component } from "@angular/core";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { TranslateServiceService } from "src/app/common-services/translate_/translate-service.service";
import { Utils } from "../../services/utils.service";
import { Camera, CameraResultType } from '@capacitor/camera';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
var WarrantycardComponent = /** @class */ (function () {
    function WarrantycardComponent(modalController, utils, toast, 
    // private camera: Camera,
    loadingCtrl, popoverController, route, webView, transService) {
        this.modalController = modalController;
        this.utils = utils;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        this.popoverController = popoverController;
        this.route = route;
        this.webView = webView;
        this.transService = transService;
        this.productDetail = {
            name: this.utils.warrantyInformation.product_name,
            serial_number: this.utils.warrantyInformation.serial_number
        };
    }
    WarrantycardComponent.prototype.ngOnInit = function () {
    };
    WarrantycardComponent.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.loadingCtrl
                    .create({
                    spinner: "lines",
                })
                    .then(function (loading) {
                    loading.present();
                });
                return [2 /*return*/];
            });
        });
    };
    WarrantycardComponent.prototype.closeModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WarrantycardComponent.prototype.presentToast = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toast.create({
                            message: "Your coupon has been deactivated.",
                            duration: 3000,
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    WarrantycardComponent.prototype.takePic = function () {
        // this.camera.getPicture(this.options).then((imageData) => {
        //   // imageData is either a base64 encoded string or a file URI
        //   // If it's base64 (DATA_URL):
        //   let base64Image = 'data:image/jpeg;base64,' + imageData;
        //  }, (err) => {
        //   // Handle error
        //  });
        var _this = this;
        var takePicture = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var image, imageUrl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Camera.getPhoto({
                            quality: 90,
                            allowEditing: true,
                            resultType: CameraResultType.Uri
                        })];
                    case 1:
                        image = _a.sent();
                        imageUrl = image.webPath;
                        return [2 /*return*/];
                }
            });
        }); };
    };
    WarrantycardComponent = tslib_1.__decorate([
        Component({
            selector: "app-warrantycard",
            templateUrl: "./warrantycard.component.html",
            styleUrls: ["./warrantycard.component.scss"],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            Utils,
            ToastController,
            LoadingController,
            PopoverController,
            ActivatedRoute,
            WebView,
            TranslateServiceService])
    ], WarrantycardComponent);
    return WarrantycardComponent;
}());
export { WarrantycardComponent };
//# sourceMappingURL=warrantycard.component.js.map