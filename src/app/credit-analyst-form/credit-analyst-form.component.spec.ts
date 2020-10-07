import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAnalystFormComponent } from './credit-analyst-form.component';

describe('CreditAnalystFormComponent', () => {
  let component: CreditAnalystFormComponent;
  let fixture: ComponentFixture<CreditAnalystFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAnalystFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAnalystFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
