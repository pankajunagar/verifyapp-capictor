import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewPage } from './customer-review.page';

describe('CustomerReviewPage', () => {
  let component: CustomerReviewPage;
  let fixture: ComponentFixture<CustomerReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
