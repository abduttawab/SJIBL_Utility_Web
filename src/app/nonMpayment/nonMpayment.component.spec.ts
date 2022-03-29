import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMpaymentComponent } from './nonMpayment.component';

describe('NonMpaymentComponent', () => {
  let component: NonMpaymentComponent;
  let fixture: ComponentFixture<NonMpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonMpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonMpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
