import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageIADComponent } from './stage-iad.component';

describe('StageCreditanalystComponent', () => {
  let component: StageIADComponent;
  let fixture: ComponentFixture<StageIADComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageIADComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageIADComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
