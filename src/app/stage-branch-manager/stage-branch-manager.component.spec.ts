import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageBranchManager } from './stage-branch-manager.component';

describe('StageCibComponent', () => {
  let component: StageBranchManager;
  let fixture: ComponentFixture<StageBranchManager>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageBranchManager ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageBranchManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
