import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateServiceService } from 'src/app/common-services/translate_/translate-service.service';
var CountrycodemodalComponent = /** @class */ (function () {
    function CountrycodemodalComponent(_modalCtrl, transService) {
        this._modalCtrl = _modalCtrl;
        this.transService = transService;
        this.hideButton = false;
        this.showLoading = false;
        this.start = 0;
        this.end = 10;
        this.countryCode = [{ country: "India (+91)", code: "+91" }, { country: "United States (+1)", code: "+1" }, { country: "Canada (+1)", code: "+1" }, { country: "United Kingdom (+44)", code: "+44" }, { country: "Singapore (+65)", code: "+65" }, { country: "Australia (+61)", code: "+61" }, { country: "Indonesia (+62)", code: "+62" }, { country: "Malaysia (+60)", code: "+60" }, { country: "United Arab Emirates (+971)", code: "+971" }, { country: "Qatar (+974)", code: "+974" }, { country: "Oman (+968)", code: "+968" }, { country: "New Zealand (+64)", code: "+64" }, { country: "Kuwait (+965)", code: "+965" }, { country: "Saudi Arabia (+966)", code: "+966" }, { country: "Nigeria (+234)", code: "+234" }, { country: "Bahrain (+973)", code: "+973" }, { country: "Maldives (+960)", code: "+960" }];
        this.moreCountryCode = [{ country: "Afghanistan (+93)", code: "+93" }, { country: "Albania (+355)", code: "+355" }, { country: "Algeria (+213)", code: "+213" }, { country: "AmericanSamoa (+1 684)", code: "+1684" }, { country: "Andorra (+376)", code: "+376" }, { country: "Angola (+244)", code: "+244" }, { country: "Anguilla (+1 264)", code: "+1264" }, { country: "Antigua and Barbuda (+1268)", code: "+1268" }, { country: "Argentina (+54)", code: "+54" }, { country: "Armenia (+374)", code: "+374" }, { country: "Aruba (+297)", code: "+297" }, { country: "Austria (+43)", code: "+43" }, { country: "Azerbaijan (+994)", code: "+994" }, { country: "Bahamas (+1 242)", code: "+1242" }, { country: "Bangladesh (+880)", code: "+880" }, { country: "Barbados (+1 246)", code: "+1246" }, { country: "Belarus (+375)", code: "+375" }, { country: "Belgium (+32)", code: "+32" }, { country: "Belize (+501)", code: "+501" }, { country: "Benin (+229)", code: "+229" }, { country: "Bermuda (+1 441)", code: "+1441" }, { country: "Bhutan (+975)", code: "+975" }, { country: "Bosnia and Herzegovina (+387)", code: "+387" }, { country: "Botswana (+267)", code: "+267" }, { country: "Brazil (+55)", code: "+55" }, { country: "British Indian Ocean Territory (+246)", code: "+246" }, { country: "Bulgaria (+359)", code: "+359" }, { country: "Burkina Faso (+226)", code: "+226" }, { country: "Burundi (+257)", code: "+257" }, { country: "Cambodia (+855)", code: "+855" }, { country: "Cameroon (+237)", code: "+237" }, { country: "Cape Verde (+238)", code: "+238" }, { country: "Cayman Islands (+ 345)", code: "+ 345" }, { country: "Central African Republic (+236)", code: "+236" }, { country: "Chad (+235)", code: "+235" }, { country: "Chile (+56)", code: "+56" }, { country: "China (+86)", code: "+86" }, { country: "Colombia (+57)", code: "+57" }, { country: "Christmas Island (+61)", code: "+61" }, { country: "Comoros (+269)", code: "+269" }, { country: "Congo (+242)", code: "+242" }, { country: "Cook Islands (+682)", code: "+682" }, { country: "Costa Rica (+506)", code: "+506" }, { country: "Croatia (+385)", code: "+385" }, { country: "Cuba (+53)", code: "+53" }, { country: "Cyprus (+537)", code: "+537" }, { country: "Czech Republic (+420)", code: "+420" }, { country: "Denmark (+45)", code: "+45" }, { country: "Djibouti (+253)", code: "+253" }, { country: "Dominica (+1 767)", code: "+1767" }, { country: "Dominican Republic (+1 849)", code: "+1849" }, { country: "Ecuador (+593)", code: "+593" }, { country: "Egypt (+20)", code: "+20" }, { country: "El Salvador (+503)", code: "+503" }, { country: "Equatorial Guinea (+240)", code: "+240" }, { country: "Eritrea (+291)", code: "+291" }, { country: "Estonia (+372)", code: "+372" }, { country: "Ethiopia (+251)", code: "+251" }, { country: "Faroe Islands (+298)", code: "+298" }, { country: "Fiji (+679)", code: "+679" }, { country: "Finland (+358)", code: "+358" }, { country: "France (+33)", code: "+33" }, { country: "French Guiana (+594)", code: "+594" }, { country: "French Polynesia (+689)", code: "+689" }, { country: "Gabon (+241)", code: "+241" }, { country: "Gambia (+220)", code: "+220" }, { country: "Georgia (+995)", code: "+995" }, { country: "Germany (+49)", code: "+49" }, { country: "Ghana (+233)", code: "+233" }, { country: "Gibraltar (+350)", code: "+350" }, { country: "Greece (+30)", code: "+30" }, { country: "Greenland (+299)", code: "+299" }, { country: "Grenada (+1 473)", code: "+1473" }, { country: "Guadeloupe (+590)", code: "+590" }, { country: "Guam (+1 671)", code: "+1671" }, { country: "Guatemala (+502)", code: "+502" }, { country: "Guinea (+224)", code: "+224" }, { country: "Guinea-Bissau (+245)", code: "+245" }, { country: "Guyana (+595)", code: "+595" }, { country: "Haiti (+509)", code: "+509" }, { country: "Honduras (+504)", code: "+504" }, { country: "Hungary (+36)", code: "+36" }, { country: "Iceland (+354)", code: "+354" }, { country: "Iraq (+964)", code: "+964" }, { country: "Ireland (+353)", code: "+353" }, { country: "Israel (+972)", code: "+972" }, { country: "Italy (+39)", code: "+39" }, { country: "Jamaica (+1 876)", code: "+1876" }, { country: "Japan (+81)", code: "+81" }, { country: "Jordan (+962)", code: "+962" }, { country: "Kazakhstan (+7 7)", code: "+77" }, { country: "Kenya (+254)", code: "+254" }, { country: "Kiribati (+686)", code: "+686" }, { country: "Kyrgyzstan (+996)", code: "+996" }, { country: "Latvia (+371)", code: "+371" }, { country: "Lebanon (+961)", code: "+961" }, { country: "Lesotho (+266)", code: "+266" }, { country: "Liberia (+231)", code: "+231" }, { country: "Liechtenstein (+423)", code: "+423" }, { country: "Lithuania (+370)", code: "+370" }, { country: "Luxembourg (+352)", code: "+352" }, { country: "Madagascar (+261)", code: "+261" }, { country: "Malawi (+265)", code: "+265" }, { country: "Mali (+223)", code: "+223" }, { country: "Malta (+356)", code: "+356" }, { country: "Marshall Islands (+692)", code: "+692" }, { country: "Martinique (+596)", code: "+596" }, { country: "Mauritania (+222)", code: "+222" }, { country: "Mauritius (+230)", code: "+230" }, { country: "Mayotte (+262)", code: "+262" }, { country: "Mexico (+52)", code: "+52" }, { country: "Monaco (+377)", code: "+377" }, { country: "Mongolia (+976)", code: "+976" }, { country: "Montenegro (+382)", code: "+382" }, { country: "Montserrat (+1664)", code: "+1664" }, { country: "Morocco (+212)", code: "+212" }, { country: "Myanmar (+95)", code: "+95" }, { country: "Namibia (+264)", code: "+264" }, { country: "Nauru (+674)", code: "+674" }, { country: "Nepal (+977)", code: "+977" }, { country: "Netherlands (+31)", code: "+31" }, { country: "Netherlands Antilles (+599)", code: "+599" }, { country: "New Caledonia (+687)", code: "+687" }, { country: "Nicaragua (+505)", code: "+505" }, { country: "Niger (+227)", code: "+227" }, { country: "Niue (+683)", code: "+683" }, { country: "Norfolk Island (+672)", code: "+672" }, { country: "Northern Mariana Islands (+1 670)", code: "+1670" }, { country: "Norway (+47)", code: "+47" }, { country: "Pakistan (+92)", code: "+92" }, { country: "Palau (+680)", code: "+680" }, { country: "Panama (+507)", code: "+507" }, { country: "Papua New Guinea (+675)", code: "+675" }, { country: "Paraguay (+595)", code: "+595" }, { country: "Peru (+51)", code: "+51" }, { country: "Philippines (+63)", code: "+63" }, { country: "Poland (+48)", code: "+48" }, { country: "Portugal (+351)", code: "+351" }, { country: "Puerto Rico (+1 939)", code: "+1939" }, { country: "Romania (+40)", code: "+40" }, { country: "Rwanda (+250)", code: "+250" }, { country: "Samoa (+685)", code: "+685" }, { country: "San Marino (+378)", code: "+378" }, { country: "Senegal (+221)", code: "+221" }, { country: "Serbia (+381)", code: "+381" }, { country: "Seychelles (+248)", code: "+248" }, { country: "Sierra Leone (+232)", code: "+232" }, { country: "Slovakia (+421)", code: "+421" }, { country: "Slovenia (+386)", code: "+386" }, { country: "Solomon Islands (+677)", code: "+677" }, { country: "South Africa (+27)", code: "+27" }, { country: "South Georgia and the South Sandwich Islands (+500)", code: "+500" }, { country: "Spain (+34)", code: "+34" }, { country: "Sri Lanka (+94)", code: "+94" }, { country: "Sudan (+249)", code: "+249" }, { country: "Suriname (+597)", code: "+597" }, { country: "Swaziland (+268)", code: "+268" }, { country: "Sweden (+46)", code: "+46" }, { country: "Switzerland (+41)", code: "+41" }, { country: "Tajikistan (+992)", code: "+992" }, { country: "Thailand (+66)", code: "+66" }, { country: "Togo (+228)", code: "+228" }, { country: "Tokelau (+690)", code: "+690" }, { country: "Tonga (+676)", code: "+676" }, { country: "Trinidad and Tobago (+1 868)", code: "+1868" }, { country: "Tunisia (+216)", code: "+216" }, { country: "Turkey (+90)", code: "+90" }, { country: "Turkmenistan (+993)", code: "+993" }, { country: "Turks and Caicos Islands (+1 649)", code: "+1649" }, { country: "Tuvalu (+688)", code: "+688" }, { country: "Uganda (+256)", code: "+256" }, { country: "Ukraine (+380)", code: "+380" }, { country: "Uruguay (+598)", code: "+598" }, { country: "Uzbekistan (+998)", code: "+998" }, { country: "Vanuatu (+678)", code: "+678" }, { country: "Wallis and Futuna (+681)", code: "+681" }, { country: "Yemen (+967)", code: "+967" }, { country: "Zambia (+260)", code: "+260" }, { country: "Zimbabwe (+263)", code: "+263" }, { country: "land Islands ()", code: "" }, { country: "Bolivia, Plurinational State of (+591)", code: "+591" }, { country: "Brunei Darussalam (+673)", code: "+673" }, { country: "Cocos (Keeling) Islands (+61)", code: "+61" }, { country: "Congo, The Democratic Republic of the (+243)", code: "+243" }, { country: "Cote d'Ivoire (+225)", code: "+225" }, { country: "Falkland Islands (Malvinas) (+500)", code: "+500" }, { country: "Guernsey (+44)", code: "+44" }, { country: "Holy See (Vatican City State) (+379)", code: "+379" }, { country: "Hong Kong (+852)", code: "+852" }, { country: "Iran, Islamic Republic of (+98)", code: "+98" }, { country: "Isle of Man (+44)", code: "+44" }, { country: "Jersey (+44)", code: "+44" }, { country: "Korea, Democratic People's Republic of (+850)", code: "+850" }, { country: "Korea, Republic of (+82)", code: "+82" }, { country: "Lao People's Democratic Republic (+856)", code: "+856" }, { country: "Libyan Arab Jamahiriya (+218)", code: "+218" }, { country: "Macao (+853)", code: "+853" }, { country: "Macedonia, The Former Yugoslav Republic of (+389)", code: "+389" }, { country: "Micronesia, Federated States of (+691)", code: "+691" }, { country: "Moldova, Republic of (+373)", code: "+373" }, { country: "Mozambique (+258)", code: "+258" }, { country: "Palestinian Territory, Occupied (+970)", code: "+970" }, { country: "Pitcairn (+872)", code: "+872" }, { country: "Réunion (+262)", code: "+262" }, { country: "Russia (+7)", code: "+7" }, { country: "Saint Barthélemy (+590)", code: "+590" }, { country: "Saint Helena, Ascension and Tristan Da Cunha (+290)", code: "+290" }, { country: "Saint Kitts and Nevis (+1 869)", code: "+1869" }, { country: "Saint Lucia (+1 758)", code: "+1758" }, { country: "Saint Martin (+590)", code: "+590" }, { country: "Saint Pierre and Miquelon (+508)", code: "+508" }, { country: "Saint Vincent and the Grenadines (+1 784)", code: "+1784" }, { country: "Sao Tome and Principe (+239)", code: "+239" }, { country: "Somalia (+252)", code: "+252" }, { country: "Svalbard and Jan Mayen (+47)", code: "+47" }, { country: "Syrian Arab Republic (+963)", code: "+963" }, { country: "Taiwan, Province of China (+886)", code: "+886" }, { country: "Tanzania, United Republic of (+255)", code: "+255" }, { country: "Timor-Leste (+670)", code: "+670" }, { country: "Venezuela, Bolivarian Republic of (+58)", code: "+58" }, { country: "Viet Nam (+84)", code: "+84" }, { country: "Virgin Islands, British (+1 284)", code: "+1284" }, { country: "Virgin Islands, U.S. (+1 340)", code: "+1340" }];
    }
    CountrycodemodalComponent.prototype.ngOnInit = function () {
        console.log(this.value);
    };
    CountrycodemodalComponent.prototype.dismissModal = function (value) {
        this._modalCtrl.dismiss(value);
    };
    CountrycodemodalComponent.prototype.showMore = function () {
        this.hideButton = true;
        this.countryCode = this.countryCode.concat(this.moreCountryCode);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CountrycodemodalComponent.prototype, "value", void 0);
    CountrycodemodalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-countrycodemodal',
            templateUrl: './countrycodemodal.component.html',
            styleUrls: ['./countrycodemodal.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            TranslateServiceService])
    ], CountrycodemodalComponent);
    return CountrycodemodalComponent;
}());
export { CountrycodemodalComponent };
//# sourceMappingURL=countrycodemodal.component.js.map