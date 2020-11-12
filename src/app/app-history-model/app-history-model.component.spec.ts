import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHistoryModelComponent } from './app-history-model.component';

describe('AppHistoryModelComponent', () => {
  let component: AppHistoryModelComponent;
  let fixture: ComponentFixture<AppHistoryModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHistoryModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHistoryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
