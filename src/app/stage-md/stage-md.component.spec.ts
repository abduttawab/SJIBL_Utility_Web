import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageMdComponent } from './stage-md.component';

describe('StageMdComponent', () => {
  let component: StageMdComponent;
  let fixture: ComponentFixture<StageMdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageMdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
