import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageAmdComponent } from './stage-amd.component';

describe('StageAmdComponent', () => {
  let component: StageAmdComponent;
  let fixture: ComponentFixture<StageAmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageAmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageAmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
