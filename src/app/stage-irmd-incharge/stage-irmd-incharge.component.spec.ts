import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageIrmdInchargeComponent } from './stage-irmd-incharge.component';

describe('StageCpvComponent', () => {
  let component: StageIrmdInchargeComponent;
  let fixture: ComponentFixture<StageIrmdInchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageIrmdInchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageIrmdInchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
