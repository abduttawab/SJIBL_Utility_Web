import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgdclFinalPaymentComponent } from './bgdclFinalPayment.component';

describe('BgdclFinalPaymentComponent', () => {
  let component: BgdclFinalPaymentComponent;
  let fixture: ComponentFixture<BgdclFinalPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgdclFinalPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgdclFinalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
