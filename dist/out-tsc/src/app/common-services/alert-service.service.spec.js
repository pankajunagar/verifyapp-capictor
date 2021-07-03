import { TestBed } from '@angular/core/testing';
import { AlertServiceService } from './alert-service.service';
describe('AlertServiceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AlertServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=alert-service.service.spec.js.map