import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInvestmentDetailsComponent } from './form-investment-details.component';

describe('FormInvestmentDetailsComponent', () => {
  let component: FormInvestmentDetailsComponent;
  let fixture: ComponentFixture<FormInvestmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInvestmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInvestmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
