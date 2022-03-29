import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NescoFinalPaymentComponent } from './NescoFinalPayment.component';

describe('NescoFinalPaymentComponent', () => {
  let component: NescoFinalPaymentComponent;
  let fixture: ComponentFixture<NescoFinalPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NescoFinalPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NescoFinalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
