import { TestBed } from '@angular/core/testing';
import { BuildingUserService } from './building-user.service';
describe('UserService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BuildingUserService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=building-user.service.spec.js.map