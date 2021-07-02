import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage-service.service';
describe('StorageService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(StorageService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=storage-service.service.spec.js.map