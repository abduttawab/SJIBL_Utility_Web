import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BREBFinalPaymentComponent } from './BREBFinalPayment.component';

describe('BREBFinalPaymentComponent', () => {
  let component: BREBFinalPaymentComponent;
  let fixture: ComponentFixture<BREBFinalPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BREBFinalPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BREBFinalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
