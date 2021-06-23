import * as tslib_1 from "tslib";
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Injectable } from '@angular/core';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { MainAppSetting } from '../conatants/MainAppSetting';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
var AlertServiceService = /** @class */ (function () {
    function AlertServiceService(alrtCtrl, 
    // private camera: Camera,
    transfer, appSetting, actionSheet, storage, filePath) {
        this.alrtCtrl = alrtCtrl;
        this.transfer = transfer;
        this.appSetting = appSetting;
        this.actionSheet = actionSheet;
        this.storage = storage;
        this.filePath = filePath;
        this.data = {};
        this.respData = {};
    }
    // private options: CameraOptions = {
    //   quality: 15,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   sourceType: this.camera.PictureSourceType.CAMERA
    // }
    AlertServiceService.prototype.saveToLocalStorage = function (key, value) {
        this.storage.set(key, value);
    };
    AlertServiceService.prototype.getDataFromLoaclStorage = function (key) {
        return this.storage.get(key);
    };
    // async capturePhoto(sourcetype) {
    //   this.options.sourceType = sourcetype=='camera'?this.camera.PictureSourceType.CAMERA:sourcetype=='library'?this.camera.PictureSourceType.PHOTOLIBRARY:null
    //   console.log(this.options);
    //     await this.camera.getPicture(this.options).then((imageData) => {
    //       console.log("image data by camera", imageData);
    //       this.fileURL = this.filePath.resolveNativePath(imageData);
    //     }, (error) => {
    //       console.error(error);
    //     });
    //     return this.fileURL;
    // }
    AlertServiceService.prototype.onCaptureImage = function (fileURI) {
        console.log("from on capture image", fileURI);
        return fileURI.substring(7);
    };
    AlertServiceService.prototype.presentAlert = function (header, subheader) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alrtCtrl.create({
                            header: header,
                            subHeader: subheader,
                            cssClass: 'alert-header',
                            buttons: [{
                                    text: 'OK',
                                    cssClass: 'alert-button'
                                }]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertServiceService.prototype.upload = function (fileURI1, data, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fileTransfer, uploadOpts;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileTransfer = this.transfer.create();
                        console.log(fileURI1);
                        uploadOpts = {
                            fileKey: "Display Picture",
                            params: {
                                data: JSON.stringify(data)
                            },
                            fileName: fileURI1.substr(fileURI1.lastIndexOf('/') + 1),
                            headers: {
                                'authorization': window.localStorage.getItem('token'),
                            },
                        };
                        if (type == 'RAISETICKET') {
                            this.apiUrl = this.appSetting.getApi() + "/api/ticket";
                            uploadOpts.httpMethod = 'post';
                        }
                        else if (type == 'UPDATETICKET') {
                            uploadOpts.httpMethod = 'put';
                            this.apiUrl = this.appSetting.getApi() + "/api/ticket/" + data._id;
                        }
                        else if (type == 'CREATENOTICE') {
                            uploadOpts.httpMethod = 'post';
                            console.log(uploadOpts);
                            this.apiUrl = this.appSetting.getApi() + "/api/discussion";
                        }
                        else if (type == 'ADDTOTICKETDETAIL') {
                            this.apiUrl = this.appSetting.getApi() + "/api/ticket/" + data._id;
                            uploadOpts.httpMethod = 'put';
                        }
                        return [4 /*yield*/, fileTransfer.upload(fileURI1, this.apiUrl, uploadOpts).then(function (data) {
                                _this.respData = JSON.parse(data.response);
                                console.log(_this.respData);
                                _this.fileURL = _this.respData.fileUrl;
                                return data;
                            }, function (err) {
                                console.log("*******************Error*******************");
                                console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        console.log("Before Returning data", this.respData);
                        return [2 /*return*/, this.respData];
                }
            });
        });
    };
    AlertServiceService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            FileTransfer,
            MainAppSetting,
            ActionSheetController,
            Storage,
            FilePath])
    ], AlertServiceService);
    return AlertServiceService;
}());
export { AlertServiceService };
//# sourceMappingURL=alert-service.service.js.map