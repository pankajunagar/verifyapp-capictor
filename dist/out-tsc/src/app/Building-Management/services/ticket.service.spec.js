import { TestBed } from '@angular/core/testing';
import { TicketService } from './ticket.service';
describe('TicketService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(TicketService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=ticket.service.spec.js.map