import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicationsComponent } from './new-applications.component';

describe('NewApplicationsComponent', () => {
  let component: NewApplicationsComponent;
  let fixture: ComponentFixture<NewApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
