import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContactPointVerificationComponent } from './form-contact-point-verification.component';

describe('FormContactPointVerificationComponent', () => {
  let component: FormContactPointVerificationComponent;
  let fixture: ComponentFixture<FormContactPointVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContactPointVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContactPointVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
