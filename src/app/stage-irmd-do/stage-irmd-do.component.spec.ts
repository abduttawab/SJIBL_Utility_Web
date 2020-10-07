import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageIrmdDoComponent } from './stage-irmd-do.component';

describe('StageCibComponent', () => {
  let component: StageIrmdDoComponent;
  let fixture: ComponentFixture<StageIrmdDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageIrmdDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageIrmdDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
