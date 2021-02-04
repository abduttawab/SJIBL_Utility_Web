import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageBranchInvestmentInchargeComponent } from './stage-branch-investmentIncharge.component';

describe('StageCibComponent', () => {
  let component: StageBranchInvestmentInchargeComponent;
  let fixture: ComponentFixture<StageBranchInvestmentInchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageBranchInvestmentInchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageBranchInvestmentInchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
