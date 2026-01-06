import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BKASHFinalPaymentComponent } from './BKASHFinalPayment.component';

describe('BKASHFinalPaymentComponent', () => {
  let component: BKASHFinalPaymentComponent;
  let fixture: ComponentFixture<BKASHFinalPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BKASHFinalPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BKASHFinalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
