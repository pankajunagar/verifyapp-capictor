import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core"
@Injectable({
  providedIn: 'root'
})
export class TranslateServiceService {

  constructor(
    private translate: TranslateService
  ) { }
  getTranslatedData(key: string) {
    return this.translate.instant(key);
  }
}
