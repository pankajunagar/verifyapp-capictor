import { TestBed } from '@angular/core/testing';
import { RentalsUserService } from './rentals-user.service';
describe('UserService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(RentalsUserService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=rentals-user.service.spec.js.map