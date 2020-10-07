import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageIRMDHeadComponent } from './stage-irmd-head.component';

describe('StageDeduplicationComponent', () => {
  let component: StageIRMDHeadComponent;
  let fixture: ComponentFixture<StageIRMDHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageIRMDHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageIRMDHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
