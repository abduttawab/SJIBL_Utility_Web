import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpdcFinalPaymentComponent } from './DpdcFinalPayment.component';

describe('DpdcFinalPaymentComponent', () => {
  let component: DpdcFinalPaymentComponent;
  let fixture: ComponentFixture<DpdcFinalPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpdcFinalPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpdcFinalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
