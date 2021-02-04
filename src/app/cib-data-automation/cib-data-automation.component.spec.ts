import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibDataAutomationComponent } from './cib-data-automation.component';

describe('CibDataAutomationComponent', () => {
  let component: CibDataAutomationComponent;
  let fixture: ComponentFixture<CibDataAutomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibDataAutomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibDataAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
