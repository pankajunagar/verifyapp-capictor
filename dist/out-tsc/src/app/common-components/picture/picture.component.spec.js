/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { PictureComponent } from './picture.component';
describe('PictureComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PictureComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PictureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=picture.component.spec.js.map