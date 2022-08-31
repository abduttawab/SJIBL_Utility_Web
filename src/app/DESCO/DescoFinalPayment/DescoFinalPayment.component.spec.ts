import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescoFinalPaymentComponent } from './DescoFinalPayment.component';

describe('DescoFinalPaymentComponent', () => {
  let component: DescoFinalPaymentComponent;
  let fixture: ComponentFixture<DescoFinalPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescoFinalPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescoFinalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
