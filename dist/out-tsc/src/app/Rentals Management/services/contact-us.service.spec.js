import { TestBed } from '@angular/core/testing';
import { ContactUsService } from './contact-us.service';
describe('ContactUsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ContactUsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=contact-us.service.spec.js.map