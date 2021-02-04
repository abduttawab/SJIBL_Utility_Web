import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageBranchDeputy } from './stage-branch-deputy.component';

describe('StageCibComponent', () => {
  let component: StageBranchDeputy;
  let fixture: ComponentFixture<StageBranchDeputy>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageBranchDeputy ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageBranchDeputy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
