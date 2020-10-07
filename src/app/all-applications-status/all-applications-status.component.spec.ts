import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApplicationsStatusComponent } from './all-applications-status.component';

describe('AllApplicationsStatusComponent', () => {
  let component: AllApplicationsStatusComponent;
  let fixture: ComponentFixture<AllApplicationsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllApplicationsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllApplicationsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
